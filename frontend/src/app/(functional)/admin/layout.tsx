"use client";

import { getUserQueryOptions } from "@/entities/user/features/getUserQueryOptions";
import NoData from "@/shared/ui/NoData";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type Props = { children: ReactNode };

export default function layout({ children }: Props) {
  const { data, isLoading } = useQuery(getUserQueryOptions());
  const router = useRouter();

  useEffect(() => {
    if ((!isLoading && !data) || data?.role !== "ADMIN")
      router.push("/exercise");
  }, [data, isLoading]);

  if (!data || data?.role !== "ADMIN") return <NoData />;

  return children;
}
  