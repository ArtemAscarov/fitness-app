import { NextFunction, Request, Response } from "express";
import { CustomError } from "../util/CustomError";
import { CodesType, PrismaErrType } from "../lib/types/type";
import { Prisma } from "@prisma/client";

type ErrType = {
  code: CodesType;
  message: string;
};

const PrismaErrMessages: Record<PrismaErrType, ErrType> = {
  P2002: {
    code: 409,
    message: "Данная запись уже существует",
  },
  P2003: {
    code: 409,
    message: "Нарушение связи",
  },
  P2025: {
    code: 404,
    message: "Такой записи не найдено",
  },
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  console.log(err);

  if (err.body && err.type === "entity.parse.failed")
    return res.status(400).json({ message: "Не валидный JSON" });

  if (err instanceof CustomError)
    return res.status(Number(err.code)).json({ message: err.message });

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    const errMes = PrismaErrMessages[err.code as PrismaErrType];

    if (errMes)
      return res.status(errMes.code).json({ message: errMes.message });

    return res.status(500).json({ message: "Ошибка БД" });
  }

  if (err instanceof Error)
    return res.status(400).json({ message: err.message });

  return res.status(500).json({ message: "Непредвиденная ошибка" });
};
