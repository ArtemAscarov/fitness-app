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

export type PaginationResultType<T> = {
  count: number;
  isHasNext: boolean;
  isHasPrev: boolean;
  limit: number;
  page: number;
  pageCount: number;
  results: T[];
};
