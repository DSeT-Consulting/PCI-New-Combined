import { Request, Response } from "express";
import * as NewsClassificationsService from "../service/news-classifications-service.js";

export const createClassification = async (req: Request, res: Response) => {
  try {
    const { name, priority, isActive } = req.body;

    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return res.status(400).json({
        error: "Classification name is required and must be a non-empty string",
      });
    }

    // Check if classification already exists
    const existingClassification = await NewsClassificationsService.findByName(name.trim());
    if (existingClassification) {
      return res.status(409).json({
        error: "Classification with this name already exists",
      });
    }

    const result = await NewsClassificationsService.create({
      name: name.trim(),
      priority,
      isActive: isActive ?? true,
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating classification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const findAllClassifications = async (req: Request, res: Response) => {
  try {
    const { search, isActive, sortBy = "priority", sortOrder = "asc" } = req.query;

    const filters = {
      search: search as string,
      isActive: isActive === "true" ? true : isActive === "false" ? false : undefined,
      sortBy: sortBy as "name" | "priority" | "createdAt",
      sortOrder: sortOrder as "asc" | "desc",
    };

    const classifications = await NewsClassificationsService.findAll(filters);
    res.status(200).json(classifications);
  } catch (error) {
    console.error("Error fetching classifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getClassificationById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid classification ID" });
    }

    const classification = await NewsClassificationsService.findById(id);

    if (!classification) {
      return res.status(404).json({ error: "Classification not found" });
    }

    res.status(200).json(classification);
  } catch (error) {
    console.error("Error fetching classification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateClassification = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { name, priority, isActive } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid classification ID" });
    }

    // Check if classification exists
    const existingClassification = await NewsClassificationsService.findById(id);
    if (!existingClassification) {
      return res.status(404).json({ error: "Classification not found" });
    }

    // If updating name, check for duplicates
    if (name && name !== existingClassification.name) {
      const duplicateClassification = await NewsClassificationsService.findByName(name.trim());
      if (duplicateClassification && duplicateClassification.id !== id) {
        return res.status(409).json({
          error: "Classification with this name already exists",
        });
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name.trim();
    if (priority !== undefined) updateData.priority = priority;
    if (isActive !== undefined) updateData.isActive = isActive;

    const result = await NewsClassificationsService.update(id, updateData);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error updating classification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteClassification = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid classification ID" });
    }

    const existingClassification = await NewsClassificationsService.findById(id);
    if (!existingClassification) {
      return res.status(404).json({ error: "Classification not found" });
    }

    // Check if classification has articles
    if (existingClassification.articleCount > 0) {
      return res.status(400).json({
        error: `Cannot delete classification with ${existingClassification.articleCount} associated articles`,
      });
    }

    await NewsClassificationsService.deleteClassification(id);
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting classification:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const toggleClassificationActive = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid classification ID" });
    }

    const result = await NewsClassificationsService.toggleActive(id);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error toggling classification status:", error);
    if (error instanceof Error && error.message === "Classification not found") {
      return res.status(404).json({ error: "Classification not found" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

export const reorderClassifications = async (req: Request, res: Response) => {
  try {
    const { orderedIds } = req.body;

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return res.status(400).json({
        error: "orderedIds must be a non-empty array of classification IDs",
      });
    }

    // Validate all IDs are numbers
    const invalidIds = orderedIds.filter((id) => !Number.isInteger(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        error: "All classification IDs must be integers",
      });
    }

    const result = await NewsClassificationsService.reorderClassifications(orderedIds);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error reordering classifications:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getClassificationsStats = async (req: Request, res: Response) => {
  try {
    const stats = await NewsClassificationsService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error("Error fetching classifications stats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
