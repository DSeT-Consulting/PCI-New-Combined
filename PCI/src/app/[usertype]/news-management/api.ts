import { API_BASE_URL } from "~/config/baseUrl";

const API_BASE = `${API_BASE_URL}/news`;

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  otherImages?: string[];
  status: "draft" | "published" | "archived";
  viewCount: number;
  readTime: number;
  metaDescription?: string;
  metaKeywords?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
  };
  tags: Array<{
    id: number;
    name: string;
  }>;
  classifications: Array<{
    id: number;
    name: string;
    priority: number;
  }>;
}

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
  publishedAt?: string;
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
  publishedAt?: string;
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

export interface NewsStats {
  total: number;
  published: number;
  drafts: number;
  archived: number;
  totalViews: number;
}

export interface BulkUpdateInput {
  ids: number[];
  action: "updateStatus" | "delete";
  status?: "draft" | "published" | "archived";
}

export const newsAPI = {
  // Get all news articles with filters
  getAll: async (filters: NewsFilters = {}) => {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.categoryId)
      params.append("categoryId", filters.categoryId.toString());
    if (filters.classifications?.length)
      params.append("classifications", filters.classifications.join(","));
    if (filters.tags?.length) params.append("tags", filters.tags.join(","));
    if (filters.dateFrom) params.append("dateFrom", filters.dateFrom);
    if (filters.dateTo) params.append("dateTo", filters.dateTo);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.offset) params.append("offset", filters.offset.toString());

    const response = await fetch(`${API_BASE}?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch news articles");
    return response.json() as Promise<NewsArticle[]>;
  },

  // Get news article by ID
  getById: async (id: number) => {
    const response = await fetch(`${API_BASE}/${id}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error("News article not found");
      throw new Error("Failed to fetch news article");
    }
    return response.json() as Promise<NewsArticle>;
  },

  // Get news article by slug (for public pages)
  getBySlug: async (slug: string) => {
    const response = await fetch(`${API_BASE}/slug/${slug}`);
    if (!response.ok) {
      if (response.status === 404) throw new Error("News article not found");
      throw new Error("Failed to fetch news article");
    }
    return response.json() as Promise<NewsArticle>;
  },

  // Create new news article
  create: async (data: CreateNewsInput, featuredImageFile?: File) => {
    const formData = new FormData();

    // Add text fields
    formData.append("title", data.title);
    if (data.slug) formData.append("slug", data.slug);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("categoryId", data.categoryId.toString());
    if (data.status) formData.append("status", data.status);
    if (data.metaDescription)
      formData.append("metaDescription", data.metaDescription);
    if (data.metaKeywords) formData.append("metaKeywords", data.metaKeywords);
    if (data.publishedAt) formData.append("publishedAt", data.publishedAt);

    // Add arrays as JSON strings
    if (data.selectedTags)
      formData.append("selectedTags", JSON.stringify(data.selectedTags));
    if (data.selectedClassifications)
      formData.append(
        "selectedClassifications",
        JSON.stringify(data.selectedClassifications),
      );
    if (data.otherImages)
      formData.append("otherImages", JSON.stringify(data.otherImages));

    // Add featured image file if provided
    if (featuredImageFile) {
      formData.append("featuredImage", featuredImageFile);
    }

    const response = await fetch(API_BASE, {
      method: "POST",
      body: formData, // Don't set Content-Type header - let browser set it with boundary
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create news article");
    }
    return response.json() as Promise<NewsArticle>;
  },

  // Update news article
  update: async (
    id: number,
    data: UpdateNewsInput,
    featuredImageFile?: File,
  ) => {
    const formData = new FormData();

    // Add text fields only if they exist
    if (data.title !== undefined) formData.append("title", data.title);
    if (data.slug !== undefined) formData.append("slug", data.slug);
    if (data.excerpt !== undefined) formData.append("excerpt", data.excerpt);
    if (data.content !== undefined) formData.append("content", data.content);
    if (data.categoryId !== undefined)
      formData.append("categoryId", data.categoryId.toString());
    if (data.status !== undefined) formData.append("status", data.status);
    if (data.metaDescription !== undefined)
      formData.append("metaDescription", data.metaDescription);
    if (data.metaKeywords !== undefined)
      formData.append("metaKeywords", data.metaKeywords);
    if (data.publishedAt !== undefined)
      formData.append("publishedAt", data.publishedAt || "");

    // Add arrays as JSON strings only if they exist
    if (data.selectedTags !== undefined)
      formData.append("selectedTags", JSON.stringify(data.selectedTags));
    if (data.selectedClassifications !== undefined)
      formData.append(
        "selectedClassifications",
        JSON.stringify(data.selectedClassifications),
      );
    if (data.otherImages !== undefined)
      formData.append("otherImages", JSON.stringify(data.otherImages));

    // Add featured image file if provided
    if (featuredImageFile) {
      formData.append("featuredImage", featuredImageFile);
    }

    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      body: formData, // Don't set Content-Type header
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update news article");
    }
    return response.json() as Promise<NewsArticle>;
  },

  // Publish news article
  publish: async (id: number, publishedAt?: string) => {
    const response = await fetch(`${API_BASE}/${id}/publish`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ publishedAt }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to publish news article");
    }
    return response.json() as Promise<NewsArticle>;
  },

  // Delete news article
  delete: async (id: number) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete news article");
    }
  },

  // Bulk operations
  bulkUpdate: async (data: BulkUpdateInput) => {
    const response = await fetch(`${API_BASE}/bulk`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to perform bulk operation");
    }
    return response.json() as Promise<NewsArticle[]>;
  },

  // Get news statistics
  getStats: async () => {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) throw new Error("Failed to fetch news statistics");
    return response.json() as Promise<NewsStats>;
  },
};

// Categories API
const CATEGORIES_API_BASE = `${API_BASE_URL}/categories`;

export interface Category {
  id: number;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  articleCount: number;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  isActive?: boolean;
}

export interface CategoryFilters {
  search?: string;
  isActive?: boolean;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const categoriesAPI = {
  // Get all categories with filters
  getAll: async (filters: CategoryFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.isActive !== undefined)
      params.append("isActive", filters.isActive.toString());
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

    const response = await fetch(`${CATEGORIES_API_BASE}?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json() as Promise<Category[]>;
  },

  // Create new category
  create: async (data: CreateCategoryInput) => {
    const response = await fetch(CATEGORIES_API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create category");
    }
    return response.json() as Promise<Category>;
  },

  // Update category
  update: async (
    id: number,
    data: { name?: string; description?: string; isActive?: boolean },
  ) => {
    const response = await fetch(`${CATEGORIES_API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update category");
    }
    return response.json() as Promise<Category>;
  },

  // Toggle category active status
  toggleActive: async (id: number) => {
    const response = await fetch(`${CATEGORIES_API_BASE}/${id}/toggle`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to toggle category status");
    return response.json() as Promise<Category>;
  },

  // Delete category
  delete: async (id: number) => {
    const response = await fetch(`${CATEGORIES_API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete category");
    }
  },

  // Get stats
  getStats: async () => {
    const response = await fetch(`${CATEGORIES_API_BASE}/stats`);
    if (!response.ok) throw new Error("Failed to fetch category stats");
    return response.json() as Promise<{
      total: number;
      active: number;
      inactive: number;
    }>;
  },
};

// News Classifications API
const CLASSIFICATIONS_API_BASE = `${API_BASE_URL}/news-classifications`;

export interface NewsClassification {
  id: number;
  name: string;
  priority: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  articleCount: number;
}

export interface CreateClassificationInput {
  name: string;
  priority?: number;
  isActive?: boolean;
}

export interface ClassificationFilters {
  search?: string;
  isActive?: boolean;
  sortBy?: "name" | "priority" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export const classificationsAPI = {
  // Get all classifications with filters
  getAll: async (filters: ClassificationFilters = {}) => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.isActive !== undefined)
      params.append("isActive", filters.isActive.toString());
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

    const response = await fetch(`${CLASSIFICATIONS_API_BASE}?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch classifications");
    return response.json() as Promise<NewsClassification[]>;
  },

  // Create new classification
  create: async (data: CreateClassificationInput) => {
    const response = await fetch(CLASSIFICATIONS_API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create classification");
    }
    return response.json() as Promise<NewsClassification>;
  },

  // Update classification
  update: async (
    id: number,
    data: { name?: string; priority?: number; isActive?: boolean },
  ) => {
    const response = await fetch(`${CLASSIFICATIONS_API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update classification");
    }
    return response.json() as Promise<NewsClassification>;
  },

  // Toggle classification active status
  toggleActive: async (id: number) => {
    const response = await fetch(`${CLASSIFICATIONS_API_BASE}/${id}/toggle`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to toggle classification status");
    return response.json() as Promise<NewsClassification>;
  },

  // Reorder classifications
  reorder: async (orderedIds: number[]) => {
    const response = await fetch(`${CLASSIFICATIONS_API_BASE}/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderedIds }),
    });
    if (!response.ok) throw new Error("Failed to reorder classifications");
    return response.json() as Promise<NewsClassification[]>;
  },

  // Delete classification
  delete: async (id: number) => {
    const response = await fetch(`${CLASSIFICATIONS_API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to delete classification");
    }
  },

  // Get stats
  getStats: async () => {
    const response = await fetch(`${CLASSIFICATIONS_API_BASE}/stats`);
    if (!response.ok) throw new Error("Failed to fetch classification stats");
    return response.json() as Promise<{
      total: number;
      active: number;
      inactive: number;
    }>;
  },
};
