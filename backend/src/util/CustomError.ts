import { CodesType } from "../lib/types/type";

class CustomErrorClass extends Error {
  code: string | number = 400;
  constructor(message: string, code?: CodesType) {
    super(message);
    code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const CustomError = CustomErrorClass;
