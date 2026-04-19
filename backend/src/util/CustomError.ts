import { Codes } from "../lib/types/type";

class CustomErrorClass extends Error {
  code: string | number = 400;
  constructor(message: string, code?: Codes) {
    super(message);
    code = code;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const CustomError = CustomErrorClass;
