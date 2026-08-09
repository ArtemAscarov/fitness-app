import { getCategoryServerFetch } from "../api";

export const getCategoryQueryOptions = () => ({
  queryFn: getCategoryServerFetch,
  queryKey: ["categories"],
  staleTime: Infinity,
  gcTime: Infinity,
});
