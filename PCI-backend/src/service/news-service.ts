import { eq, desc, asc, ilike, and, or, count, inArray, sql } from "drizzle-orm";
import db from "../db/db.js";
import {
  newsTable,
  categoriesTable,
  newsTagsTable,
  tagsTable,
  newsClassificationAssignmentsTable,
  newsClassificationsTable,
} from "../db/schema.js";

export interface CreateNewsInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  otherImages?: string[];
  categoryId: number;
  status?: "draft" | "published" | "archived";
  metaDescription?: string;
  metaKeywords?: string;
  publishedAt?: Date;
  selectedTags?: number[];
  selectedClassifications?: number[];
}

export interface UpdateNewsInput {
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  otherImages?: string[];
  categoryId?: number;
  status?: "draft" | "published" | "archived";
  metaDescription?: string;
  metaKeywords?: string;
  publishedAt?: Date;
  selectedTags?: number[];
  selectedClassifications?: number[];
}

export interface NewsFilters {
  search?: string;
  status?: "draft" | "published" | "archived" | "all";
  categoryId?: number;
  classifications?: string[];
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  sortBy?: "createdAt" | "updatedAt" | "publishedAt" | "title" | "viewCount";
  sortOrder?: "asc" | "desc";
  limit?: number;
  offset?: number;
}

// Generate URL-friendly slug from title
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim();
};

// Ensure slug is unique
const ensureUniqueSlug = async (baseSlug: string, excludeId?: number): Promise<string> => {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    const existingNews = await db()
      .select({ id: newsTable.id })
      .from(newsTable)
      .where(
        excludeId ? and(eq(newsTable.slug, slug), sql`${newsTable.id} != ${excludeId}`) : eq(newsTable.slug, slug)
      );

    if (existingNews.length === 0) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
};

// Calculate read time based on content (average 200 words per minute)
const calculateReadTime = (content: string): number => {
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / 100);
};

export const create = async (input: CreateNewsInput) => {
  return await db().transaction(async (tx) => {
    // Generate slug if not provided
    let slug = input.slug || generateSlug(input.title);
    slug = await ensureUniqueSlug(slug);

    // Calculate read time
    const readTime = calculateReadTime(input.content);

    // Create the news article
    const newsResults = await tx
      .insert(newsTable)
      .values({
        title: input.title,
        slug,
        excerpt: input.excerpt,
        content: input.content,
        featuredImage: input.featuredImage,
        otherImages: input.otherImages,
        categoryId: input.categoryId,
        status: input.status || "draft",
        metaDescription: input.metaDescription,
        metaKeywords: input.metaKeywords,
        readTime,
        publishedAt: input.status === "published" ? input.publishedAt || new Date() : null,
      })
      .returning();

    const newsArticle = newsResults[0]!;

    // Handle tags if provided
    if (input.selectedTags && input.selectedTags.length > 0) {
      const tagAssignments = input.selectedTags.map((tagId) => ({
        newsId: newsArticle.id,
        tagId,
      }));

      await tx.insert(newsTagsTable).values(tagAssignments);
    }

    // Handle classifications if provided
    if (input.selectedClassifications && input.selectedClassifications.length > 0) {
      const classificationAssignments = input.selectedClassifications.map((classificationId) => ({
        newsId: newsArticle.id,
        classificationId,
      }));

      await tx.insert(newsClassificationAssignmentsTable).values(classificationAssignments);
    }

    return newsArticle;
  });
};

export const findAll = async (filters: NewsFilters = {}) => {
  // Base query with all necessary joins
  let query = db()
    .select({
      id: newsTable.id,
      title: newsTable.title,
      slug: newsTable.slug,
      excerpt: newsTable.excerpt,
      content: newsTable.content,
      featuredImage: newsTable.featuredImage,
      otherImages: newsTable.otherImages,
      status: newsTable.status,
      viewCount: newsTable.viewCount,
      readTime: newsTable.readTime,
      metaDescription: newsTable.metaDescription,
      metaKeywords: newsTable.metaKeywords,
      publishedAt: newsTable.publishedAt,
      createdAt: newsTable.createdAt,
      updatedAt: newsTable.updatedAt,
      category: {
        id: categoriesTable.id,
        name: categoriesTable.name,
      },
    })
    .from(newsTable)
    .leftJoin(categoriesTable, eq(newsTable.categoryId, categoriesTable.id));

  // Apply filters
  const conditions = [];

  // Search filter
  if (filters.search) {
    conditions.push(
      or(
        ilike(newsTable.title, `%${filters.search}%`),
        ilike(newsTable.excerpt, `%${filters.search}%`),
        ilike(newsTable.content, `%${filters.search}%`)
      )
    );
  }

  // Status filter
  if (filters.status && filters.status !== "all") {
    conditions.push(eq(newsTable.status, filters.status));
  }

  // Category filter
  if (filters.categoryId) {
    conditions.push(eq(newsTable.categoryId, filters.categoryId));
  }

  // Date range filters
  if (filters.dateFrom) {
    conditions.push(sql`${newsTable.createdAt} >= ${filters.dateFrom}`);
  }
  if (filters.dateTo) {
    conditions.push(sql`${newsTable.createdAt} <= ${filters.dateTo}`);
  }

  // Apply conditions
  if (conditions.length > 0) {
    query = query.where(and(...conditions)) as typeof query;
  }

  // Apply sorting
  const sortBy = filters.sortBy || "createdAt";
  const sortOrder = filters.sortOrder || "desc";

  if (sortBy === "title") {
    query = query.orderBy(sortOrder === "desc" ? desc(newsTable.title) : asc(newsTable.title)) as typeof query;
  } else if (sortBy === "publishedAt") {
    query = query.orderBy(
      sortOrder === "desc" ? desc(newsTable.publishedAt) : asc(newsTable.publishedAt)
    ) as typeof query;
  } else if (sortBy === "viewCount") {
    query = query.orderBy(sortOrder === "desc" ? desc(newsTable.viewCount) : asc(newsTable.viewCount)) as typeof query;
  } else if (sortBy === "updatedAt") {
    query = query.orderBy(sortOrder === "desc" ? desc(newsTable.updatedAt) : asc(newsTable.updatedAt)) as typeof query;
  } else {
    // Default: createdAt
    query = query.orderBy(sortOrder === "desc" ? desc(newsTable.createdAt) : asc(newsTable.createdAt)) as typeof query;
  }

  // Apply pagination
  if (filters.limit) {
    query = query.limit(filters.limit) as typeof query;
  }
  if (filters.offset) {
    query = query.offset(filters.offset) as typeof query;
  }

  const articles = await query;

  // Get tags and classifications for each article
  const articlesWithRelations = await Promise.all(
    articles.map(async (article) => {
      // Get tags
      const tags = await db()
        .select({
          id: tagsTable.id,
          name: tagsTable.name,
        })
        .from(newsTagsTable)
        .leftJoin(tagsTable, eq(newsTagsTable.tagId, tagsTable.id))
        .where(eq(newsTagsTable.newsId, article.id));

      // Get classifications
      const classifications = await db()
        .select({
          id: newsClassificationsTable.id,
          name: newsClassificationsTable.name,
          priority: newsClassificationsTable.priority,
        })
        .from(newsClassificationAssignmentsTable)
        .leftJoin(
          newsClassificationsTable,
          eq(newsClassificationAssignmentsTable.classificationId, newsClassificationsTable.id)
        )
        .where(eq(newsClassificationAssignmentsTable.newsId, article.id))
        .orderBy(asc(newsClassificationsTable.priority));

      return {
        ...article,
        tags: tags.filter((tag) => tag.id), // Filter out null joins
        classifications: classifications.filter((cls) => cls.id), // Filter out null joins
      };
    })
  );

  return articlesWithRelations;
};

export const findById = async (id: number) => {
  const results = await db()
    .select({
      id: newsTable.id,
      title: newsTable.title,
      slug: newsTable.slug,
      excerpt: newsTable.excerpt,
      content: newsTable.content,
      featuredImage: newsTable.featuredImage,
      otherImages: newsTable.otherImages,
      status: newsTable.status,
      viewCount: newsTable.viewCount,
      readTime: newsTable.readTime,
      metaDescription: newsTable.metaDescription,
      metaKeywords: newsTable.metaKeywords,
      publishedAt: newsTable.publishedAt,
      createdAt: newsTable.createdAt,
      updatedAt: newsTable.updatedAt,
      category: {
        id: categoriesTable.id,
        name: categoriesTable.name,
      },
    })
    .from(newsTable)
    .leftJoin(categoriesTable, eq(newsTable.categoryId, categoriesTable.id))
    .where(eq(newsTable.id, id));

  if (results.length === 0) {
    return null;
  }

  const article = results[0]!;

  // Get tags
  const tags = await db()
    .select({
      id: tagsTable.id,
      name: tagsTable.name,
    })
    .from(newsTagsTable)
    .leftJoin(tagsTable, eq(newsTagsTable.tagId, tagsTable.id))
    .where(eq(newsTagsTable.newsId, article.id));

  // Get classifications
  const classifications = await db()
    .select({
      id: newsClassificationsTable.id,
      name: newsClassificationsTable.name,
      priority: newsClassificationsTable.priority,
    })
    .from(newsClassificationAssignmentsTable)
    .leftJoin(
      newsClassificationsTable,
      eq(newsClassificationAssignmentsTable.classificationId, newsClassificationsTable.id)
    )
    .where(eq(newsClassificationAssignmentsTable.newsId, article.id))
    .orderBy(asc(newsClassificationsTable.priority));

  return {
    ...article,
    tags: tags.filter((tag) => tag.id),
    classifications: classifications.filter((cls) => cls.id),
  };
};

export const findBySlug = async (slug: string) => {
  const results = await db().select().from(newsTable).where(eq(newsTable.slug, slug));
  return results[0];
};

export const update = async (id: number, input: UpdateNewsInput) => {
  return await db().transaction(async (tx) => {
    // Handle slug update if title changed
    let updateData: any = { ...input };

    if (input.title) {
      const slug = input.slug || generateSlug(input.title);
      updateData.slug = await ensureUniqueSlug(slug, id);
    }

    // Recalculate read time if content changed
    if (input.content) {
      updateData.readTime = calculateReadTime(input.content);
    }

    // Handle publishing
    if (input.status === "published" && !input.publishedAt) {
      updateData.publishedAt = new Date();
    } else if (input.status === "draft") {
      updateData.publishedAt = null;
    }

    updateData.updatedAt = new Date();

    // Extract tags and classifications before updating news
    const { selectedTags, selectedClassifications, ...newsUpdateData } = updateData;

    // Update the news article
    const newsResults = await tx.update(newsTable).set(newsUpdateData).where(eq(newsTable.id, id)).returning();

    const updatedNews = newsResults[0];
    if (!updatedNews) {
      throw new Error("News article not found");
    }

    // Handle tags update
    if (selectedTags !== undefined) {
      // Remove existing tags
      await tx.delete(newsTagsTable).where(eq(newsTagsTable.newsId, id));

      // Add new tags
      if (selectedTags.length > 0) {
        const tagAssignments = selectedTags.map((tagId: number) => ({
          newsId: id,
          tagId,
        }));
        await tx.insert(newsTagsTable).values(tagAssignments);
      }
    }

    // Handle classifications update
    if (selectedClassifications !== undefined) {
      // Remove existing classifications
      await tx.delete(newsClassificationAssignmentsTable).where(eq(newsClassificationAssignmentsTable.newsId, id));

      // Add new classifications
      if (selectedClassifications.length > 0) {
        const classificationAssignments = selectedClassifications.map((classificationId: number) => ({
          newsId: id,
          classificationId,
        }));
        await tx.insert(newsClassificationAssignmentsTable).values(classificationAssignments);
      }
    }

    return updatedNews;
  });
};

export const deleteNews = async (id: number) => {
  return await db().transaction(async (tx) => {
    // Delete related records first (cascade should handle this, but being explicit)
    await tx.delete(newsTagsTable).where(eq(newsTagsTable.newsId, id));
    await tx.delete(newsClassificationAssignmentsTable).where(eq(newsClassificationAssignmentsTable.newsId, id));

    // Delete the news article
    const results = await tx.delete(newsTable).where(eq(newsTable.id, id)).returning();
    return results[0];
  });
};

export const incrementViewCount = async (id: number) => {
  const results = await db()
    .update(newsTable)
    .set({ viewCount: sql`${newsTable.viewCount} + 1` })
    .where(eq(newsTable.id, id))
    .returning();
  return results[0];
};

export const getStats = async () => {
  const allNews = await db().select().from(newsTable);

  return {
    total: allNews.length,
    published: allNews.filter((article) => article.status === "published").length,
    drafts: allNews.filter((article) => article.status === "draft").length,
    archived: allNews.filter((article) => article.status === "archived").length,
    totalViews: allNews.reduce((sum, article) => sum + (article.viewCount || 0), 0),
  };
};

export const bulkUpdateStatus = async (ids: number[], status: "draft" | "published" | "archived") => {
  const updateData: any = { status, updatedAt: new Date() };

  if (status === "published") {
    updateData.publishedAt = new Date();
  } else if (status === "draft") {
    updateData.publishedAt = null;
  }

  const results = await db().update(newsTable).set(updateData).where(inArray(newsTable.id, ids)).returning();

  return results;
};

export const bulkDelete = async (ids: number[]) => {
  return await db().transaction(async (tx) => {
    // Delete related records
    await tx.delete(newsTagsTable).where(inArray(newsTagsTable.newsId, ids));
    await tx.delete(newsClassificationAssignmentsTable).where(inArray(newsClassificationAssignmentsTable.newsId, ids));

    // Delete news articles
    const results = await tx.delete(newsTable).where(inArray(newsTable.id, ids)).returning();
    return results;
  });
};

// Public service functions for frontend consumption
export const findAllPublished = async (filters: NewsFilters = {}) => {
  // Ensure we only get published articles
  const publicFilters = {
    ...filters,
    status: "published" as const,
  };

  const articles = await findAll(publicFilters);

  // Transform for public consumption - add full image URLs
  return articles.map((article) => ({
    ...article,
    featuredImage: article.featuredImage
      ? `${process.env.BACKEND_URL || "http://localhost:8080"}${article.featuredImage}`
      : null,
    // Transform classifications to match frontend expectations
    isFeatured: article.classifications.some((c) => c.name?.toLowerCase() === "featured"),
    isBreaking: article.classifications.some((c) => c.name?.toLowerCase() === "breaking"),
  }));
};

export const findFeaturedNews = async (limit: number = 3) => {
  const featuredNews = await db()
    .select({
      id: newsTable.id,
      title: newsTable.title,
      slug: newsTable.slug,
      excerpt: newsTable.excerpt,
      featuredImage: newsTable.featuredImage,
      publishedAt: newsTable.publishedAt,
      viewCount: newsTable.viewCount,
      readTime: newsTable.readTime,
      category: {
        id: categoriesTable.id,
        name: categoriesTable.name,
      },
    })
    .from(newsTable)
    .leftJoin(categoriesTable, eq(newsTable.categoryId, categoriesTable.id))
    .leftJoin(newsClassificationAssignmentsTable, eq(newsTable.id, newsClassificationAssignmentsTable.newsId))
    .leftJoin(
      newsClassificationsTable,
      eq(newsClassificationAssignmentsTable.classificationId, newsClassificationsTable.id)
    )
    .where(
      and(
        eq(newsTable.status, "published"),
        eq(newsClassificationsTable.name, "Featured"),
        eq(newsClassificationsTable.isActive, true)
      )
    )
    .orderBy(desc(newsTable.publishedAt))
    .limit(limit);

  // Get tags and classifications for each article
  const articlesWithRelations = await Promise.all(
    featuredNews.map(async (article) => {
      const tags = await db()
        .select({ id: tagsTable.id, name: tagsTable.name })
        .from(newsTagsTable)
        .leftJoin(tagsTable, eq(newsTagsTable.tagId, tagsTable.id))
        .where(eq(newsTagsTable.newsId, article.id));

      const classifications = await db()
        .select({ id: newsClassificationsTable.id, name: newsClassificationsTable.name })
        .from(newsClassificationAssignmentsTable)
        .leftJoin(
          newsClassificationsTable,
          eq(newsClassificationAssignmentsTable.classificationId, newsClassificationsTable.id)
        )
        .where(eq(newsClassificationAssignmentsTable.newsId, article.id));

      return {
        ...article,
        featuredImage: article.featuredImage
          ? `${process.env.BACKEND_URL || "http://localhost:8080"}${article.featuredImage}`
          : null,
        tags: tags.filter((tag) => tag.id),
        classifications: classifications.filter((cls) => cls.id),
        isFeatured: true,
        isBreaking: classifications.some((c) => c.name?.toLowerCase() === "breaking"),
      };
    })
  );

  return articlesWithRelations;
};

export const findRelatedNews = async (slug: string, limit: number = 3) => {
  // First get the current article
  const currentArticle = await findBySlug(slug);
  if (!currentArticle) return [];

  // Find related articles based on category and tags
  const relatedNews = await db()
    .select({
      id: newsTable.id,
      title: newsTable.title,
      slug: newsTable.slug,
      excerpt: newsTable.excerpt,
      featuredImage: newsTable.featuredImage,
      publishedAt: newsTable.publishedAt,
      viewCount: newsTable.viewCount,
      readTime: newsTable.readTime,
      category: {
        id: categoriesTable.id,
        name: categoriesTable.name,
      },
    })
    .from(newsTable)
    .leftJoin(categoriesTable, eq(newsTable.categoryId, categoriesTable.id))
    .where(
      and(
        eq(newsTable.status, "published"),
        eq(newsTable.categoryId, currentArticle.categoryId),
        sql`${newsTable.id} != ${currentArticle.id}` // Exclude current article
      )
    )
    .orderBy(desc(newsTable.publishedAt))
    .limit(limit);

  return relatedNews.map((article) => ({
    ...article,
    featuredImage: article.featuredImage
      ? `${process.env.BACKEND_URL || "http://localhost:8080"}${article.featuredImage}`
      : null,
  }));
};

export const getPublicStats = async () => {
  const publishedArticles = await db().select().from(newsTable).where(eq(newsTable.status, "published"));

  const activeCategories = await db().select().from(categoriesTable).where(eq(categoriesTable.isActive, true));

  const featuredCount = await db()
    .select({ count: count() })
    .from(newsTable)
    .leftJoin(newsClassificationAssignmentsTable, eq(newsTable.id, newsClassificationAssignmentsTable.newsId))
    .leftJoin(
      newsClassificationsTable,
      eq(newsClassificationAssignmentsTable.classificationId, newsClassificationsTable.id)
    )
    .where(and(eq(newsTable.status, "published"), eq(newsClassificationsTable.name, "Featured")));

  return {
    totalPublished: publishedArticles.length,
    totalCategories: activeCategories.length,
    totalFeatured: featuredCount[0]?.count || 0,
    totalViews: publishedArticles.reduce((sum, article) => sum + (article.viewCount || 0), 0),
  };
};

export const incrementViewCountBySlug = async (slug: string) => {
  const article = await findBySlug(slug);
  if (!article) {
    throw new Error("Article not found");
  }

  return await incrementViewCount(article.id);
};

export const findBySlugPublished = async (slug: string) => {
  const results = await db()
    .select({
      id: newsTable.id,
      title: newsTable.title,
      slug: newsTable.slug,
      excerpt: newsTable.excerpt,
      content: newsTable.content,
      featuredImage: newsTable.featuredImage,
      otherImages: newsTable.otherImages,
      status: newsTable.status,
      viewCount: newsTable.viewCount,
      readTime: newsTable.readTime,
      metaDescription: newsTable.metaDescription,
      metaKeywords: newsTable.metaKeywords,
      publishedAt: newsTable.publishedAt,
      createdAt: newsTable.createdAt,
      updatedAt: newsTable.updatedAt,
      category: {
        id: categoriesTable.id,
        name: categoriesTable.name,
      },
    })
    .from(newsTable)
    .leftJoin(categoriesTable, eq(newsTable.categoryId, categoriesTable.id))
    .where(and(eq(newsTable.slug, slug), eq(newsTable.status, "published")));

  if (results.length === 0) {
    return null;
  }

  const article = results[0]!;

  // Get tags
  const tags = await db()
    .select({ id: tagsTable.id, name: tagsTable.name })
    .from(newsTagsTable)
    .leftJoin(tagsTable, eq(newsTagsTable.tagId, tagsTable.id))
    .where(eq(newsTagsTable.newsId, article.id));

  // Get classifications
  const classifications = await db()
    .select({ id: newsClassificationsTable.id, name: newsClassificationsTable.name })
    .from(newsClassificationAssignmentsTable)
    .leftJoin(
      newsClassificationsTable,
      eq(newsClassificationAssignmentsTable.classificationId, newsClassificationsTable.id)
    )
    .where(eq(newsClassificationAssignmentsTable.newsId, article.id));

  return {
    ...article,
    featuredImage: article.featuredImage
      ? `${process.env.BACKEND_URL || "http://localhost:8080"}${article.featuredImage}`
      : null,
    tags: tags.filter((tag) => tag.id),
    classifications: classifications.filter((cls) => cls.id),
    isFeatured: classifications.some((c) => c.name?.toLowerCase() === "featured"),
    isBreaking: classifications.some((c) => c.name?.toLowerCase() === "breaking"),
  };
};

export const getNewsPageData = async () => {
  // Get all active classifications ordered by priority
  const classifications = await db()
    .select({
      id: newsClassificationsTable.id,
      name: newsClassificationsTable.name,
      priority: newsClassificationsTable.priority,
    })
    .from(newsClassificationsTable)
    .where(eq(newsClassificationsTable.isActive, true))
    .orderBy(asc(newsClassificationsTable.priority));

  // For each classification, get sample articles (e.g., first 6)
  const sectionsWithArticles = await Promise.all(
    classifications.map(async (classification) => {
      const articles = await getNewsByClassification(classification.id, 6, 0);

      return {
        classification: {
          id: classification.id,
          name: classification.name,
          priority: classification.priority,
        },
        articles: articles.articles,
        totalCount: articles.totalCount,
        hasMore: articles.hasMore,
      };
    })
  );

  return {
    sections: sectionsWithArticles,
    totalPublishedArticles: await getTotalPublishedCount(),
  };
};

export const getNewsByClassification = async (classificationId: number, limit: number = 6, offset: number = 0) => {
  // Get articles with this classification
  const articlesQuery = db()
    .select({
      id: newsTable.id,
      title: newsTable.title,
      slug: newsTable.slug,
      excerpt: newsTable.excerpt,
      featuredImage: newsTable.featuredImage,
      publishedAt: newsTable.publishedAt,
      viewCount: newsTable.viewCount,
      readTime: newsTable.readTime,
      category: {
        id: categoriesTable.id,
        name: categoriesTable.name,
      },
    })
    .from(newsTable)
    .leftJoin(categoriesTable, eq(newsTable.categoryId, categoriesTable.id))
    .leftJoin(newsClassificationAssignmentsTable, eq(newsTable.id, newsClassificationAssignmentsTable.newsId))
    .where(
      and(eq(newsTable.status, "published"), eq(newsClassificationAssignmentsTable.classificationId, classificationId))
    )
    .orderBy(desc(newsTable.publishedAt))
    .limit(limit)
    .offset(offset);

  const articles = await articlesQuery;

  // Get total count for this classification
  const totalCountResult = await db()
    .select({ count: count() })
    .from(newsTable)
    .leftJoin(newsClassificationAssignmentsTable, eq(newsTable.id, newsClassificationAssignmentsTable.newsId))
    .where(
      and(eq(newsTable.status, "published"), eq(newsClassificationAssignmentsTable.classificationId, classificationId))
    );

  const totalCount = totalCountResult[0]?.count || 0;

  // Get tags and classifications for each article
  const articlesWithRelations = await Promise.all(
    articles.map(async (article) => {
      const tags = await db()
        .select({ id: tagsTable.id, name: tagsTable.name })
        .from(newsTagsTable)
        .leftJoin(tagsTable, eq(newsTagsTable.tagId, tagsTable.id))
        .where(eq(newsTagsTable.newsId, article.id));

      const classifications = await db()
        .select({
          id: newsClassificationsTable.id,
          name: newsClassificationsTable.name,
          priority: newsClassificationsTable.priority,
        })
        .from(newsClassificationAssignmentsTable)
        .leftJoin(
          newsClassificationsTable,
          eq(newsClassificationAssignmentsTable.classificationId, newsClassificationsTable.id)
        )
        .where(eq(newsClassificationAssignmentsTable.newsId, article.id))
        .orderBy(asc(newsClassificationsTable.priority));

      return {
        ...article,
        featuredImage: article.featuredImage
          ? `${process.env.BACKEND_URL || "http://localhost:8080"}${article.featuredImage}`
          : null,
        tags: tags.filter((tag) => tag.id),
        classifications: classifications.filter((cls) => cls.id),
        // For compatibility with frontend
        featured: classifications.some((c) => c.name?.toLowerCase() === "featured"),
        isBreaking: classifications.some((c) => c.name?.toLowerCase() === "breaking"),
      };
    })
  );

  return {
    articles: articlesWithRelations,
    totalCount,
    hasMore: offset + limit < totalCount,
  };
};

export const searchPublishedNews = async (filters: {
  search?: string;
  categoryId?: number;
  classificationId?: number;
  sortBy?: "createdAt" | "updatedAt" | "publishedAt" | "title" | "viewCount";
  sortOrder?: "asc" | "desc";
  limit: number;
  offset: number;
}) => {
  let query = db()
    .select({
      id: newsTable.id,
      title: newsTable.title,
      slug: newsTable.slug,
      excerpt: newsTable.excerpt,
      featuredImage: newsTable.featuredImage,
      publishedAt: newsTable.publishedAt,
      viewCount: newsTable.viewCount,
      readTime: newsTable.readTime,
      category: {
        id: categoriesTable.id,
        name: categoriesTable.name,
      },
    })
    .from(newsTable)
    .leftJoin(categoriesTable, eq(newsTable.categoryId, categoriesTable.id));

  // Build where conditions
  const conditions = [eq(newsTable.status, "published")];

  if (filters.search) {
    const search = filters.search;
    const searchCondition = or(
      ilike(newsTable.title, `%${search}%`),
      ilike(newsTable.excerpt, `%${search}%`),
      ilike(newsTable.content, `%${search}%`)
    );
    if (searchCondition) {
      conditions.push(searchCondition);
    }
  }

  if (filters.categoryId) {
    conditions.push(eq(newsTable.categoryId, filters.categoryId));
  }

  if (filters.classificationId) {
    query = query.leftJoin(
      newsClassificationAssignmentsTable,
      eq(newsTable.id, newsClassificationAssignmentsTable.newsId)
    );
    conditions.push(eq(newsClassificationAssignmentsTable.classificationId, filters.classificationId));
  }

  query = query.where(and(...conditions)) as typeof query;

  // Apply sorting
  const sortBy = filters.sortBy || "publishedAt";
  const sortOrder = filters.sortOrder || "desc";

  // Apply sorting with type assertions
  query = query.orderBy(
    sortOrder === "desc"
      ? desc(
          newsTable[
            sortBy === "title"
              ? "title"
              : sortBy === "viewCount"
              ? "viewCount"
              : sortBy === "publishedAt"
              ? "publishedAt"
              : "createdAt"
          ]
        )
      : asc(
          newsTable[
            sortBy === "title"
              ? "title"
              : sortBy === "viewCount"
              ? "viewCount"
              : sortBy === "publishedAt"
              ? "publishedAt"
              : "createdAt"
          ]
        )
  ) as typeof query;

  // Apply pagination
  query = query.limit(filters.limit).offset(filters.offset) as typeof query;
  const articles = await query;

  // Get tags and classifications for each article
  const articlesWithRelations = await Promise.all(
    articles.map(async (article) => {
      const tags = await db()
        .select({ id: tagsTable.id, name: tagsTable.name })
        .from(newsTagsTable)
        .leftJoin(tagsTable, eq(newsTagsTable.tagId, tagsTable.id))
        .where(eq(newsTagsTable.newsId, article.id));

      const classifications = await db()
        .select({
          id: newsClassificationsTable.id,
          name: newsClassificationsTable.name,
          priority: newsClassificationsTable.priority,
        })
        .from(newsClassificationAssignmentsTable)
        .leftJoin(
          newsClassificationsTable,
          eq(newsClassificationAssignmentsTable.classificationId, newsClassificationsTable.id)
        )
        .where(eq(newsClassificationAssignmentsTable.newsId, article.id))
        .orderBy(asc(newsClassificationsTable.priority));

      return {
        ...article,
        featuredImage: article.featuredImage
          ? `${process.env.BACKEND_URL || "http://localhost:8080"}${article.featuredImage}`
          : null,
        tags: tags.filter((tag) => tag.id),
        classifications: classifications.filter((cls) => cls.id),
        featured: classifications.some((c) => c.name?.toLowerCase() === "featured"),
        isBreaking: classifications.some((c) => c.name?.toLowerCase() === "breaking"),
      };
    })
  );

  return articlesWithRelations;
};

export const getPublicCategories = async () => {
  const categories = await db()
    .select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      description: categoriesTable.description,
    })
    .from(categoriesTable)
    .where(eq(categoriesTable.isActive, true))
    .orderBy(asc(categoriesTable.name));

  return categories;
};

export const getPublicClassifications = async () => {
  const classifications = await db()
    .select({
      id: newsClassificationsTable.id,
      name: newsClassificationsTable.name,
      priority: newsClassificationsTable.priority,
    })
    .from(newsClassificationsTable)
    .where(eq(newsClassificationsTable.isActive, true))
    .orderBy(asc(newsClassificationsTable.priority));

  return classifications;
};

const getTotalPublishedCount = async () => {
  const result = await db().select({ count: count() }).from(newsTable).where(eq(newsTable.status, "published"));

  return result[0]?.count || 0;
};
