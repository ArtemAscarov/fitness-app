import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.controller.js";
import { CheckAuth } from "../middleware/CheckAuth.js";
import { bodyValidator, paramValidator } from "../middleware/Validators.js";
import { FavoriteSchema } from "../validators/favorite.validator.js";
import { IdParamsSchema } from "../validators/general.validators.js";

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
