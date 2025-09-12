import { eq, desc, asc, ilike, and } from "drizzle-orm";
import db from "../db/db.js";
import { tagsTable } from "../db/schema.js";

export interface CreateTagInput {
  name: string;
  isActive?: boolean;
}

export interface UpdateTagInput {
  name?: string;
  isActive?: boolean;
}

export interface TagFilters {
  search?: string;
  isActive?: boolean;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const create = async (input: CreateTagInput) => {
  const results = await db()
    .insert(tagsTable)
    .values({
      name: input.name,
      isActive: input.isActive ?? true,
    })
    .returning();
  return results[0]!;
};

export const findAll = async (filters: TagFilters = {}) => {
  let query = db().select().from(tagsTable);

  // Apply filters
  const conditions = [];

  if (filters.search) {
    conditions.push(ilike(tagsTable.name, `%${filters.search}%`));
  }

  if (filters.isActive !== undefined) {
    conditions.push(eq(tagsTable.isActive, filters.isActive));
  }

  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }

  // Apply sorting
  if (filters.sortBy === "name") {
    query = query.orderBy(filters.sortOrder === "desc" ? desc(tagsTable.name) : asc(tagsTable.name)) as typeof query;
  } else {
    // Default sort by createdAt
    query = query.orderBy(
      filters.sortOrder === "asc" ? asc(tagsTable.createdAt) : desc(tagsTable.createdAt)
    ) as typeof query;
  }

  return await query;
};

export const findById = async (id: number) => {
  const results = await db().select().from(tagsTable).where(eq(tagsTable.id, id));
  return results[0];
};

export const findByName = async (name: string) => {
  const results = await db().select().from(tagsTable).where(eq(tagsTable.name, name));
  return results[0];
};

export const update = async (id: number, input: UpdateTagInput) => {
  const results = await db()
    .update(tagsTable)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(tagsTable.id, id))
    .returning();
  return results[0];
};

export const deleteTag = async (id: number) => {
  const results = await db().delete(tagsTable).where(eq(tagsTable.id, id)).returning();
  return results[0];
};

export const toggleActive = async (id: number) => {
  // First get the current tag
  const currentTag = await findById(id);
  if (!currentTag) {
    throw new Error("Tag not found");
  }

  // Toggle the active status
  return await update(id, { isActive: !currentTag.isActive });
};

export const getStats = async () => {
  const allTags = await db().select().from(tagsTable);

  return {
    total: allTags.length,
    active: allTags.filter((tag) => tag.isActive).length,
    inactive: allTags.filter((tag) => !tag.isActive).length,
  };
};
