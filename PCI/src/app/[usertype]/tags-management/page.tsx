"use client";

import React, { useEffect, useState } from "react";
import {
  X,
  Search,
  Plus,
  Edit3,
  Trash2,
  Check,
  Tag,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import AdminLayout from "../_layout/AdminLayout";
import { tagsAPI } from "./api";

const TagsContent = () => {
  interface Tag {
    id: number;
    name: string;
    isActive: boolean;
    createdAt: string;
  }

  const [tags, setTags] = useState<Tag[]>([]);
  const [newTagName, setNewTagName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all"); // all, active, inactive
  const [editingTag, setEditingTag] = useState<number | null>(null);
  const [editName, setEditName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [stats, setStats] = useState({ total: 0, active: 0, inactive: 0 });
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tagToDelete, setTagToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");

  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);

    return debouncedValue;
  };

  // Add this after the useDebounce hook
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    void loadTags();
    void loadStats();
  }, []);

  const loadTagsCallback = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const filters: any = {
        sortBy: "createdAt",
        sortOrder: "desc",
      };

      if (debouncedSearchQuery) filters.search = debouncedSearchQuery;
      if (activeFilter !== "all") {
        filters.isActive = activeFilter === "active";
      }

      const fetchedTags = await tagsAPI.getAll(filters);
      setTags(fetchedTags as Tag[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tags");
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchQuery, activeFilter]);

  useEffect(() => {
    void loadTagsCallback();
  }, [loadTagsCallback]);

  // 6. Add these helper functions:
  const loadTags = async () => {
    try {
      setIsLoading(true);
      setError("");

      const filters: any = {
        sortBy: "createdAt",
        sortOrder: "desc",
      };

      if (debouncedSearchQuery) filters.search = debouncedSearchQuery;
      if (activeFilter !== "all") {
        filters.isActive = activeFilter === "active";
      }

      const fetchedTags = await tagsAPI.getAll(filters);
      setTags(fetchedTags as Tag[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tags");
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const fetchedStats = await tagsAPI.getStats();
      setStats(fetchedStats);
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  };

  // Filter tags based on search and active filter
  const filteredTags = React.useMemo(() => {
    return tags.filter((tag: Tag) => {
      const matchesSearch = (tag.name)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "active" && tag.isActive) ||
        (activeFilter === "inactive" && !tag.isActive);
      return matchesSearch && matchesFilter;
    });
  }, [tags, searchQuery, activeFilter]);

  // Show success message temporarily
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Add new tag
  const handleAddTag = async () => {
    if (!newTagName.trim()) return;

    try {
      setIsLoading(true);
      setError("");

      await tagsAPI.create(newTagName.trim());
      setNewTagName("");
      showSuccess("Tag created successfully!");

      // Reload data
      await loadTags();
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create tag");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle tag active status
  const handleToggleActive = async (tagId: number) => {
    try {
      await tagsAPI.toggleActive(tagId);
      showSuccess("Tag status updated!");

      // Reload data
      await loadTags();
      await loadStats();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update tag status",
      );
    }
  };

  // Start editing tag
  const handleEditStart = (tag: Tag) => {
    setEditingTag(tag.id);
    setEditName(tag.name);
  };

  // Save edited tag
  const handleEditSave = async (tagId: number) => {
    if (!editName.trim()) return;

    try {
      await tagsAPI.update(tagId, { name: editName.trim() });
      setEditingTag(null);
      setEditName("");
      showSuccess("Tag updated successfully!");

      // Reload data
      await loadTags();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update tag");
    }
  };

  // Cancel editing
  const handleEditCancel = () => {
    setEditingTag(null);
    setEditName("");
  };

  // Delete tag
  const handleDelete = async () => {
    if (!tagToDelete) return;

    try {
      await tagsAPI.delete(tagToDelete.id);
      showSuccess("Tag deleted successfully!");

      // Reload data
      await loadTags();
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete tag");
    } finally {
      setShowDeleteModal(false);
      setTagToDelete(null);
    }
  };

  const openDeleteModal = (tag: Tag) => {
    setTagToDelete({ id: tag.id, name: tag.name });
    setShowDeleteModal(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="flex animate-fade-in items-center rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-green-800">
          <Check className="mr-2 h-5 w-5" />
          {successMessage}
        </div>
      )}

      {error && (
        <div className="flex animate-fade-in items-center rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800">
          <X className="mr-2 h-5 w-5" />
          {error}
          <button
            onClick={() => setError("")}
            className="ml-auto text-red-600 hover:text-red-800"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Quick Add Tag Section */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Add New Tag</h3>
          <div className="text-sm text-gray-500">
            Total:{" "}
            <span className="font-semibold text-gray-900">{tags.length}</span>{" "}
            tags
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex-1">
            <input
              key="add-tag-input"
              type="text"
              placeholder="Enter tag name..."
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
          </div>
          <button
            onClick={handleAddTag}
            disabled={!newTagName.trim() || isLoading}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? (
              <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
              <Plus size={18} />
            )}
            Add Tag
          </button>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          {/* Filter Tabs */}
          <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
            {[
              { key: "all", label: "All Tags", count: stats.total },
              { key: "active", label: "Active", count: stats.active },
              { key: "inactive", label: "Inactive", count: stats.inactive },
            ].map(({ key, label, count }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  activeFilter === key
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {label} ({count})
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={18}
            />
            <input
              key="search-input"
              type="text"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Tags ({filteredTags.length})
          </h3>
        </div>

        {isLoading && tags.length === 0 ? (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg border border-gray-200 p-4"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                  <div className="flex gap-1">
                    <div className="h-4 w-4 rounded bg-gray-200"></div>
                    <div className="h-4 w-4 rounded bg-gray-200"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="h-4 w-20 rounded bg-gray-200"></div>
                  <div className="h-3 w-16 rounded bg-gray-200"></div>
                </div>
              </div>
            ))}
          </div>
        ) : !isLoading && filteredTags.length === 0 ? (
          <div className="py-12 text-center">
            <Tag className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No tags found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try adjusting your search terms."
                : "Create your first tag to get started."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredTags.map((tag) => (
              <div
                key={tag.id}
                className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex-1">
                    {editingTag === tag.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleEditSave(tag.id)
                          }
                          className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <button
                          onClick={() => handleEditSave(tag.id)}
                          className="p-1 text-green-600 hover:text-green-700"
                          title="Save"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={handleEditCancel}
                          className="p-1 text-gray-400 hover:text-gray-600"
                          title="Cancel"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <h4 className="truncate font-medium text-gray-900">
                        {tag.name}
                      </h4>
                    )}
                  </div>

                  {editingTag !== tag.id && (
                    <div className="ml-2 flex items-center gap-1">
                      <button
                        onClick={() => handleEditStart(tag)}
                        className="p-1 text-gray-400 hover:text-blue-600"
                        title="Edit tag"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(tag)}
                        className="p-1 text-gray-400 hover:text-red-600"
                        title="Delete tag"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleActive(tag.id)}
                      className={`flex items-center gap-1 text-sm transition-colors ${
                        tag.isActive
                          ? "text-green-600 hover:text-green-700"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                      title={`${tag.isActive ? "Deactivate" : "Activate"} tag`}
                    >
                      {tag.isActive ? (
                        <ToggleRight size={16} />
                      ) : (
                        <ToggleLeft size={16} />
                      )}
                      {tag.isActive ? "Active" : "Inactive"}
                    </button>
                  </div>

                  <span className="text-xs text-gray-500">
                    {formatDate(tag.createdAt)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && tagToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Tag
              </h3>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setTagToDelete(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-4 text-gray-600">
                Are you sure you want to delete the tag{" "}
                <strong>&quot;{tagToDelete.name}&quot;</strong>?
              </p>
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                ⚠️ This action cannot be undone. The tag will be removed from
                all associated content.
              </p>

              <div className="mt-4 rounded-lg border bg-gray-50 p-3">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Type &quot;
                  <span className="font-bold text-red-600">delete</span>&quot;
                  to confirm:
                </label>
                <input
                  type="text"
                  placeholder="Type 'delete' to confirm"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setTagToDelete(null);
                  setDeleteConfirmText("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleteConfirmText !== "delete"}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                Delete Tag
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const TagsManagementPage = () => {
  return (
    <AdminLayout currentPage="tags-management">
      <TagsContent />
    </AdminLayout>
  );
};

export default TagsManagementPage;
