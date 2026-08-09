import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller";
import { CheckAuth } from "../middleware/CheckAuth";
import { bodyValidator, paramValidator } from "../middleware/Validators";
import { FavoriteSchema } from "../validators/favorite.validator";
import { IdParamsSchema } from "../validators/general.validators";

const FavoriteRoter = Router();

FavoriteRoter.post(
  "/",
  CheckAuth({ isStrict: true }),
  bodyValidator(FavoriteSchema),
  FavoriteController.addToFavorite,
);

FavoriteRoter.delete(
  "/:id",
  CheckAuth({ isStrict: true }),
  paramValidator(IdParamsSchema),
  FavoriteController.removeFromFavorite,
);

export default FavoriteRoter;
