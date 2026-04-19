import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";

export const bodyValidator =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const validateBody = schema.safeParse(req.body);

    if (!validateBody.success) {
      // const result = validateBody.error.flatten() 
      const message = JSON.parse(validateBody.error.message);

      return res.status(400).json(message);
    }

    next();
  };

export const paramValidator =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const validateParam = schema.safeParse(req.params);

    if (!validateParam.success) {
      const message = JSON.parse(validateParam.error.message);
      return res.status(400).json(message);
    }

    next();
  };
