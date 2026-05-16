import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuntificationRequest, AuthJwtPayload } from "../lib/types/type";
import { prisma } from "../prisma";

export const CheckAuth =
  ({ isStrict = false }: { isStrict?: boolean } = {}) =>
  async (req: AuntificationRequest, res: Response, next: NextFunction) => {
    const secret = process.env.JWT_SECRET || "It_is_secret";
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];
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
        },
      });

      if (foughtUser) req.user = foughtUser;

      next();
    } catch (err) {
      console.log(err);
      req.user = undefined;
      isStrict ? badReq() : next();
    }
  };
