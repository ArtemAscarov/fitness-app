import { Router } from "express";
import { FavoriteController } from "../controllers/favorite.contollers";
import { CheckAuth } from "../middleware/CheckAuth";
import { bodyValidator } from "../middleware/Validators";
import { FavoriteSchema } from "../validators/favorite.validator";

const FavoriteRoter = Router();

FavoriteRoter.post(
  "/",
  CheckAuth({ isStrict: true }),
  bodyValidator(FavoriteSchema),
  FavoriteController.addToFavorite,
);

FavoriteRoter.delete(
  "/",
  CheckAuth({ isStrict: true }),
  bodyValidator(FavoriteSchema),
  FavoriteController.removeFromFavorite,
);

export default FavoriteRoter;
