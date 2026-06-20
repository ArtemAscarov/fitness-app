import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AuthJwtPayload } from "../lib/types/type";
import { prisma } from "../prisma";
import { ROLES } from "@prisma/client";

export const CheckAuth =
  ({
    isStrict = false,
    accessedRoles,
  }: { isStrict?: boolean; accessedRoles?: ROLES[] } = {}) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET || "It_is_secret";
    const token = req.cookies.accessToken;
    const badReq = () => {
      return res.status(403).json({ message: "Недостаточно прав" });
    };

    if (!token) return isStrict ? badReq() : next();

    try {
      const { id } = jwt.verify(token, secret) as AuthJwtPayload;

      const foughtUser = await prisma.user.findUnique({
        where: {
          id: id,
        },
        select: {
          email: true,
          id: true,
          role: true,
        },
      });

      if (!foughtUser) {
        return res
          .status(400)
          .json({ message: "Ошибка при получении пользователя по токену" });
      }

      if (accessedRoles && !accessedRoles.includes(foughtUser.role))
        return badReq();

      res.locals.user = foughtUser;
      next();
    } catch (err) {
      console.log(err);
      if (err instanceof jwt.TokenExpiredError)
        return res.status(401).json({ message: "Просроченный токен" });

      res.locals.user = undefined;
      isStrict ? badReq() : next();
    }
  };
