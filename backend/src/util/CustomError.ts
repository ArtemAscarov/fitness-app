import { CodesType } from "../lib/types/type";

class CustomErrorClass extends Error {
  code: CodesType = 400;
  constructor(message: string, code?: CodesType) {
    super(message);
    code = this.code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const CustomError = CustomErrorClass;
