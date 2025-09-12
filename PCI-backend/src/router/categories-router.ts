import { Router } from "express";
import * as CategoriesController from "../controller/categories-controller.js";

const categoriesRouter = Router();

categoriesRouter.post("/", CategoriesController.createCategory);
categoriesRouter.get("/", CategoriesController.findAllCategories);
categoriesRouter.get("/stats", CategoriesController.getCategoriesStats);
categoriesRouter.get("/:id", CategoriesController.getCategoryById);
categoriesRouter.put("/:id", CategoriesController.updateCategory);
categoriesRouter.patch("/:id/toggle", CategoriesController.toggleCategoryActive);
categoriesRouter.delete("/:id", CategoriesController.deleteCategory);

export default categoriesRouter;
