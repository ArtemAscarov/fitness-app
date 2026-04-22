import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RefreshService } from "../services/refresh.service";

class RefreshControllerClass {
  refresh = async (req: Request, res: Response, next: NextFunction) => {
    const newTokens = await RefreshService.verifyAndGiveNewToekens(req.body);

    return res.json(newTokens) ;
  };
}

export const RefreshController = new RefreshControllerClass();
