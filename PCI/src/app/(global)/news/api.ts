// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// Types for API responses
export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  viewCount: number;
  readTime: number;
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
  featured: boolean;
  isBreaking: boolean;
}

export interface NewsSection {
  classification: {
    id: number;
    name: string;
    priority: number;
  };
  articles: NewsArticle[];
  totalCount: number;
  hasMore: boolean;
}

export interface NewsPageData {
  sections: NewsSection[];
  totalPublishedArticles: number;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface SearchFilters {
  search?: string;
  categoryId?: number;
  classificationId?: number;
  sortBy?: "createdAt" | "updatedAt" | "publishedAt" | "title" | "viewCount";
  sortOrder?: "asc" | "desc";
  limit: number;
  offset: number;
}

// News API functions
export const newsAPI = {
  // Get initial news page data with all sections
  getPageData: async (): Promise<NewsPageData> => {
    const response = await fetch(`${API_BASE_URL}/api/news/public/page-data`);
    if (!response.ok) throw new Error("Failed to fetch news page data");
    return response.json();
  },

  // Get active categories for filtering
  getCategories: async (): Promise<Category[]> => {
    const response = await fetch(`${API_BASE_URL}/api/news/public/categories`);
    if (!response.ok) throw new Error("Failed to fetch categories");
    return response.json();
  },

  // Search published news with filters
  searchNews: async (filters: SearchFilters): Promise<NewsArticle[]> => {
    const params = new URLSearchParams();

    if (filters.search) params.append("search", filters.search);
    if (filters.categoryId)
      params.append("categoryId", filters.categoryId.toString());
    if (filters.classificationId)
      params.append("classificationId", filters.classificationId.toString());
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);
    params.append("limit", filters.limit.toString());
    params.append("offset", filters.offset.toString());

    const response = await fetch(
      `${API_BASE_URL}/api/news/public/search?${params}`,
    );
    if (!response.ok) throw new Error("Failed to search news");
    return response.json();
  },

  // Get more articles for a specific section/classification
  getSectionArticles: async (
    classificationId: number,
    limit: number = 6,
    offset: number = 0,
  ) => {
    const response = await fetch(
      `${API_BASE_URL}/api/news/public/section/${classificationId}?limit=${limit}&offset=${offset}`,
    );
    if (!response.ok) throw new Error("Failed to fetch section articles");
    return response.json();
  },

  // Increment view count when user visits an article
  incrementViewCount: async (slug: string): Promise<void> => {
    try {
      await fetch(`${API_BASE_URL}/api/news/public/view/${slug}`, {
        method: "POST",
      });
    } catch (error) {
      // Silently fail for view count - not critical
      console.warn("Failed to increment view count:", error);
    }
  },
};
