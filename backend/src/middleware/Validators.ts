import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { ZodErrorParser } from "../util/zodErrorParser";

export const bodyValidator =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const validateBody = schema.safeParse(req.body);

    if (!validateBody.success) {
      // const result = validateBody.error.flatten()
      const message = ZodErrorParser(validateBody.error.message);

      return res.status(400).json(message);
    }

    res.locals.body = validateBody;
    next();
  };

export const paramValidator =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const validateParam = schema.safeParse(req.params);

    if (!validateParam.success) {
      const message = ZodErrorParser(validateParam.error.message);
      return res.status(400).json(message);
    }

    res.locals.param = validateParam.data;
    next();
  };

export const queryValidator =
  (schema: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const validateQuery = schema.safeParse(req.query);

    if (!validateQuery.success) {
      const message = ZodErrorParser(validateQuery.error.message);
      return res.status(400).json(message);
    }

    res.locals.query = validateQuery.data;
    next();
  };
