import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { AuntificationRequest, JwtPayload } from "../lib/types/type";

export const CheckAuth = async (
  req: AuntificationRequest,
  res: Response,
  next: NextFunction,
) => {
  const secret = process.env.JWT_SECRET || "It_is_secret";
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) return next();
  //   res.status(403).json({ message: "Недостаточно прав" });

  try {
    const userData = jwt.verify(token, secret) as JwtPayload;

    req.user = userData;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error",
    });
  }
};
