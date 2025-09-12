import { Request, Response } from "express";
import * as NewsService from "../service/news-service.js";
import { deleteImageFile } from "../middleware/upload.js";
import { getRelativeImagePath } from "../utils/fileUtils.js";

export const createNews = async (req: Request, res: Response) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      otherImages,
      categoryId,
      status,
      metaDescription,
      metaKeywords,
      publishedAt,
      selectedTags,
      selectedClassifications,
    } = req.body;

    // Validation
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      // If validation fails and there's an uploaded file, delete it
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Title is required and must be a non-empty string",
      });
    }

    if (!excerpt || typeof excerpt !== "string" || excerpt.trim().length === 0) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Excerpt is required and must be a non-empty string",
      });
    }

    if (!content || typeof content !== "string" || content.trim().length === 0) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Content is required and must be a non-empty string",
      });
    }

    if (!categoryId || !Number.isInteger(Number(categoryId))) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Category ID is required and must be a valid integer",
      });
    }

    // Validate status
    const validStatuses = ["draft", "published", "archived"];
    if (status && !validStatuses.includes(status)) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Status must be one of: draft, published, archived",
      });
    }

    // Get featured image path from uploaded file
    const featuredImage = req.file ? getRelativeImagePath(req.file.path) : undefined;

    const result = await NewsService.create({
      title: title.trim(),
      slug: slug?.trim(),
      excerpt: excerpt.trim(),
      content: content.trim(),
      featuredImage,
      otherImages: otherImages ? JSON.parse(otherImages) : undefined,
      categoryId: Number(categoryId),
      status: status || "draft",
      metaDescription: metaDescription?.trim(),
      metaKeywords: metaKeywords?.trim(),
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      selectedTags: selectedTags ? JSON.parse(selectedTags) : undefined,
      selectedClassifications: selectedClassifications ? JSON.parse(selectedClassifications) : undefined,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating news:", error);
    // Clean up uploaded file if there was an error
    if (req.file) {
      deleteImageFile(getRelativeImagePath(req.file.path));
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllNews = async (req: Request, res: Response) => {
  try {
    const {
      search,
      status,
      categoryId,
      classifications,
      tags,
      dateFrom,
      dateTo,
      sortBy = "createdAt",
      sortOrder = "desc",
      limit,
      offset,
    } = req.query;

    const filters = {
      search: search as string,
      status: status as "draft" | "published" | "archived" | "all",
      categoryId: categoryId ? Number(categoryId) : undefined,
      classifications: classifications ? (classifications as string).split(",") : undefined,
      tags: tags ? (tags as string).split(",") : undefined,
      dateFrom: dateFrom as string,
      dateTo: dateTo as string,
      sortBy: sortBy as "createdAt" | "updatedAt" | "publishedAt" | "title" | "viewCount",
      sortOrder: sortOrder as "asc" | "desc",
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
    };

    // Validate numeric parameters
    if (filters.categoryId && isNaN(filters.categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    if (filters.limit && (isNaN(filters.limit) || filters.limit < 1)) {
      return res.status(400).json({ error: "Limit must be a positive integer" });
    }

    if (filters.offset && (isNaN(filters.offset) || filters.offset < 0)) {
      return res.status(400).json({ error: "Offset must be a non-negative integer" });
    }

    const news = await NewsService.findAll(filters);
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNewsById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid news ID" });
    }

    const news = await NewsService.findById(id);

    if (!news) {
      return res.status(404).json({ error: "News article not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNewsBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ error: "Invalid slug" });
    }

    const news = await NewsService.findBySlugPublished(slug);

    if (!news) {
      return res.status(404).json({ error: "News article not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPublicNewsBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ error: "Invalid slug" });
    }

    const news = await NewsService.findBySlugPublished(slug);

    if (!news) {
      return res.status(404).json({ error: "News article not found" });
    }

    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching news by slug:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateNews = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const {
      title,
      slug,
      excerpt,
      content,
      otherImages,
      categoryId,
      status,
      metaDescription,
      metaKeywords,
      publishedAt,
      selectedTags,
      selectedClassifications,
    } = req.body;

    if (isNaN(id)) {
      // Clean up uploaded file if there was an error
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({ error: "Invalid news ID" });
    }

    // Check if news exists and get current image
    const existingNews = await NewsService.findById(id);
    if (!existingNews) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(404).json({ error: "News article not found" });
    }

    // Validate fields if provided
    if (title !== undefined && (!title || typeof title !== "string" || title.trim().length === 0)) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Title must be a non-empty string",
      });
    }

    if (excerpt !== undefined && (!excerpt || typeof excerpt !== "string" || excerpt.trim().length === 0)) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Excerpt must be a non-empty string",
      });
    }

    if (content !== undefined && (!content || typeof content !== "string" || content.trim().length === 0)) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Content must be a non-empty string",
      });
    }

    if (categoryId !== undefined && !Number.isInteger(Number(categoryId))) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Category ID must be a valid integer",
      });
    }

    // Validate status
    const validStatuses = ["draft", "published", "archived"];
    if (status && !validStatuses.includes(status)) {
      if (req.file) {
        deleteImageFile(getRelativeImagePath(req.file.path));
      }
      return res.status(400).json({
        error: "Status must be one of: draft, published, archived",
      });
    }

    // Handle image update
    let featuredImage = existingNews.featuredImage; // Keep existing image by default

    if (req.file) {
      // New image uploaded, delete old one and use new one
      if (existingNews.featuredImage) {
        deleteImageFile(existingNews.featuredImage);
      }
      featuredImage = getRelativeImagePath(req.file.path);
    }

    const updateData: any = {};
    if (title !== undefined) updateData.title = title.trim();
    if (slug !== undefined) updateData.slug = slug.trim();
    if (excerpt !== undefined) updateData.excerpt = excerpt.trim();
    if (content !== undefined) updateData.content = content.trim();
    if (req.file) updateData.featuredImage = featuredImage; // Only update if new image uploaded
    if (otherImages !== undefined) updateData.otherImages = JSON.parse(otherImages);
    if (categoryId !== undefined) updateData.categoryId = Number(categoryId);
    if (status !== undefined) updateData.status = status;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription?.trim();
    if (metaKeywords !== undefined) updateData.metaKeywords = metaKeywords?.trim();
    if (publishedAt !== undefined) updateData.publishedAt = publishedAt ? new Date(publishedAt) : null;
    if (selectedTags !== undefined) updateData.selectedTags = JSON.parse(selectedTags);
    if (selectedClassifications !== undefined) updateData.selectedClassifications = JSON.parse(selectedClassifications);

    const result = await NewsService.update(id, updateData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating news:", error);
    // Clean up uploaded file if there was an error
    if (req.file) {
      deleteImageFile(getRelativeImagePath(req.file.path));
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteNews = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid news ID" });
    }

    const existingNews = await NewsService.findById(id);
    if (!existingNews) {
      return res.status(404).json({ error: "News article not found" });
    }

    // Delete associated image file
    if (existingNews.featuredImage) {
      deleteImageFile(existingNews.featuredImage);
    }

    await NewsService.deleteNews(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const publishNews = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { publishedAt } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid news ID" });
    }

    const existingNews = await NewsService.findById(id);
    if (!existingNews) {
      return res.status(404).json({ error: "News article not found" });
    }

    const result = await NewsService.update(id, {
      status: "published",
      publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Error publishing news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNewsStats = async (req: Request, res: Response) => {
  try {
    const stats = await NewsService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching news stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const bulkUpdateNews = async (req: Request, res: Response) => {
  try {
    const { ids, action, status } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        error: "IDs must be a non-empty array",
      });
    }

    // Validate all IDs are numbers
    const invalidIds = ids.filter((id) => !Number.isInteger(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        error: "All IDs must be integers",
      });
    }

    if (action === "updateStatus") {
      const validStatuses = ["draft", "published", "archived"];
      if (!status || !validStatuses.includes(status)) {
        return res.status(400).json({
          error: "Status must be one of: draft, published, archived",
        });
      }

      const result = await NewsService.bulkUpdateStatus(ids, status);
      res.status(200).json(result);
    } else if (action === "delete") {
      // Get all news articles to delete their images
      const articlesToDelete = await Promise.all(
        ids.map(async (id: number) => {
          try {
            return await NewsService.findById(id);
          } catch {
            return null;
          }
        })
      );

      // Delete associated image files
      articlesToDelete.forEach((article) => {
        if (article?.featuredImage) {
          deleteImageFile(article.featuredImage);
        }
      });

      const result = await NewsService.bulkDelete(ids);
      res.status(200).json(result);
    } else {
      return res.status(400).json({
        error: "Action must be 'updateStatus' or 'delete'",
      });
    }
  } catch (error) {
    console.error("Error in bulk operation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Public endpoints for frontend consumption
export const getPublishedNews = async (req: Request, res: Response) => {
  try {
    const {
      search,
      categoryId,
      classifications,
      tags,
      featured,
      breaking,
      sortBy = "publishedAt",
      sortOrder = "desc",
      limit = 12,
      offset = 0,
    } = req.query;

    const filters = {
      search: search as string,
      status: "published" as const, // Only published articles
      categoryId: categoryId ? Number(categoryId) : undefined,
      classifications: classifications ? (classifications as string).split(",") : undefined,
      tags: tags ? (tags as string).split(",") : undefined,
      featured: featured === "true" ? true : undefined,
      breaking: breaking === "true" ? true : undefined,
      sortBy: sortBy as "createdAt" | "updatedAt" | "publishedAt" | "title" | "viewCount",
      sortOrder: sortOrder as "asc" | "desc",
      limit: limit ? Number(limit) : 12,
      offset: offset ? Number(offset) : 0,
    };

    // Validate numeric parameters
    if (filters.categoryId && isNaN(filters.categoryId)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    if (filters.limit && (isNaN(filters.limit) || filters.limit < 1 || filters.limit > 50)) {
      return res.status(400).json({ error: "Limit must be between 1 and 50" });
    }

    if (filters.offset && (isNaN(filters.offset) || filters.offset < 0)) {
      return res.status(400).json({ error: "Offset must be non-negative" });
    }

    const news = await NewsService.findAllPublished(filters);
    res.status(200).json(news);
  } catch (error) {
    console.error("Error fetching published news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFeaturedNews = async (req: Request, res: Response) => {
  try {
    const { limit = 3 } = req.query;

    const featuredNews = await NewsService.findFeaturedNews(Number(limit));
    res.status(200).json(featuredNews);
  } catch (error) {
    console.error("Error fetching featured news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getRelatedNews = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const { limit = 3 } = req.query;

    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ error: "Invalid slug" });
    }

    const relatedNews = await NewsService.findRelatedNews(slug, Number(limit));
    res.status(200).json(relatedNews);
  } catch (error) {
    console.error("Error fetching related news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPublicNewsStats = async (req: Request, res: Response) => {
  try {
    const stats = await NewsService.getPublicStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching public stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const incrementNewsViewCount = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    if (!slug || typeof slug !== "string") {
      return res.status(400).json({ error: "Invalid slug" });
    }

    await NewsService.incrementViewCountBySlug(slug);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error incrementing view count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNewsPageData = async (req: Request, res: Response) => {
  try {
    const newsPageData = await NewsService.getNewsPageData();
    res.status(200).json(newsPageData);
  } catch (error) {
    console.error("Error fetching news page data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getNewsSection = async (req: Request, res: Response) => {
  try {
    const { classificationId } = req.params;
    const { limit = 6, offset = 0 } = req.query;

    if (!classificationId || isNaN(Number(classificationId))) {
      return res.status(400).json({ error: "Invalid classification ID" });
    }

    const sectionData = await NewsService.getNewsByClassification(
      Number(classificationId),
      Number(limit),
      Number(offset)
    );

    res.status(200).json(sectionData);
  } catch (error) {
    console.error("Error fetching news section:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const searchPublishedNews = async (req: Request, res: Response) => {
  try {
    const {
      search,
      categoryId,
      classificationId,
      sortBy = "publishedAt",
      sortOrder = "desc",
      limit = 12,
      offset = 0,
    } = req.query;

    const filters = {
      search: search as string,
      categoryId: categoryId ? Number(categoryId) : undefined,
      classificationId: classificationId ? Number(classificationId) : undefined,
      sortBy: sortBy as "createdAt" | "updatedAt" | "publishedAt" | "title" | "viewCount",
      sortOrder: sortOrder as "asc" | "desc",
      limit: Number(limit),
      offset: Number(offset),
    };

    const searchResults = await NewsService.searchPublishedNews(filters);
    res.status(200).json(searchResults);
  } catch (error) {
    console.error("Error searching published news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPublicCategories = async (req: Request, res: Response) => {
  try {
    const categories = await NewsService.getPublicCategories();
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching public categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getPublicClassifications = async (req: Request, res: Response) => {
  try {
    const classifications = await NewsService.getPublicClassifications();
    res.status(200).json(classifications);
  } catch (error) {
    console.error("Error fetching public classifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
