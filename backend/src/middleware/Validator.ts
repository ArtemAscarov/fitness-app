import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const Validator =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const validateRes = schema.safeParse(req.body);

    if (!validateRes.success) {
      res.json(JSON.parse(validateRes.error.message));
    }

    next();
  };
