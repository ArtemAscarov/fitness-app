import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";
import {
  CategorySchema,
  CategorySchemaPatch,
} from "../validators/category.validator.js";
import { bodyValidator, paramValidator } from "../middleware/Validators.js";
import { IdParamsSchema } from "../validators/general.validators.js";

const categoryRouter = Router();

categoryRouter.post(
  "/",
  bodyValidator(CategorySchema),
  CategoryController.create,
);

categoryRouter.get("/", CategoryController.get);

categoryRouter.patch(
  "/:id",
  paramValidator(IdParamsSchema),
  bodyValidator(CategorySchemaPatch),
  CategoryController.update,
);

categoryRouter.delete(
  "/:id",
  paramValidator(IdParamsSchema),
  CategoryController.delete,
);

export default categoryRouter;
