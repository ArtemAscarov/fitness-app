import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import {
  CategorySchema,
  CategorySchemaPatch,
} from "../validators/category.validator";
import { bodyValidator, paramValidator } from "../middleware/Validators";
import { IdParamsSchema } from "../validators/general.validators";

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
