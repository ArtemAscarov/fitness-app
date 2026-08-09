import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AuthDataType } from "../validators/auth.validator";

class AuthControllerClass {
  async register(req: Request, res: Response) {
    const isProd = process.env.NODE_ENV === "production";
    const data = req.body as AuthDataType;
    const userData = await AuthService.register(req.body);

    res.cookie("accessToken", userData.accesToken, {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      ...(data.remember ? { maxAge: 1000 * 60 * 60 * 2 } : {}),
    });

    res.cookie("refreshToken", userData.refreshToken, {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      ...(data.remember ? { maxAge: 1000 * 60 * 60 * 24 * 30 } : {}),
    });

    return res.status(200).json({ message: "Успех" });
  }

  async login(req: Request, res: Response) {
    const isProd = process.env.NODE_ENV === "production";
    const data = req.body as AuthDataType;
    const userData = await AuthService.login(req.body);

    res.cookie("accessToken", userData.accesToken, {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      ...(data.remember ? { maxAge: 1000 * 60 * 60 * 2 } : {}),
    });

    res.cookie("refreshToken", userData.refreshToken, {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
      ...(data.remember ? { maxAge: 1000 * 60 * 60 * 24 * 30 } : {}),
    });
    
    return res.status(200).json({ message: "Успех" });
  }

  async logout(req: Request, res: Response) {
    await AuthService.logout(req.cookies.refreshToken);

    const isProd = process.env.NODE_ENV === "production";

    res.clearCookie("accessToken", {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
      secure: isProd,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "Успех!" });
  }
}

export const AuthController = new AuthControllerClass();
