"use client";

import { getMeFn } from "@/entities/user/api";
import { LocalTokens } from "@/shared/features/LocalTokens";
import Button from "@/shared/ui/button";
import Link from "@/shared/ui/Link";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

export default function Header() {
  const {} = useQuery({
    queryFn: getMeFn,
    queryKey: ["me"],
    gcTime: Infinity,
    enabled: !!LocalTokens.getTokens(),
    staleTime: Infinity,
  });

  return (
    <header className="py-2.5 px-4 bg-[#1e2939] relative">
      <nav>
        <div className="max-w-[1600px] gap-4 w-full mx-auto flex items-center justify-between">
          {/* Лого */}
          <Link variant="glass" href="/" className="flex items-center gap-2">
            <h3 className="text-white lg:text-[20px] text-[16px] font-bold">
              ФитнесПро
            </h3>
          </Link>

          <Link href="/auth/login" className="flex items-center gap-1 transition-all duration-200 group">
            Войти{" "}
            <Image
              className="group-hover:translate-x-1 duration-200"
              alt=""
              width={20}
              height={20}
              src={"/svg/arrowRight.svg"}
            />
          </Link>
        </div>
      </nav>
    </header>
  );
}
