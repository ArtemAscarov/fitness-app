import { Router } from "express";
import { CheckAuth } from "../middleware/CheckAuth.js";
import { ExerciseController } from "../controllers/exercise.controller.js";
import {
  bodyValidator,
  paramValidator,
  queryValidator,
} from "../middleware/Validators.js";
import { IdParamsSchema } from "../validators/general.validators.js";
import {
  ExerciseCategroyUpdate,
  ExerciseFilters,
  ExerciseSchema,
  ExerciseSchemaPatch,
} from "../validators/exercise.validator.js";

const ExerciseRoter = Router();

ExerciseRoter.get(
  "/",
  CheckAuth(),
  queryValidator(ExerciseFilters),
  ExerciseController.get,
);

ExerciseRoter.delete(
  "/:id",
  paramValidator(IdParamsSchema),
  CheckAuth(),
  ExerciseController.delete,
);

ExerciseRoter.post(
  "/",
  bodyValidator(ExerciseSchema),
  CheckAuth(),
  ExerciseController.post,
);

ExerciseRoter.patch(
  "/:id",
  paramValidator(IdParamsSchema),
  bodyValidator(ExerciseSchemaPatch),
  CheckAuth(),
  ExerciseController.patch,
);

ExerciseRoter.get(
  "/:id",
  paramValidator(IdParamsSchema),
  CheckAuth(),
  ExerciseController.getOne,
);

ExerciseRoter.post(
  "/connectToCategory",
  bodyValidator(ExerciseCategroyUpdate),
  ExerciseController.connectToCategory,
);

ExerciseRoter.post(
  "/disconnectToCategory",
  bodyValidator(ExerciseCategroyUpdate),
  ExerciseController.disconnectToCategroy,
);

export default ExerciseRoter;
