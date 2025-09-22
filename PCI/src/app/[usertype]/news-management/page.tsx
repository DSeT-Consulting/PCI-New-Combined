"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  Search,
  Plus,
  Edit3,
  Trash2,
  Check,
  FileText,
  ToggleLeft,
  ToggleRight,
  ChevronUp,
  ChevronDown,
  Settings,
  Eye,
  Tag,
  BookOpen,
  Star,
  AlertCircle,
  Save,
  Copy,
} from "lucide-react";
import { Editor } from "@tinymce/tinymce-react";
import Image from "next/image";
import AdminLayout from "../_layout/AdminLayout";
import {
  newsAPI,
  categoriesAPI,
  classificationsAPI,
  type NewsArticle,
  type Category,
  type NewsClassification,
} from "./api";
import { tagsAPI } from "../tags-management/api";
import ImageUpload from "~/components/ImageUpload";

interface Tag {
  id: number;
  name: string;
  isActive: boolean;
}

interface ClassificationSelectorProps {
  selectedClassifications: number[];
  availableClassifications: NewsClassification[];
  onSelectionChange: (selected: number[]) => void;
  onCreateNew: (name: string) => Promise<NewsClassification>;
}

interface TagSelectorProps {
  selectedTags: number[];
  availableTags: Tag[];
  onSelectionChange: (selected: number[]) => void;
  onCreateNew: (name: string) => Promise<Tag>;
}

const TagSelector: React.FC<TagSelectorProps> = ({
  selectedTags,
  availableTags,
  onSelectionChange,
  onCreateNew,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter tags based on input
  const filteredTags = availableTags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedTags.includes(tag.id),
  );

  // Check if input matches exactly with any existing tag
  const exactMatch = availableTags.find(
    (t) => t.name.toLowerCase() === inputValue.toLowerCase(),
  );

  // Get selected tag objects
  const selectedTagObjects = availableTags.filter((t) =>
    selectedTags.includes(t.id),
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectTag = (tag: Tag) => {
    onSelectionChange([...selectedTags, tag.id]);
    setInputValue("");
    setIsDropdownOpen(false);
  };

  const handleRemoveTag = (tagId: number) => {
    onSelectionChange(selectedTags.filter((id) => id !== tagId));
  };

  const handleCreateNew = async () => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (!inputValue.trim() || exactMatch || isCreating) return;

    try {
      setIsCreating(true);
      await onCreateNew(inputValue.trim());
      setInputValue("");
      setIsDropdownOpen(false);
    } catch (err) {
      // Error is handled by parent
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredTags.length === 1) {
        handleSelectTag(filteredTags[0]!);
      } else if (inputValue.trim() && !exactMatch) {
        void handleCreateNew();
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
      setInputValue("");
    }
  };

  return (
    <div className="relative">
      {/* Selected Tags */}
      {selectedTagObjects.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedTagObjects.map((tag) => (
            <span
              key={tag.id}
              className="inline-flex items-center gap-1 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
            >
              <Tag size={12} />
              {tag.name}
              <button
                onClick={() => handleRemoveTag(tag.id)}
                className="ml-1 hover:text-red-600"
                type="button"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          placeholder="Type to search or add new tag..."
        />

        {/* Dropdown Arrow */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            {/* Existing Tags */}
            {filteredTags.length > 0 && (
              <div className="border-b border-gray-100 p-2">
                <div className="mb-2 px-2 text-xs font-medium text-gray-500">
                  EXISTING TAGS
                </div>
                {filteredTags.map((tag) => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => handleSelectTag(tag)}
                    className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    <Tag size={14} className="text-blue-500" />
                    <span>{tag.name}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Create New Option */}
            {inputValue.trim() && !exactMatch && (
              <div className="p-2">
                <div className="mb-2 px-2 text-xs font-medium text-gray-500">
                  CREATE NEW TAG
                </div>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  disabled={isCreating}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-green-600 hover:bg-green-50 disabled:opacity-50"
                >
                  {isCreating ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-green-600"></div>
                  ) : (
                    <Plus size={14} />
                  )}
                  Create &quot;{inputValue.trim()}&quot;
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredTags.length === 0 && !inputValue.trim() && (
              <div className="p-4 text-center text-sm text-gray-500">
                {availableTags.length === selectedTags.length
                  ? "All tags are already selected"
                  : "Type to search tags..."}
              </div>
            )}

            {filteredTags.length === 0 && inputValue.trim() && exactMatch && (
              <div className="p-4 text-center text-sm text-gray-500">
                Tag already exists
              </div>
            )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="mt-1 text-xs text-gray-500">
        Press Enter to select first match or create new • Press Escape to close
      </div>
    </div>
  );
};

const ClassificationSelector: React.FC<ClassificationSelectorProps> = ({
  selectedClassifications,
  availableClassifications,
  onSelectionChange,
  onCreateNew,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter classifications based on input
  const filteredClassifications = availableClassifications.filter(
    (classification) =>
      classification.name.toLowerCase().includes(inputValue.toLowerCase()) &&
      !selectedClassifications.includes(classification.id),
  );

  // Check if input matches exactly with any existing classification
  const exactMatch = availableClassifications.find(
    (c) => c.name.toLowerCase() === inputValue.toLowerCase(),
  );

  // Get selected classification objects
  const selectedClassificationObjects = availableClassifications.filter((c) =>
    selectedClassifications.includes(c.id),
  );

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectClassification = (classification: NewsClassification) => {
    onSelectionChange([...selectedClassifications, classification.id]);
    setInputValue("");
    setIsDropdownOpen(false);
  };

  const handleRemoveClassification = (classificationId: number) => {
    onSelectionChange(
      selectedClassifications.filter((id) => id !== classificationId),
    );
  };

  const handleCreateNew = async () => {
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    if (!inputValue.trim() || exactMatch || isCreating) return;

    try {
      setIsCreating(true);
      await onCreateNew(inputValue.trim());
      setInputValue("");
      setIsDropdownOpen(false);
    } catch (err) {
      // Error is handled by parent
    } finally {
      setIsCreating(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredClassifications.length === 1) {
        handleSelectClassification(filteredClassifications[0]!);
      } else if (inputValue.trim() && !exactMatch) {
        void handleCreateNew();
      }
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
      setInputValue("");
    }
  };

  return (
    <div className="relative">
      {/* Selected Classifications */}
      {selectedClassificationObjects.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {selectedClassificationObjects.map((classification) => (
            <span
              key={classification.id}
              className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-sm font-medium ${
                classification.name === "Featured"
                  ? "border-amber-200 bg-amber-100 text-amber-800"
                  : classification.name === "Breaking"
                    ? "border-red-200 bg-red-100 text-red-800"
                    : "border-purple-200 bg-purple-100 text-purple-800"
              }`}
            >
              {classification.name === "Featured" && (
                <Star size={12} className="mr-1" />
              )}
              {classification.name === "Breaking" && (
                <AlertCircle size={12} className="mr-1" />
              )}
              {classification.name}
              <button
                onClick={() => handleRemoveClassification(classification.id)}
                className="ml-1 hover:text-red-600"
                type="button"
              >
                <X size={14} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500"
          placeholder="Type to search or add new classification..."
        />

        {/* Dropdown Arrow */}
        <button
          type="button"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
        >
          <ChevronDown
            size={16}
            className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Dropdown */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute left-0 right-0 top-full z-10 mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            {/* Existing Classifications */}
            {filteredClassifications.length > 0 && (
              <div className="border-b border-gray-100 p-2">
                <div className="mb-2 px-2 text-xs font-medium text-gray-500">
                  EXISTING CLASSIFICATIONS
                </div>
                {filteredClassifications.map((classification) => (
                  <button
                    key={classification.id}
                    type="button"
                    onClick={() => handleSelectClassification(classification)}
                    className="flex w-full items-center justify-between rounded px-3 py-2 text-left text-sm hover:bg-gray-50"
                  >
                    <span className="flex items-center gap-2">
                      {classification.name === "Featured" && (
                        <Star size={14} className="text-amber-500" />
                      )}
                      {classification.name === "Breaking" && (
                        <AlertCircle size={14} className="text-red-500" />
                      )}
                      {classification.name}
                    </span>
                    <span className="text-xs text-gray-400">
                      #{classification.priority}
                    </span>
                  </button>
                ))}
              </div>
            )}

            {/* Create New Option */}
            {inputValue.trim() && !exactMatch && (
              <div className="p-2">
                <div className="mb-2 px-2 text-xs font-medium text-gray-500">
                  CREATE NEW
                </div>
                <button
                  type="button"
                  onClick={handleCreateNew}
                  disabled={isCreating}
                  className="flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm text-green-600 hover:bg-green-50 disabled:opacity-50"
                >
                  {isCreating ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-green-600"></div>
                  ) : (
                    <Plus size={14} />
                  )}
                  Create &quot;{inputValue.trim()}&quot;
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredClassifications.length === 0 && !inputValue.trim() && (
              <div className="p-4 text-center text-sm text-gray-500">
                {availableClassifications.length ===
                selectedClassifications.length
                  ? "All classifications are already selected"
                  : "Type to search classifications..."}
              </div>
            )}

            {filteredClassifications.length === 0 &&
              inputValue.trim() &&
              exactMatch && (
                <div className="p-4 text-center text-sm text-gray-500">
                  Classification already exists
                </div>
              )}
          </div>
        )}
      </div>

      {/* Helper Text */}
      <div className="mt-1 text-xs text-gray-500">
        Press Enter to select first match or create new • Press Escape to close
      </div>
    </div>
  );
};

const NewsContent = () => {
  // API Data States
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [classifications, setClassifications] = useState<NewsClassification[]>(
    [],
  );
  const [availableTags, setAvailableTags] = useState<Tag[]>([]);

  // Loading States
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingClassifications, setIsLoadingClassifications] =
    useState(true);

  // Modal states (keep existing ones)
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showClassificationModal, setShowClassificationModal] = useState(false);
  const [showAddArticleModal, setShowAddArticleModal] = useState(false);
  const [showEditArticleModal, setShowEditArticleModal] = useState(false);

  // Filter states (keep existing ones)
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [classificationFilter] = useState([]);
  const [selectedArticles] = useState([]);

  // Form states (keep existing ones)
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryDescription, setNewCategoryDescription] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null,
  );
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editCategoryDescription, setEditCategoryDescription] = useState("");
  const [showDeleteCategoryModal, setShowDeleteCategoryModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(
    null,
  );
  const [deleteCategoryConfirmText, setDeleteCategoryConfirmText] =
    useState("");
  const [categorySearchQuery, setCategorySearchQuery] = useState("");

  const [newClassificationName, setNewClassificationName] = useState("");
  const [editingClassificationId, setEditingClassificationId] = useState<
    number | null
  >(null);
  const [editClassificationName, setEditClassificationName] = useState("");
  const [showDeleteClassificationModal, setShowDeleteClassificationModal] =
    useState(false);
  const [classificationToDelete, setClassificationToDelete] =
    useState<NewsClassification | null>(null);
  const [deleteClassificationConfirmText, setDeleteClassificationConfirmText] =
    useState("");
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(
    null,
  );
  const [showDeleteArticleModal, setShowDeleteArticleModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<NewsArticle | null>(
    null,
  );
  const [deleteArticleConfirmText, setDeleteArticleConfirmText] = useState("");

  // Error and success states
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Stats state
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    categories: 0,
  });

  // Article form state (update the structure)
  const [articleForm, setArticleForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    featuredImage: "",
    categoryId: "",
    status: "draft" as "draft" | "published" | "archived",
    selectedClassifications: [] as number[], // Changed to number array
    selectedTags: [] as number[], // Changed to number array
    publishedAt: "",
    metaDescription: "",
    metaKeywords: "",
  });

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  const [isLoadingNews] = useState(true);
  const [isCreatingArticle, setIsCreatingArticle] = useState(false);
  const [isUpdatingArticle, setIsUpdatingArticle] = useState(false);
  const [isDeletingArticle, setIsDeletingArticle] = useState(false);

  // Data loading functions
  const loadNewsArticles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const filters: Record<string, string | number> = {
        sortBy: "createdAt",
        sortOrder: "desc",
      };

      if (searchQuery) filters.search = searchQuery;
      if (statusFilter !== "all") filters.status = statusFilter;
      if (categoryFilter !== "all") filters.categoryId = Number(categoryFilter);

      const articles = await newsAPI.getAll(filters);
      setNewsArticles(articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load articles");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter, categoryFilter]);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      const fetchedCategories = await categoriesAPI.getAll({
        sortBy: "createdAt",
        sortOrder: "desc",
      });
      setCategories(fetchedCategories);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load categories",
      );
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  const loadClassifications = useCallback(async () => {
    try {
      setIsLoadingClassifications(true);
      const fetchedClassifications = await classificationsAPI.getAll({
        sortBy: "priority",
        sortOrder: "asc",
      });
      setClassifications(fetchedClassifications);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load classifications",
      );
    } finally {
      setIsLoadingClassifications(false);
    }
  }, []);

  const loadTags = useCallback(async () => {
    try {
      const fetchedTags = await tagsAPI.getAll({
        isActive: true,
        sortBy: "name",
        sortOrder: "asc",
      });
      setAvailableTags(fetchedTags);
    } catch (err) {
      console.error("Failed to load tags:", err);
    }
  }, []);

  const loadStats = useCallback(async () => {
    try {
      const newsStats = await newsAPI.getStats();
      const categoryStats = await categoriesAPI.getStats();

      setStats({
        total: newsStats.total,
        published: newsStats.published,
        drafts: newsStats.drafts,
        categories: categoryStats.active,
      });
    } catch (err) {
      console.error("Failed to load stats:", err);
    }
  }, []);

  useEffect(() => {
    void loadNewsArticles();
    void loadCategories();
    void loadClassifications();
    void loadTags();
    void loadStats();
  }, [loadNewsArticles, loadCategories, loadClassifications, loadTags, loadStats]);

  useEffect(() => {
    void loadNewsArticles();
  }, [searchQuery, statusFilter, categoryFilter, loadNewsArticles]);

  // Show success message helper
  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Filter articles
  const filteredArticles = newsArticles;

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) ||
      (category.description?.toLowerCase().includes(categorySearchQuery.toLowerCase())),
  );

  // Format date
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not published";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Classification management functions
  const handleAddClassification = async () => {
    if (!newClassificationName.trim()) return;

    try {
      setIsLoadingClassifications(true);
      await classificationsAPI.create({
        name: newClassificationName.trim(),
        isActive: true,
      });

      setNewClassificationName("");
      showSuccess("Classification created successfully!");

      await loadClassifications();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create classification",
      );
    } finally {
      setIsLoadingClassifications(false);
    }
  };

  const handleMoveClassification = async (
    id: number,
    direction: "up" | "down",
  ) => {
    const currentIndex = classifications.findIndex((c) => c.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === classifications.length - 1) ||
      currentIndex === -1
    )
      return;

    const newOrder = [...classifications];
    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    const currentItem = newOrder[currentIndex];
    const targetItem = newOrder[targetIndex];

    if (currentItem && targetItem) {
      [newOrder[currentIndex], newOrder[targetIndex]] = [
        targetItem,
        currentItem,
      ];

      try {
        const orderedIds = newOrder.map((c) => c.id);
        await classificationsAPI.reorder(orderedIds);
        await loadClassifications();
        showSuccess("Classifications reordered successfully!");
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to reorder classifications",
        );
      }
    }
  };

  const handleToggleClassificationActive = async (id: number) => {
    try {
      await classificationsAPI.toggleActive(id);
      showSuccess("Classification status updated!");
      await loadClassifications();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update classification",
      );
    }
  };

  const handleEditClassificationStart = (
    classification: NewsClassification,
  ) => {
    setEditingClassificationId(classification.id);
    setEditClassificationName(classification.name);
  };

  const handleEditClassificationCancel = () => {
    setEditingClassificationId(null);
    setEditClassificationName("");
  };

  const handleEditClassificationSave = async (classificationId: number) => {
    if (!editClassificationName.trim()) return;

    try {
      await classificationsAPI.update(classificationId, {
        name: editClassificationName.trim(),
      });

      setEditingClassificationId(null);
      setEditClassificationName("");
      showSuccess("Classification updated successfully!");

      await loadClassifications();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update classification",
      );
    }
  };

  const handleDeleteClassification = async () => {
    if (!classificationToDelete) return;

    try {
      await classificationsAPI.delete(classificationToDelete.id);
      showSuccess("Classification deleted successfully!");

      setShowDeleteClassificationModal(false);
      setClassificationToDelete(null);
      setDeleteClassificationConfirmText("");

      await loadClassifications();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete classification",
      );
    }
  };

  const openDeleteClassificationModal = (
    classification: NewsClassification,
  ) => {
    setClassificationToDelete(classification);
    setShowDeleteClassificationModal(true);
  };

  // Category management functions
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      setIsLoadingCategories(true);
      await categoriesAPI.create({
        name: newCategoryName.trim(),
        description: newCategoryDescription.trim(),
        isActive: true,
      });

      setNewCategoryName("");
      setNewCategoryDescription("");
      showSuccess("Category created successfully!");

      await loadCategories();
      await loadStats();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to create category",
      );
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleToggleCategoryActive = async (id: number) => {
    try {
      await categoriesAPI.toggleActive(id);
      showSuccess("Category status updated!");
      await loadCategories();
      await loadStats();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update category",
      );
    }
  };

  const handleEditCategoryStart = (category: Category) => {
    setEditingCategoryId(category.id);
    setEditCategoryName(category.name);
    setEditCategoryDescription(category.description ?? "");
  };

  const handleEditCategoryCancel = () => {
    setEditingCategoryId(null);
    setEditCategoryName("");
    setEditCategoryDescription("");
  };

  const handleEditCategorySave = async (categoryId: number) => {
    if (!editCategoryName.trim()) return;

    try {
      await categoriesAPI.update(categoryId, {
        name: editCategoryName.trim(),
        description: editCategoryDescription.trim(),
      });

      setEditingCategoryId(null);
      setEditCategoryName("");
      setEditCategoryDescription("");
      showSuccess("Category updated successfully!");

      await loadCategories();
      await loadStats();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update category",
      );
    }
  };

  const handleDeleteCategory = async () => {
    if (!categoryToDelete) return;

    try {
      await categoriesAPI.delete(categoryToDelete.id);
      showSuccess("Category deleted successfully!");

      setShowDeleteCategoryModal(false);
      setCategoryToDelete(null);
      setDeleteCategoryConfirmText("");

      await loadCategories();
      await loadStats();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete category",
      );
    }
  };

  const openDeleteCategoryModal = (category: Category) => {
    setCategoryToDelete(category);
    setShowDeleteCategoryModal(true);
  };

  // Article management functions
  const handleCreateArticle = async () => {
    try {
      setIsCreatingArticle(true);

      await newsAPI.create(
        {
          title: articleForm.title,
          excerpt: articleForm.excerpt,
          content: articleForm.content,
          categoryId: Number(articleForm.categoryId),
          status: articleForm.status,
          metaDescription: articleForm.metaDescription ?? undefined,
          metaKeywords: articleForm.metaKeywords ?? undefined,
          publishedAt: articleForm.publishedAt ?? undefined,
          selectedTags: articleForm.selectedTags,
          selectedClassifications: articleForm.selectedClassifications,
        },
        selectedImageFile ?? undefined,
      ); // Pass the selected file

      showSuccess("Article created successfully!");
      setShowAddArticleModal(false);
      resetArticleForm();
      await loadNewsArticles();
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create article");
    } finally {
      setIsCreatingArticle(false);
    }
  };

  const handleUpdateArticle = async () => {
    if (!editingArticle) return;

    try {
      setIsUpdatingArticle(true);

      await newsAPI.update(
        editingArticle.id,
        {
          title: articleForm.title,
          excerpt: articleForm.excerpt,
          content: articleForm.content,
          categoryId: Number(articleForm.categoryId),
          status: articleForm.status,
          metaDescription: articleForm.metaDescription ?? undefined,
          metaKeywords: articleForm.metaKeywords ?? undefined,
          publishedAt: articleForm.publishedAt ?? undefined,
          selectedTags: articleForm.selectedTags,
          selectedClassifications: articleForm.selectedClassifications,
        },
        selectedImageFile ?? undefined,
      ); // Pass the selected file

      showSuccess("Article updated successfully!");
      setShowEditArticleModal(false);
      setEditingArticle(null);
      resetArticleForm();
      await loadNewsArticles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update article");
    } finally {
      setIsUpdatingArticle(false);
    }
  };

  const openDeleteArticleModal = (article: NewsArticle) => {
    setArticleToDelete(article);
    setShowDeleteArticleModal(true);
  };

  const handleDeleteArticle = async () => {
    if (!articleToDelete) return;

    try {
      setIsDeletingArticle(true); // Add this line
      await newsAPI.delete(articleToDelete.id);
      showSuccess("Article deleted successfully!");

      setShowDeleteArticleModal(false);
      setArticleToDelete(null);
      setDeleteArticleConfirmText("");

      await loadNewsArticles();
      await loadStats();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete article");
    } finally {
      setIsDeletingArticle(false); // Add this line
    }
  };

  const resetArticleForm = () => {
    setArticleForm({
      title: "",
      excerpt: "",
      content: "",
      featuredImage: "",
      categoryId: "",
      status: "draft",
      selectedClassifications: [],
      selectedTags: [],
      publishedAt: "",
      metaDescription: "",
      metaKeywords: "",
    });

    setSelectedImageFile(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              News Management
            </h2>
            <p className="mt-1 text-gray-600">
              Manage news articles, categories, and classifications
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowCategoryModal(true)}
              className="flex items-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-white transition-colors hover:bg-gray-700"
            >
              <Settings size={16} />
              Manage Categories
            </button>
            <button
              onClick={() => setShowClassificationModal(true)}
              className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white transition-colors hover:bg-purple-700"
            >
              <Tag size={16} />
              Manage Classifications
            </button>
            <button
              onClick={() => setShowAddArticleModal(true)}
              className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              <Plus size={16} />
              New Article
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-blue-100 p-2">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">
                Total Articles
              </p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-green-100 p-2">
              <Eye className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.published}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-yellow-100 p-2">
              <Edit3 className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.drafts}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center">
            <div className="rounded-lg bg-purple-100 p-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Categories</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.categories}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Status Filter */}
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Status:</span>
            <div className="flex space-x-1 rounded-lg bg-gray-100 p-1">
              {[
                { key: "all", label: "All", count: stats.total },
                {
                  key: "published",
                  label: "Published",
                  count: stats.published,
                },
                { key: "draft", label: "Drafts", count: stats.drafts },
              ].map(({ key, label, count }) => (
                <button
                  key={key}
                  onClick={() => setStatusFilter(key)}
                  className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
                    statusFilter === key
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {label} ({count})
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-transparent focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Additional Filters */}
        <div className="mt-4 flex flex-wrap gap-4">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories
              .filter((c) => c.isActive)
              .map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      {/* Articles List */}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">
            Articles ({filteredArticles.length})
          </h3>
          {selectedArticles.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {selectedArticles.length} selected
              </span>
              <button className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
                Bulk Actions
              </button>
            </div>
          )}
        </div>

        {isLoading && newsArticles.length === 0 ? (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-lg border border-gray-200 p-4"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-lg bg-gray-200"></div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                      <div className="flex gap-1">
                        <div className="h-4 w-4 rounded bg-gray-200"></div>
                        <div className="h-4 w-4 rounded bg-gray-200"></div>
                        <div className="h-4 w-4 rounded bg-gray-200"></div>
                      </div>
                    </div>
                    <div className="mb-3 space-y-2">
                      <div className="h-3 w-full rounded bg-gray-200"></div>
                      <div className="h-3 w-2/3 rounded bg-gray-200"></div>
                    </div>
                    <div className="mb-3 flex flex-wrap gap-2">
                      <div className="h-5 w-16 rounded-full bg-gray-200"></div>
                      <div className="h-5 w-20 rounded-full bg-gray-200"></div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="h-3 w-20 rounded bg-gray-200"></div>
                      <div className="h-3 w-16 rounded bg-gray-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !isLoading && filteredArticles.length === 0 ? (
          <div className="py-12 text-center">
            <FileText className="mx-auto mb-4 h-12 w-12 text-gray-400" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No articles found
            </h3>
            <p className="text-gray-600">
              {searchQuery
                ? "Try adjusting your search terms."
                : "Create your first article to get started."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="rounded-lg border border-gray-200 p-4 transition-shadow hover:shadow-md"
              >
                <div className="flex gap-4">
                  <div className="relative h-20 w-20 rounded-lg overflow-hidden">
                    <Image
                      src={
                        article.featuredImage ?? "/assets/placeholder-image.png"
                      }
                      alt={article.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = "/assets/placeholder-image.png";
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-2 flex items-start justify-between">
                      <h4 className="line-clamp-2 font-semibold text-gray-900">
                        {article.title}
                      </h4>
                      <div className="ml-2 flex gap-1">
                        <button
                          onClick={() => {
                            setEditingArticle(article);
                            setArticleForm({
                              title: article.title,
                              excerpt: article.excerpt,
                              content: article.content,
                              featuredImage: article.featuredImage ?? "",
                              categoryId: article.category.id.toString(),
                              status: article.status,
                              selectedClassifications:
                                article.classifications.map((c) => c.id),
                              selectedTags: article.tags.map((t) => t.id),
                              publishedAt: article.publishedAt ?? "",
                              metaDescription: article.metaDescription ?? "",
                              metaKeywords: article.metaKeywords ?? "",
                            });
                            setShowEditArticleModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="Edit"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-green-600"
                          title="Duplicate"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete"
                          onClick={() => openDeleteArticleModal(article)} // NEW CODE
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    <p className="mb-3 line-clamp-2 text-sm text-gray-600">
                      {article.excerpt}
                    </p>

                    <div className="mb-3 flex flex-wrap gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${getStatusColor(article.status)}`}
                      >
                        {article.status.charAt(0).toUpperCase() +
                          article.status.slice(1)}
                      </span>
                      <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {article.category.name}
                      </span>
                      {article.classifications.map((classification) => (
                        <span
                          key={classification.id}
                          className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${
                            classification.name === "Featured"
                              ? "border-amber-200 bg-amber-100 text-amber-800"
                              : classification.name === "Breaking"
                                ? "border-red-200 bg-red-100 text-red-800"
                                : "border-purple-200 bg-purple-100 text-purple-800"
                          }`}
                        >
                          {classification.name === "Featured" && (
                            <Star size={10} className="mr-1" />
                          )}
                          {classification.name === "Breaking" && (
                            <AlertCircle size={10} className="mr-1" />
                          )}
                          {classification.name}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{formatDate(article.publishedAt!)}</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit Article Modal */}
      {(showAddArticleModal || showEditArticleModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                {showAddArticleModal ? "Add New Article" : "Edit Article"}
              </h3>
              <button
                onClick={() => {
                  setShowAddArticleModal(false);
                  setShowEditArticleModal(false);
                  setEditingArticle(null);
                  resetArticleForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Left Column - Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={articleForm.title}
                    onChange={(e) =>
                      setArticleForm({ ...articleForm, title: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter article title..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Excerpt *
                  </label>
                  <textarea
                    value={articleForm.excerpt}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        excerpt: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the article..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Content *
                  </label>
                  <div className="rounded-lg border border-gray-300">
                    <Editor
                      apiKey="v1bpwn8hii7h2sv30oawk071p52jn5slqyr4hemib8okdzaf"
                      value={articleForm.content}
                      onEditorChange={(content: string) =>
                        setArticleForm({
                          ...articleForm,
                          content: content,
                        })
                      }
                      init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                          "advlist",
                          "autolink",
                          "lists",
                          "link",
                          "image",
                          "charmap",
                          "preview",
                          "anchor",
                          "searchreplace",
                          "visualblocks",
                          "code",
                          "fullscreen",
                          "insertdatetime",
                          "media",
                          "table",
                          "code",
                          "help",
                          "wordcount",
                        ],
                        toolbar:
                          "undo redo | blocks | " +
                          "bold italic forecolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                        placeholder: "Write your article content here...",
                        branding: false,
                        statusbar: false,
                        resize: false,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Featured Image
                  </label>
                  <ImageUpload
                    currentImageUrl={
                      articleForm.featuredImage ?? undefined
                    }
                    onFileSelect={(file) => setSelectedImageFile(file)}
                    onImageRemove={() => {
                      setArticleForm({ ...articleForm, featuredImage: "" });
                      setSelectedImageFile(null);
                    }}
                    disabled={isCreatingArticle || isUpdatingArticle}
                  />
                </div>
              </div>

              {/* Right Column - Metadata */}
              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={articleForm.status}
                    onChange={(e) =>
                      setArticleForm({
                        ...articleForm,
                        status: e.target.value as
                          | "draft"
                          | "published"
                          | "archived",
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Category *
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={articleForm.categoryId}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          categoryId: e.target.value,
                        })
                      }
                      className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select category...</option>
                      {categories
                        .filter((c) => c.isActive)
                        .map((category) => (
                          <option
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </option>
                        ))}
                    </select>
                    <button
                      onClick={() => setShowCategoryModal(true)}
                      className="rounded-lg bg-gray-100 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200"
                      title="Add new category"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Classifications
                  </label>
                  <ClassificationSelector
                    selectedClassifications={
                      articleForm.selectedClassifications
                    }
                    availableClassifications={classifications.filter(
                      (c) => c.isActive,
                    )}
                    onSelectionChange={(selected) =>
                      setArticleForm({
                        ...articleForm,
                        selectedClassifications: selected,
                      })
                    }
                    onCreateNew={async (name) => {
                      try {
                        // Get the highest priority to add new one at the end
                        const maxPriority = Math.max(
                          ...classifications.map((c) => c.priority),
                          0,
                        );

                        const newClassification =
                          await classificationsAPI.create({
                            name: name.trim(),
                            priority: maxPriority + 1,
                            isActive: true,
                          });

                        // Reload classifications to update the list
                        await loadClassifications();

                        // Add the new classification to selected ones
                        setArticleForm({
                          ...articleForm,
                          selectedClassifications: [
                            ...articleForm.selectedClassifications,
                            newClassification.id,
                          ],
                        });

                        showSuccess(
                          `Classification "${name}" created successfully!`,
                        );
                        return newClassification;
                      } catch (err) {
                        setError(
                          err instanceof Error
                            ? err.message
                            : "Failed to create classification",
                        );
                        throw err;
                      }
                    }}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  <TagSelector
                    selectedTags={articleForm.selectedTags}
                    availableTags={availableTags.filter((t) => t.isActive)}
                    onSelectionChange={(selected) =>
                      setArticleForm({
                        ...articleForm,
                        selectedTags: selected,
                      })
                    }
                    onCreateNew={async (name) => {
                      try {
                        const newTag = await tagsAPI.create(name.trim(), true);

                        // Reload tags to update the list
                        await loadTags();

                        // Add the new tag to selected ones
                        setArticleForm({
                          ...articleForm,
                          selectedTags: [
                            ...articleForm.selectedTags,
                            newTag.id,
                          ],
                        });

                        showSuccess(`Tag "${name}" created successfully!`);
                        return newTag as Tag;
                      } catch (err) {
                        setError(
                          err instanceof Error
                            ? err.message
                            : "Failed to create tag",
                        );
                        throw err;
                      }
                    }}
                  />
                </div>

                {articleForm.status === "published" && (
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Publish Date
                    </label>
                    <input
                      type="datetime-local"
                      value={articleForm.publishedAt}
                      onChange={(e) =>
                        setArticleForm({
                          ...articleForm,
                          publishedAt: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3 border-t border-gray-200 pt-4">
              <button
                onClick={() => {
                  setShowAddArticleModal(false);
                  setShowEditArticleModal(false);
                  setEditingArticle(null);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (showAddArticleModal) {
                    void handleCreateArticle();
                  } else {
                    void handleUpdateArticle();
                  }
                }}
                disabled={
                  !articleForm.title ||
                  !articleForm.excerpt ||
                  !articleForm.content ||
                  !articleForm.categoryId ||
                  isCreatingArticle ||
                  isUpdatingArticle
                }
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
              >
                {isCreatingArticle || isUpdatingArticle ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                ) : (
                  <Save size={16} />
                )}
                {showAddArticleModal ? "Create Article" : "Update Article"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Management Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Manage Categories
              </h3>
              <button
                onClick={() => {
                  setShowCategoryModal(false);
                  setCategorySearchQuery("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Add New Category */}
            <div className="mb-6 rounded-lg border border-gray-200 p-4">
              <h4 className="mb-3 font-medium text-gray-900">
                Add New Category
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Category name..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Description (optional)..."
                  value={newCategoryDescription}
                  onChange={(e) => setNewCategoryDescription(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  rows={2}
                />
                <button
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:bg-gray-400"
                >
                  <Plus size={16} />
                  Add Category
                </button>
              </div>
            </div>

            {/* Categories List */}
            <div>
              {/* Search Bar */}
              <div className="mb-4">
                <div className="relative">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 transform text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={categorySearchQuery}
                    onChange={(e) => setCategorySearchQuery(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                  {categorySearchQuery && (
                    <button
                      onClick={() => setCategorySearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Showing {filteredCategories.length} of {categories.length}{" "}
                  categories
                </div>
              </div>

              {/* Categories List with Search Results */}
              <div className="max-h-64 overflow-y-auto">
                {filteredCategories.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="mb-2 text-gray-400">
                      <BookOpen className="mx-auto h-8 w-8" />
                    </div>
                    <p className="text-sm text-gray-600">
                      {categorySearchQuery
                        ? `No categories found matching "${categorySearchQuery}"`
                        : "No categories available"}
                    </p>
                    {categorySearchQuery && (
                      <button
                        onClick={() => setCategorySearchQuery("")}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-700"
                      >
                        Clear search
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    {filteredCategories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                      >
                        <div className="flex-1">
                          {editingCategoryId === category.id ? (
                            <div className="space-y-2">
                              <input
                                type="text"
                                value={editCategoryName}
                                onChange={(e) =>
                                  setEditCategoryName(e.target.value)
                                }
                                onKeyPress={(e) =>
                                  e.key === "Enter" &&
                                  handleEditCategorySave(category.id)
                                }
                                className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="Category name"
                                autoFocus
                              />
                              <textarea
                                value={editCategoryDescription}
                                onChange={(e) =>
                                  setEditCategoryDescription(e.target.value)
                                }
                                className="w-full rounded border border-gray-300 px-2 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                placeholder="Description (optional)"
                                rows={2}
                              />
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleEditCategorySave(category.id)
                                  }
                                  className="flex items-center gap-1 rounded bg-green-600 px-2 py-1 text-xs text-white hover:bg-green-700"
                                >
                                  <Check size={12} />
                                  Save
                                </button>
                                <button
                                  onClick={handleEditCategoryCancel}
                                  className="flex items-center gap-1 rounded bg-gray-600 px-2 py-1 text-xs text-white hover:bg-gray-700"
                                >
                                  <X size={12} />
                                  Cancel
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center gap-3">
                                <h5 className="font-medium text-gray-900">
                                  {categorySearchQuery ? (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: category.name.replace(
                                          new RegExp(
                                            `(${categorySearchQuery})`,
                                            "gi",
                                          ),
                                          '<mark class="bg-yellow-200">$1</mark>',
                                        ),
                                      }}
                                    />
                                  ) : (
                                    category.name
                                  )}
                                </h5>
                                <span className="text-sm text-gray-500">
                                  ({category.articleCount} articles)
                                </span>
                              </div>
                              {category.description && (
                                <p className="mt-1 text-sm text-gray-600">
                                  {categorySearchQuery ? (
                                    <span
                                      dangerouslySetInnerHTML={{
                                        __html: category.description.replace(
                                          new RegExp(
                                            `(${categorySearchQuery})`,
                                            "gi",
                                          ),
                                          '<mark class="bg-yellow-200">$1</mark>',
                                        ),
                                      }}
                                    />
                                  ) : (
                                    category.description
                                  )}
                                </p>
                              )}
                            </div>
                          )}
                        </div>

                        {editingCategoryId !== category.id && (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() =>
                                handleToggleCategoryActive(category.id)
                              }
                              className={`flex items-center gap-1 text-sm transition-colors ${
                                category.isActive
                                  ? "text-green-600 hover:text-green-700"
                                  : "text-gray-400 hover:text-gray-600"
                              }`}
                            >
                              {category.isActive ? (
                                <ToggleRight size={16} />
                              ) : (
                                <ToggleLeft size={16} />
                              )}
                              {category.isActive ? "Active" : "Inactive"}
                            </button>
                            <button
                              onClick={() => handleEditCategoryStart(category)}
                              className="p-1 text-gray-400 hover:text-blue-600"
                              title="Edit category"
                            >
                              <Edit3 size={14} />
                            </button>
                            <button
                              onClick={() => openDeleteCategoryModal(category)}
                              className="p-1 text-gray-400 hover:text-red-600"
                              title="Delete category"
                              disabled={category.articleCount > 0}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Classification Management Modal */}
      {showClassificationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Manage Classifications
              </h3>
              <button
                onClick={() => setShowClassificationModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            {/* Add New Classification */}
            <div className="mb-6 rounded-lg border border-gray-200 p-4">
              <h4 className="mb-3 font-medium text-gray-900">
                Add New Classification
              </h4>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Classification name..."
                  value={newClassificationName}
                  onChange={(e) => setNewClassificationName(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddClassification}
                  disabled={!newClassificationName.trim()}
                  className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 disabled:bg-gray-400"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>
            </div>

            {/* Classifications List */}
            <div className="space-y-2">
              <div className="mb-3 text-sm text-gray-600">
                Drag to reorder • Active classifications appear as sections on
                the news page
              </div>
              {classifications
                .sort((a, b) => a.priority - b.priority)
                .map((classification, index) => (
                  <div
                    key={classification.id}
                    className="flex items-center justify-between rounded-lg border border-gray-200 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() =>
                            handleMoveClassification(classification.id, "up")
                          }
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronUp size={14} />
                        </button>
                        <button
                          onClick={() =>
                            handleMoveClassification(classification.id, "down")
                          }
                          disabled={index === classifications.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                        >
                          <ChevronDown size={14} />
                        </button>
                      </div>

                      <div className="flex-1">
                        {editingClassificationId === classification.id ? (
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={editClassificationName}
                              onChange={(e) =>
                                setEditClassificationName(e.target.value)
                              }
                              onKeyPress={(e) =>
                                e.key === "Enter" &&
                                handleEditClassificationSave(classification.id)
                              }
                              className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-transparent focus:ring-2 focus:ring-blue-500"
                              autoFocus
                            />
                            <button
                              onClick={() =>
                                handleEditClassificationSave(classification.id)
                              }
                              className="p-1 text-green-600 hover:text-green-700"
                              title="Save"
                            >
                              <Check size={16} />
                            </button>
                            <button
                              onClick={handleEditClassificationCancel}
                              className="p-1 text-gray-400 hover:text-gray-600"
                              title="Cancel"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              #{classification.priority}
                            </span>
                            <h5 className="font-medium text-gray-900">
                              {classification.name}
                            </h5>
                            <span className="text-sm text-gray-500">
                              ({classification.articleCount} articles)
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {editingClassificationId !== classification.id && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleToggleClassificationActive(classification.id)
                          }
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            classification.isActive
                              ? "text-green-600 hover:text-green-700"
                              : "text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          {classification.isActive ? (
                            <ToggleRight size={16} />
                          ) : (
                            <ToggleLeft size={16} />
                          )}
                          {classification.isActive ? "Active" : "Inactive"}
                        </button>
                        <button
                          onClick={() =>
                            handleEditClassificationStart(classification)
                          }
                          className="p-1 text-gray-400 hover:text-blue-600"
                          title="Edit classification"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() =>
                            openDeleteClassificationModal(classification)
                          }
                          className="p-1 text-gray-400 hover:text-red-600"
                          title="Delete classification"
                          disabled={classification.articleCount > 0}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Delete Category Confirmation Modal */}
      {showDeleteCategoryModal && categoryToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Category
              </h3>
              <button
                onClick={() => {
                  setShowDeleteCategoryModal(false);
                  setCategoryToDelete(null);
                  setDeleteCategoryConfirmText("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-4 text-gray-600">
                Are you sure you want to delete the category{" "}
                <strong>&quot;{categoryToDelete.name}&quot;</strong>?
              </p>

              {categoryToDelete.articleCount > 0 ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  ⚠️ Cannot delete category with {categoryToDelete.articleCount}{" "}
                  associated articles. Please move or delete the articles first.
                </div>
              ) : (
                <>
                  <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    ⚠️ This action cannot be undone. The category will be
                    permanently removed.
                  </p>

                  <div className="mt-4 rounded-lg border bg-gray-50 p-3">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Type &quot;
                      <span className="font-bold text-red-600">delete</span>
                      &quot; to confirm:
                    </label>
                    <input
                      type="text"
                      placeholder="Type 'delete' to confirm"
                      value={deleteCategoryConfirmText}
                      onChange={(e) =>
                        setDeleteCategoryConfirmText(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteCategoryModal(false);
                  setCategoryToDelete(null);
                  setDeleteCategoryConfirmText("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              {categoryToDelete.articleCount === 0 && (
                <button
                  onClick={handleDeleteCategory}
                  disabled={deleteCategoryConfirmText !== "delete"}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Delete Category
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Classification Confirmation Modal */}
      {showDeleteClassificationModal && classificationToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Classification
              </h3>
              <button
                onClick={() => {
                  setShowDeleteClassificationModal(false);
                  setClassificationToDelete(null);
                  setDeleteClassificationConfirmText("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-4 text-gray-600">
                Are you sure you want to delete the classification{" "}
                <strong>&quot;{classificationToDelete.name}&quot;</strong>?
              </p>

              {classificationToDelete.articleCount > 0 ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                  ⚠️ Cannot delete classification with{" "}
                  {classificationToDelete.articleCount} associated articles.
                  Please remove the classification from articles first.
                </div>
              ) : (
                <>
                  <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                    ⚠️ This action cannot be undone. The classification will be
                    permanently removed.
                  </p>

                  <div className="mt-4 rounded-lg border bg-gray-50 p-3">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Type &quot;
                      <span className="font-bold text-red-600">delete</span>
                      &quot; to confirm:
                    </label>
                    <input
                      type="text"
                      placeholder="Type 'delete' to confirm"
                      value={deleteClassificationConfirmText}
                      onChange={(e) =>
                        setDeleteClassificationConfirmText(e.target.value)
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteClassificationModal(false);
                  setClassificationToDelete(null);
                  setDeleteClassificationConfirmText("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              {classificationToDelete.articleCount === 0 && (
                <button
                  onClick={handleDeleteClassification}
                  disabled={deleteClassificationConfirmText !== "delete"}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                >
                  Delete Classification
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Article Confirmation Modal */}
      {showDeleteArticleModal && articleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                Delete Article
              </h3>
              <button
                onClick={() => {
                  setShowDeleteArticleModal(false);
                  setArticleToDelete(null);
                  setDeleteArticleConfirmText("");
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6">
              <p className="mb-4 text-gray-600">
                Are you sure you want to delete the article{" "}
                <strong>&quot;{articleToDelete.title}&quot;</strong>?
              </p>

              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
                ⚠️ This action cannot be undone. The article and all its
                associated data will be permanently removed.
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
                  value={deleteArticleConfirmText}
                  onChange={(e) => setDeleteArticleConfirmText(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteArticleModal(false);
                  setArticleToDelete(null);
                  setDeleteArticleConfirmText("");
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteArticle}
                disabled={
                  deleteArticleConfirmText !== "delete" || isDeletingArticle
                }
                className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isDeletingArticle ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                ) : null}
                Delete Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const NewsManagementPage = () => {
  return (
    <AdminLayout currentPage="news-management">
      <NewsContent />
    </AdminLayout>
  );
};

export default NewsManagementPage;
