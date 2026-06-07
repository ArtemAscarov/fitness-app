"use client";

import { useState } from "react";
import Button from "@/shared/ui/button";
import Link from "@/shared/ui/Link";
import Image from "next/image";
import { cn } from "@/shared/lib/cn";

export default function Header() {
  const [open, setOpen] = useState(false);

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

          <div className="flex items-center gap-3">
            <Link
              variant="glass"
              href="/auth/login"
              className="font-bold items-center gap-2.5 text-[14px] lg:text-[16px] hidden md:flex"
            >
              <Image
                width={24}
                height={24}
                alt="login"
                src={"/svg/login.svg"}
              />
            </Link>
            <Link
              variant="glass"
              href="/excercise"
              className="font-bold items-center gap-2.5 text-[14px] lg:text-[16px] hidden md:flex"
            >
              <Image
                width={24}
                height={24}
                alt="login"
                src={"/svg/progress.svg"}
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
