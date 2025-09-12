import { Request, Response } from "express";
import * as CategoriesService from "../service/categories-service.js";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, isActive } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        error: "Category name is required and must be a non-empty string",
      });
    }

    // Check if category already exists
    const existingCategory = await CategoriesService.findByName(name.trim());
    if (existingCategory) {
      return res.status(409).json({
        error: "Category with this name already exists",
      });
    }

    const result = await CategoriesService.create({
      name: name.trim(),
      description: description?.trim(),
      isActive: isActive ?? true,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllCategories = async (req: Request, res: Response) => {
  try {
    const { search, isActive, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    const filters = {
      search: search as string,
      isActive: isActive === "true" ? true : isActive === "false" ? false : undefined,
      sortBy: sortBy as "name" | "createdAt",
      sortOrder: sortOrder as "asc" | "desc",
    };

    const categories = await CategoriesService.findAll(filters);
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const category = await CategoriesService.findById(id);

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, description, isActive } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    // Check if category exists
    const existingCategory = await CategoriesService.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // If updating name, check for duplicates
    if (name && name !== existingCategory.name) {
      const duplicateCategory = await CategoriesService.findByName(name.trim());
      if (duplicateCategory && duplicateCategory.id !== id) {
        return res.status(409).json({
          error: "Category with this name already exists",
        });
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (description !== undefined) updateData.description = description?.trim();
    if (isActive !== undefined) updateData.isActive = isActive;

    const result = await CategoriesService.update(id, updateData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const existingCategory = await CategoriesService.findById(id);
    if (!existingCategory) {
      return res.status(404).json({ error: "Category not found" });
    }

    // Check if category has articles
    if (existingCategory.articleCount > 0) {
      return res.status(400).json({
        error: `Cannot delete category with ${existingCategory.articleCount} associated articles`,
      });
    }

    await CategoriesService.deleteCategory(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleCategoryActive = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid category ID" });
    }

    const result = await CategoriesService.toggleActive(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error toggling category status:", error);
    if (error instanceof Error && error.message === "Category not found") {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategoriesStats = async (req: Request, res: Response) => {
  try {
    const stats = await CategoriesService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching categories stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
