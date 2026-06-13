"use client";

import { getUserQueryOptions } from "@/entities/user/features/getUserQueryOptions";
import { useQuery } from "@tanstack/react-query";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function Loader({ children }: Props) {
  useQuery(getUserQueryOptions());

  return children;
}
