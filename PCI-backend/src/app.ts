import express from "express";
import cors from "cors";
import path from "path";
import tagsRouter from "./router/tags-router.js";
import categoriesRouter from "./router/categories-router.js";
import newsClassificationsRouter from "./router/news-classifications-router.js";
import newsRouter from "./router/news-router.js";
import { health } from "./controller/health-controller.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://www.paralympicindia.com",
      "https://staging.paralympicindia.com"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  })
);

// Serve static files for uploaded images
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Health check endpoint
app.get("/health", health);

app.use("/api/tags", tagsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/news-classifications", newsClassificationsRouter);
app.use("/api/news", newsRouter);

export default app;
