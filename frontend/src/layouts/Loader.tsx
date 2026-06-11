"use client";

import { getMeFn } from "@/entities/user/api";
import { LocalTokens } from "@/shared/features/LocalTokens";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Loader({ children }: Props) {
  useQuery({
    queryKey: ["me"],
    queryFn: getMeFn,
    enabled: !!LocalTokens.getTokens(),
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return children;
}
