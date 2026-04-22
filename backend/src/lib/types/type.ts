import { Request } from "express";

export type AuthJwtPayload = {
  id: number;
};

export type RefreshJwtPayload = {
  refreshId: string
};

export interface AuntificationRequest extends Request {
  user?: AuthJwtPayload;
}

export type CodesType = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500;
export type PrismaErrType = 'P2002' | 'P2025' | 'P2003'