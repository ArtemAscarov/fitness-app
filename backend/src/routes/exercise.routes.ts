import { Router } from "express";
import { CheckAuth } from "../middleware/CheckAuth";
import { ExerciseController } from "../controllers/exercise.controller";
import {
  bodyValidator,
  paramValidator,
  queryValidator,
} from "../middleware/Validators";
import { IdParamsSchema } from "../validators/general.validators";
import {
  ExerciseCategroyUpdate,
  ExerciseFilters,
  ExerciseSchema,
  ExerciseSchemaPatch,
} from "../validators/exercise.validator";

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
  CheckAuth,
  ExerciseController.getOne,
);

ExerciseRoter.post(
  "/connectToCategory",
  bodyValidator(ExerciseCategroyUpdate),
  ExerciseController.connectToCategory,
);

ExerciseRoter.post(
  "/disConnectToCategory",
  bodyValidator(ExerciseCategroyUpdate),
  ExerciseController.disconnectToCategroy,
);

export default ExerciseRoter;
