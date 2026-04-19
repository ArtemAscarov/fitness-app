import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { CustomError } from "../util/CustomError";

class AuthControllerClass {
  async register(req: Request, res: Response) {
    const userData = await AuthService.register(req.body);
    return res.status(200).json(userData);
  }

  async login(req: Request, res: Response) {
    const { code, message } = new CustomError("asdf", 200);

    console.log(code, message);

    const userData = await AuthService.login(req.body);
    return res.status(200).json(userData);
  }
}

export const AuthController = new AuthControllerClass();
