import { Request, Response } from "express";
import { FavoriteService } from "../services/favorite.service";

class FavoriteControllerClass {
  async addToFavorite(req: Request, res: Response) {
    const userId = res.locals.user?.id as number;
    const data = await FavoriteService.create(userId, req.body);

    return res.status(200).json({
      exerciseId: data,
    });
  }

  async removeFromFavorite(req: Request, res: Response) {
    const userId = res.locals.user?.id as number;
    const data = await FavoriteService.delete(userId, res.locals.param.id);

    return res.status(200).json({
      exerciseId: data,
    });
  }
}

export const FavoriteController = new FavoriteControllerClass();
