import { Router } from "express";
import * as NewsClassificationsController from "../controller/news-classifications-controller.js";

const newsClassificationsRouter = Router();

newsClassificationsRouter.post("/", NewsClassificationsController.createClassification);
newsClassificationsRouter.get("/", NewsClassificationsController.findAllClassifications);
newsClassificationsRouter.get("/stats", NewsClassificationsController.getClassificationsStats);
newsClassificationsRouter.post("/reorder", NewsClassificationsController.reorderClassifications);
newsClassificationsRouter.get("/:id", NewsClassificationsController.getClassificationById);
newsClassificationsRouter.put("/:id", NewsClassificationsController.updateClassification);
newsClassificationsRouter.patch("/:id/toggle", NewsClassificationsController.toggleClassificationActive);
newsClassificationsRouter.delete("/:id", NewsClassificationsController.deleteClassification);

export default newsClassificationsRouter;
