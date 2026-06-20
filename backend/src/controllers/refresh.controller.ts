import { NextFunction, Request, Response } from "express";
import { RefreshService } from "../services/refresh.service";

class RefreshControllerClass {
  refresh = async (req: Request, res: Response, next: NextFunction) => {
    const isProd = process.env.NODE_ENV === "production";
    const newTokens = await RefreshService.verifyAndGiveNewToekens({
      token: req.cookies.refreshToken,
    });

    res.cookie("accessToken", newTokens.accesToken, {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 2,
    });

    res.cookie("refreshToken", newTokens.refreshToken, {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 30,
      path: "/refresh",
    });

    return res.status(200).json({ message: "Успех" });
  };
}

export const RefreshController = new RefreshControllerClass();
