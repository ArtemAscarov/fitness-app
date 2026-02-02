import { Request } from "express";

export type JwtPayload = {
  id: number;
  email: string;
};

export interface AuntificationRequest extends Request {
  user?: JwtPayload;
}
