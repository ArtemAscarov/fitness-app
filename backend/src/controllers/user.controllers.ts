import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { AuthJwtPayload } from "../lib/types/type";

class UserControllerClass {
  async getUser(req: Request, res: Response) {
    const data = await UserService.getUserById(+req.params.id);

    if (!data)
      return res
        .status(500)
        .json("Ошибка при получении пользователя с помощью id");

    return data;
  }

  async getUsers(req: Request, res: Response) {
    const data = await UserService.getUsers(res.locals.query);

    if (!data)
      return res.status(500).json("Ошибка при получении пользователей");

    return data;
  }

  async getMe(req: Request, res: Response) {
    const userDataFromRes = res.locals.user as AuthJwtPayload;

    const data = await UserService.getUserData(userDataFromRes);

    if (!data)
      return res
        .status(500)
        .json("Ошибка при получении пользователя с помощью токенов");

    return data;
  }
}

export const UserController = new UserControllerClass();
