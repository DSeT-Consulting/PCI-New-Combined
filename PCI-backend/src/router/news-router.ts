import { Router } from "express";
import * as NewsController from "../controller/news-controller.js";
import upload from "../middleware/upload.js";

const newsRouter = Router();

// Public routes (add these at the top, before existing routes)
newsRouter.get("/public/page-data", NewsController.getNewsPageData);
newsRouter.get("/public/section/:classificationId", NewsController.getNewsSection);
newsRouter.get("/public/search", NewsController.searchPublishedNews);
newsRouter.get("/public/categories", NewsController.getPublicCategories);
newsRouter.get("/public/classifications", NewsController.getPublicClassifications);
newsRouter.get("/public/article/:slug", NewsController.getPublicNewsBySlug);
newsRouter.get("/public/related/:slug", NewsController.getRelatedNews);
newsRouter.post("/public/view/:slug", NewsController.incrementNewsViewCount);

// Create new news article (with image upload)
newsRouter.post("/", upload.single("featuredImage"), NewsController.createNews);

// Get all news articles with filtering
newsRouter.get("/", NewsController.findAllNews);

// Get news statistics
newsRouter.get("/stats", NewsController.getNewsStats);

// Bulk operations
newsRouter.post("/bulk", NewsController.bulkUpdateNews);

// Get news article by slug (for public frontend)
newsRouter.get("/slug/:slug", NewsController.getNewsBySlug);

// Get news article by ID
newsRouter.get("/:id", NewsController.getNewsById);

// Update news article (with optional image upload)
newsRouter.put("/:id", upload.single("featuredImage"), NewsController.updateNews);

// Publish news article
newsRouter.patch("/:id/publish", NewsController.publishNews);

// Delete news article
newsRouter.delete("/:id", NewsController.deleteNews);

export default newsRouter;
