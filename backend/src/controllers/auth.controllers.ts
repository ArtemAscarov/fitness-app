import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

class AuthControllerClass {
  async register(req: Request, res: Response) {
    try {
      const userData = await AuthService.register(req.body);
      return res.status(200).json(userData);
    } catch (err: any) {
      console.log(err);
      return res.status(400).json([
        {
          message: err.message,
        },
      ]);
    }
  }

  async login(req: Request, res: Response) {
    try {
      const userData = await AuthService.login(req.body);
      return res.status(200).json(userData);
    } catch (err: any) {
      console.log(err);
      return res.status(401).json([
        {
          message: err.message,
        },
      ]);
    }
  }
}

export const AuthController = new AuthControllerClass();
