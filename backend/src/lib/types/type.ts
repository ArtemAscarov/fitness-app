export type AuthJwtPayload = {
  id: number;
  email: string;
};

export type RefreshJwtPayload = {
  refreshId: string;
};

export type Locals = { user?: AuthJwtPayload; query: any };

export type CodesType = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500;
export type PrismaErrType = "P2002" | "P2025" | "P2003";
