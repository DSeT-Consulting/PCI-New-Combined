import { eq, desc, asc, ilike, and, count } from "drizzle-orm";
import db from "../db/db.js";
import { newsClassificationsTable, newsClassificationAssignmentsTable } from "../db/schema.js";

export interface CreateClassificationInput {
  name: string;
  priority?: number;
  isActive?: boolean;
}

export interface UpdateClassificationInput {
  name?: string;
  priority?: number;
  isActive?: boolean;
}

export interface ClassificationFilters {
  search?: string;
  isActive?: boolean;
  sortBy?: "name" | "priority" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const create = async (input: CreateClassificationInput) => {
  // If no priority specified, set to next available
  let priority = input.priority;
  if (!priority) {
    const maxPriorityResult = (await db()
      .select({ maxPriority: desc(newsClassificationsTable.priority) })
      .from(newsClassificationsTable)
      .limit(1)) as { maxPriority: number }[];

    priority = (maxPriorityResult[0]?.maxPriority ?? 0) + 1;
  }

  const results = await db()
    .insert(newsClassificationsTable)
    .values({
      name: input.name,
      priority,
      isActive: input.isActive ?? true,
    })
    .returning();
  return results[0]!;
};

export const findAll = async (filters: ClassificationFilters = {}) => {
  // Get classifications with article counts
  const query = db()
    .select({
      id: newsClassificationsTable.id,
      name: newsClassificationsTable.name,
      priority: newsClassificationsTable.priority,
      isActive: newsClassificationsTable.isActive,
      createdAt: newsClassificationsTable.createdAt,
      updatedAt: newsClassificationsTable.updatedAt,
      articleCount: count(newsClassificationAssignmentsTable.newsId),
    })
    .from(newsClassificationsTable)
    .leftJoin(
      newsClassificationAssignmentsTable,
      eq(newsClassificationsTable.id, newsClassificationAssignmentsTable.classificationId)
    )
    .groupBy(newsClassificationsTable.id);

  // Apply filters
  const conditions = [];

  if (filters.search) {
    conditions.push(ilike(newsClassificationsTable.name, `%${filters.search}%`));
  }

  if (filters.isActive !== undefined) {
    conditions.push(eq(newsClassificationsTable.isActive, filters.isActive));
  }

  let finalQuery;
  if (conditions.length > 0) {
    finalQuery = query.where(and(...conditions));
  } else {
    finalQuery = query;
  }

  // Apply sorting
  if (filters.sortBy === "name") {
    finalQuery = finalQuery.orderBy(
      filters.sortOrder === "desc" ? desc(newsClassificationsTable.name) : asc(newsClassificationsTable.name)
    );
  } else if (filters.sortBy === "priority") {
    finalQuery = finalQuery.orderBy(
      filters.sortOrder === "desc" ? desc(newsClassificationsTable.priority) : asc(newsClassificationsTable.priority)
    );
  } else {
    // Default sort by priority ascending (most important first)
    finalQuery = finalQuery.orderBy(asc(newsClassificationsTable.priority));
  }

  return await finalQuery;
};

export const findById = async (id: number) => {
  const results = await db()
    .select({
      id: newsClassificationsTable.id,
      name: newsClassificationsTable.name,
      priority: newsClassificationsTable.priority,
      isActive: newsClassificationsTable.isActive,
      createdAt: newsClassificationsTable.createdAt,
      updatedAt: newsClassificationsTable.updatedAt,
      articleCount: count(newsClassificationAssignmentsTable.newsId),
    })
    .from(newsClassificationsTable)
    .leftJoin(
      newsClassificationAssignmentsTable,
      eq(newsClassificationsTable.id, newsClassificationAssignmentsTable.classificationId)
    )
    .where(eq(newsClassificationsTable.id, id))
    .groupBy(newsClassificationsTable.id);

  return results[0];
};

export const findByName = async (name: string) => {
  const results = await db().select().from(newsClassificationsTable).where(eq(newsClassificationsTable.name, name));
  return results[0];
};

export const update = async (id: number, input: UpdateClassificationInput) => {
  const results = await db()
    .update(newsClassificationsTable)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(newsClassificationsTable.id, id))
    .returning();
  return results[0];
};

export const deleteClassification = async (id: number) => {
  const results = await db().delete(newsClassificationsTable).where(eq(newsClassificationsTable.id, id)).returning();
  return results[0];
};

export const toggleActive = async (id: number) => {
  // First get the current classification
  const currentClassification = await findById(id);
  if (!currentClassification) {
    throw new Error("Classification not found");
  }

  // Toggle the active status
  return await update(id, { isActive: !currentClassification.isActive });
};

export const reorderClassifications = async (orderedIds: number[]) => {
  // Update priorities based on the new order
  const updatePromises = orderedIds.map((id, index) => update(id, { priority: index + 1 }));

  await Promise.all(updatePromises);

  // Return updated classifications
  return await findAll({ sortBy: "priority", sortOrder: "asc" });
};

export const getStats = async () => {
  const allClassifications = await db().select().from(newsClassificationsTable);

  return {
    total: allClassifications.length,
    active: allClassifications.filter((cls) => cls.isActive).length,
    inactive: allClassifications.filter((cls) => !cls.isActive).length,
  };
};
