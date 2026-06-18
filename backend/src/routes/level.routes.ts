import { Router } from "express";
import { LevelController } from "../controllers/level.controller";
import { LevelSchema, LevelSchemaPatch } from "../validators/level.validator";
import { bodyValidator, paramValidator } from "../middleware/Validators";
import { IdParamsSchema } from "../validators/general.validators";

const levelRouter = Router();

levelRouter.post("/", bodyValidator(LevelSchema), LevelController.create);

levelRouter.get("/", LevelController.get);

levelRouter.patch(
  "/:id",
  paramValidator(IdParamsSchema),
  bodyValidator(LevelSchemaPatch),
  LevelController.update,
);

levelRouter.delete(
  "/:id",
  paramValidator(IdParamsSchema),
  LevelController.delete,
);

export default levelRouter;
