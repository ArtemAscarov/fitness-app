import { Response } from "express";
import { AuntificationRequest } from "../lib/types/type";
import { FavoriteService } from "../services/favorite.service";

class FavoriteControllerClass {
  async addToFavorite(req: AuntificationRequest, res: Response) {
    const userId = req.user?.id as number;
    const data = await FavoriteService.create(userId, req.body);

    res.status(200).json({
      message: "Успешно!",
      excerciseId: data,
    });
  }

  async removeFromFavorite(req: AuntificationRequest, res: Response) {
    const userId = req.user?.id as number;
    const data = await FavoriteService.delete(userId, req.body);

    res.status(200).json({
      message: "Успешно!",
      excerciseId: data,
    });
  }
}

export const FavoriteController = new FavoriteControllerClass();
