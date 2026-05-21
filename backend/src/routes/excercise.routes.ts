import { Router } from "express";
import { CheckAuth } from "../middleware/CheckAuth";
import { ExcerciseController } from "../controllers/excercise.contollers";
import {
  bodyValidator,
  paramValidator,
  queryValidator,
} from "../middleware/Validators";
import { IdParamsSchema } from "../validators/general.validators";
import {
  ExcerciseCategroyUpdate,
  ExcerciseFilters,
  ExcerciseSchema,
  ExcerciseSchemaPatch,
} from "../validators/exercise.validator";

const ExcerciseRoter = Router();

ExcerciseRoter.get(
  "/",
  CheckAuth(),
  queryValidator(ExcerciseFilters),
  ExcerciseController.get,
);

ExcerciseRoter.delete(
  "/:id",
  paramValidator(IdParamsSchema),
  CheckAuth(),
  ExcerciseController.delete,
);

ExcerciseRoter.post(
  "/",
  bodyValidator(ExcerciseSchema),
  CheckAuth(),
  ExcerciseController.post,
);

ExcerciseRoter.patch(
  "/:id",
  paramValidator(IdParamsSchema),
  bodyValidator(ExcerciseSchemaPatch),
  CheckAuth(),
  ExcerciseController.patch,
);

ExcerciseRoter.get(
  "/:id",
  paramValidator(IdParamsSchema),
  CheckAuth,
  ExcerciseController.getOne,
);

ExcerciseRoter.post(
  "/connectToCategory",
  bodyValidator(ExcerciseCategroyUpdate),
  ExcerciseController.connectToCategory,
);

ExcerciseRoter.post(
  "/disConnectToCategory",
  bodyValidator(ExcerciseCategroyUpdate),
  ExcerciseController.disconnectToCategroy,
);

export default ExcerciseRoter;
