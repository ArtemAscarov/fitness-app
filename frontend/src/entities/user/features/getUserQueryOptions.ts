import { LocalTokens } from "@/shared/features/LocalTokens";
import { getMeFn } from "../api";

export const getUserQueryOptions = () => ({
  queryFn: getMeFn,
  queryKey: ["me"],
  gcTime: Infinity,
  enabled: !!LocalTokens.getTokens(),
  staleTime: Infinity,
});
