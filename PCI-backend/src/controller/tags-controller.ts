import { Request, Response } from "express";
import * as TagsService from "../service/tags-service.js";

export const createTag = async (req: Request, res: Response) => {
  try {
    const { name, isActive } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        error: "Tag name is required and must be a non-empty string",
      });
    }

    // Check if tag already exists
    const existingTag = await TagsService.findByName(name.trim());
    if (existingTag) {
      return res.status(409).json({
        error: "Tag with this name already exists",
      });
    }

    const result = await TagsService.create({
      name: name.trim(),
      isActive: isActive ?? true,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllTags = async (req: Request, res: Response) => {
  try {
    const { search, isActive, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    const filters = {
      search: search as string,
      isActive: isActive === "true" ? true : isActive === "false" ? false : undefined,
      sortBy: sortBy as "name" | "createdAt",
      sortOrder: sortOrder as "asc" | "desc",
    };

    const tags = await TagsService.findAll(filters);
    res.status(200).json(tags);
  } catch (error) {
    console.error("Error fetching tags:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTagById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }

    const tag = await TagsService.findById(id);

    if (!tag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    res.status(200).json(tag);
  } catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, isActive } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }

    // Check if tag exists
    const existingTag = await TagsService.findById(id);
    if (!existingTag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    // If updating name, check for duplicates
    if (name && name !== existingTag.name) {
      const duplicateTag = await TagsService.findByName(name.trim());
      if (duplicateTag && duplicateTag.id !== id) {
        return res.status(409).json({
          error: "Tag with this name already exists",
        });
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (isActive !== undefined) updateData.isActive = isActive;

    const result = await TagsService.update(id, updateData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }

    const existingTag = await TagsService.findById(id);
    if (!existingTag) {
      return res.status(404).json({ error: "Tag not found" });
    }

    await TagsService.deleteTag(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleTagActive = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid tag ID" });
    }

    const result = await TagsService.toggleActive(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error toggling tag status:", error);
    if (error instanceof Error && error.message === "Tag not found") {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getTagsStats = async (req: Request, res: Response) => {
  try {
    const stats = await TagsService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching tags stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
