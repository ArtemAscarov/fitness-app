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

          {/* Кнопка Войти (ПК) */}
          <Link
            variant="ghost"
            href="/auth/login"
            className="font-bold items-center gap-2.5 text-[14px] lg:text-[16px] hidden md:flex"
          >
            <Image
              src={"/svg/EmptyHurt.svg"}
              alt="FavoriteIconLink"
              height={20}
              width={20}
            />
          </Link>

          {/* Бургер меню (моб) */}
          <Button
            className={"md:hidden flex"}
            variant="ghost"
            onClick={() => setOpen(true)}
          >
            <Image width={35} height={35} alt="option" src={"/svg/other.svg"} />
          </Button>
        </div>
        {/* Затемнение фона */}
        <div
          onClick={() => setOpen(false)}
          className={cn(
            "fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden z-40",
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none",
          )}
        />
        {/* Мобильное меню */}
        <div
          className={cn(
            "fixed top-0 right-0 h-screen w-[65%] bg-[#1e2939] py-12 px-3 gap-5 md:hidden flex flex-col transition-all duration-300 ease-in-out z-50",
            open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0",
          )}
        >
          {/* X закрыть меню */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-3 right-3 text-white text-2xl cursor-pointer"
          >
            ✕
          </button>

          {/* Войти */}
          <Link
            onClick={() => setOpen(false)}
            href="/auth/login"
            className="font-bold items-center gap-2.5 text-[16px] justify-center mt-4"
          >
            Войти
          </Link>
        </div>{" "}
      </nav>
    </header>
  );
}
