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
      <div className="max-w-[1600px] gap-4 w-full mx-auto flex items-center justify-between">
        {/* Лого */}
        <Link variant="glass" href="/" className="flex items-center gap-2">
          <Image width={32} height={32} alt="logo" src={"/svg/weight.svg"} />
          <h3 className="text-white lg:text-[20px] text-[16px] font-bold">
            ФитнесПро
          </h3>
        </Link>

        {/* Навигация (ПК) */}

        <nav className="items-center lg:max-w-[500px] max-w-[450px] w-full justify-between gap-2.5 md:flex hidden">
          <Link
            className="gap-2.5 text-white font-bold cursor-pointer text-[14px] lg:text-[16px]"
            variant={"ghost"}
            href="/excercise"
          >
            <Image width={24} height={24} alt="heart" src={"/svg/heart.svg"} />
            Упражнения
          </Link>

          <Link
            className="gap-2.5 text-white font-bold cursor-pointer text-[14px] lg:text-[16px]"
            variant="ghost"
            href="/favorite"
          >
            <Image
              width={24}
              height={24}
              alt="whiteHurt"
              src={"/svg/whiteHurt.svg"}
            />
            Избранное
          </Link>

          {/* <Link
            className="gap-2.5 text-white font-bold cursor-pointer text-[14px] lg:text-[16px]"
            variant={"ghost"}
            href="/progress"
          >
            <Image
              width={24}
              height={24}
              alt="progress"
              src={"/svg/progress.svg"}
            />
            Прогресс
          </Link> */}
        </nav>

        {/* Кнопка Войти (ПК) */}
        <Link
          href="/auth/login"
          className="font-bold items-center gap-2.5 text-[14px] lg:text-[16px] hidden md:flex"
        >
          Войти
          <Image width={20} height={20} alt="login" src={"/svg/login.svg"} />
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
            : "opacity-0 pointer-events-none"
        )}
      />

      {/* Мобильное меню */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-[65%] bg-[#1e2939] py-12 px-3 gap-5 md:hidden flex flex-col transition-all duration-300 ease-in-out z-50",
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
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
          <Image width={20} height={20} alt="login" src={"/svg/login.svg"} />
        </Link>

        {/* Навигация (моб) */}

        <nav className="items-center w-full justify-between gap-4 flex flex-col mt-3">
          <Link
            onClick={() => setOpen(false)}
            href="/excercise"
            className="gap-2.5 text-white font-bold cursor-pointer text-[16px] w-full justify-center max-w-full"
            variant={"ghost"}
          >
            <Image width={24} height={24} alt="heart" src={"/svg/heart.svg"} />
            Упражнения
          </Link>

          <Link
            onClick={() => setOpen(false)}
            href="/favorite"
            className="gap-2.5 text-white font-bold cursor-pointer text-[16px] w-full justify-center max-w-full"
            variant="ghost"
          >
            <Image
              width={24}
              height={24}
              alt="whiteHurt"
              src={"/svg/whiteHurt.svg"}
            />
            Избранное
          </Link>

          {/* <Link
              onClick={() => setOpen(false)}
              href="/progress"
              className="gap-2.5 text-white font-bold cursor-pointer text-[16px] w-full justify-center max-w-full"
              variant={"ghost"}
            >
              <Image
                width={24}
                height={24}
                alt="progress"
                src={"/svg/progress.svg"}
              />
              Прогресс
            </Link> */}
        </nav>
      </div>
    </header>
  );
}
