import { API_BASE_URL } from "~/config/baseUrl";

const API_BASE = `${API_BASE_URL}/tags`;

export const tagsAPI = {
  // Get all tags with filters
  getAll: async (
    filters: {
      search?: string;
      isActive?: boolean;
      sortBy?: "name" | "createdAt";
      sortOrder?: "asc" | "desc";
    } = {},
  ) => {
    const params = new URLSearchParams();
    if (filters.search) params.append("search", filters.search);
    if (filters.isActive !== undefined)
      params.append("isActive", filters.isActive.toString());
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

    const response = await fetch(`${API_BASE}?${params.toString()}`);
    if (!response.ok) throw new Error("Failed to fetch tags");
    return response.json();
  },

  // Create new tag
  create: async (name: string, isActive = true) => {
    const response = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, isActive }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to create tag");
    }
    return response.json();
  },

  // Update tag
  update: async (id: number, data: { name?: string; isActive?: boolean }) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to update tag");
    }
    return response.json();
  },

  // Toggle tag active status
  toggleActive: async (id: number) => {
    const response = await fetch(`${API_BASE}/${id}/toggle`, {
      method: "PATCH",
    });
    if (!response.ok) throw new Error("Failed to toggle tag status");
    return response.json();
  },

  // Delete tag
  delete: async (id: number) => {
    const response = await fetch(`${API_BASE}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete tag");
  },

  // Get stats
  getStats: async () => {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) throw new Error("Failed to fetch stats");
    return response.json();
  },
};
