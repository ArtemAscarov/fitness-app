import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";

const categoryRouter = Router();

categoryRouter.post("/", CategoryController.create);
categoryRouter.get("/", CategoryController.get);
categoryRouter.patch("/", CategoryController.update);
categoryRouter.delete("/", CategoryController.delete);

export default categoryRouter;
