export type AuthTokens = {
  accesToken: string;
  refreshToken: string;
};

export type APIErrorType =
  | {
      path: string[];
      message: string;
    }[]
  | { message: string };
