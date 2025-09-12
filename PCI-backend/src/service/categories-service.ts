import { eq, desc, asc, ilike, and, count } from "drizzle-orm";
import db from "../db/db.js";
import { categoriesTable, newsTable } from "../db/schema.js";

export interface CreateCategoryInput {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface CategoryFilters {
  search?: string;
  isActive?: boolean;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const create = async (input: CreateCategoryInput) => {
  const results = await db()
    .insert(categoriesTable)
    .values({
      name: input.name,
      description: input.description,
      isActive: input.isActive ?? true,
    })
    .returning();
  return results[0]!;
};

export const findAll = async (filters: CategoryFilters = {}) => {
  // Get categories with article counts
  const query = db()
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      description: categoriesTable.description,
      isActive: categoriesTable.isActive,
      createdAt: categoriesTable.createdAt,
      updatedAt: categoriesTable.updatedAt,
      articleCount: count(newsTable.id),
    })
    .from(categoriesTable)
    .leftJoin(newsTable, eq(categoriesTable.id, newsTable.categoryId))
    .groupBy(categoriesTable.id);

  // Apply filters
  const conditions = [];

  if (filters.search) {
    conditions.push(ilike(categoriesTable.name, `%${filters.search}%`));
  }

  if (filters.isActive !== undefined) {
    conditions.push(eq(categoriesTable.isActive, filters.isActive));
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
      filters.sortOrder === "desc" ? desc(categoriesTable.name) : asc(categoriesTable.name)
    );
  } else {
    // Default sort by createdAt
    finalQuery = finalQuery.orderBy(
      filters.sortOrder === "asc" ? asc(categoriesTable.createdAt) : desc(categoriesTable.createdAt)
    );
  }

  return await finalQuery;
};

export const findById = async (id: number) => {
  const results = await db()
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      description: categoriesTable.description,
      isActive: categoriesTable.isActive,
      createdAt: categoriesTable.createdAt,
      updatedAt: categoriesTable.updatedAt,
      articleCount: count(newsTable.id),
    })
    .from(categoriesTable)
    .leftJoin(newsTable, eq(categoriesTable.id, newsTable.categoryId))
    .where(eq(categoriesTable.id, id))
    .groupBy(categoriesTable.id);

  return results[0];
};

export const findByName = async (name: string) => {
  const results = await db().select().from(categoriesTable).where(eq(categoriesTable.name, name));
  return results[0];
};

export const update = async (id: number, input: UpdateCategoryInput) => {
  const results = await db()
    .update(categoriesTable)
    .set({
      ...input,
      updatedAt: new Date(),
    })
    .where(eq(categoriesTable.id, id))
    .returning();
  return results[0];
};

export const deleteCategory = async (id: number) => {
  const results = await db().delete(categoriesTable).where(eq(categoriesTable.id, id)).returning();
  return results[0];
};

export const toggleActive = async (id: number) => {
  // First get the current category
  const currentCategory = await findById(id);
  if (!currentCategory) {
    throw new Error("Category not found");
  }

  // Toggle the active status
  return await update(id, { isActive: !currentCategory.isActive });
};

export const getStats = async () => {
  const allCategories = await db().select().from(categoriesTable);

  return {
    total: allCategories.length,
    active: allCategories.filter((cat) => cat.isActive).length,
    inactive: allCategories.filter((cat) => !cat.isActive).length,
  };
};
