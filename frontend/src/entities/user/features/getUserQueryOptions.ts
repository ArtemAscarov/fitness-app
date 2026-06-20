import { getMeFn } from "../api";

export const getUserQueryOptions = () => ({
  queryFn: getMeFn,
  queryKey: ["me"],
  gcTime: Infinity,
  staleTime: Infinity,
});
