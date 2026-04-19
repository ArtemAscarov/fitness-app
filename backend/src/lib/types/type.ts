import { Request } from "express";

export type JwtPayload = {
  id: number;
  email: string;
};

export interface AuntificationRequest extends Request {
  user?: JwtPayload;
}

export type CodesType = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500;
export type PrismaErrType = 'P2002' | 'P2025' | 'P2003'