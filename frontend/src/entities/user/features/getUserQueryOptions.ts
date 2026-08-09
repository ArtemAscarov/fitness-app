import { getMeFn } from "../api";

export const getUserQueryOptions = () => {
  return {
    queryFn: getMeFn,
    queryKey: ["me"],
    gcTime: 1000 * 60 * 10,
    staleTime: 1000 * 60 * 5,
    retry: false,
    retryOnMount: false,
  };
};
