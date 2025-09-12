import { Router } from "express";
import * as TagsController from "../controller/tags-controller.js";

const tagsRouter = Router();

tagsRouter.post("/", TagsController.createTag);
tagsRouter.get("/", TagsController.findAllTags);
tagsRouter.get("/stats", TagsController.getTagsStats);
tagsRouter.get("/:id", TagsController.getTagById);
tagsRouter.put("/:id", TagsController.updateTag);
tagsRouter.patch("/:id/toggle", TagsController.toggleTagActive);
tagsRouter.delete("/:id", TagsController.deleteTag);

export default tagsRouter;
