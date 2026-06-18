"use client";

import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import { cn } from "../lib/cn";
import type { Exercise } from "@/entities/exercise/types";

type Props = {
  exercise: Exercise;
};

const levelStyles: Record<string, string> = {
  Новичок: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
  Средний: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  Продвинутый: "border-rose-500/40 bg-rose-500/15 text-rose-300",
};

export default function Card({ exercise }: Props) {
  const [liked, setLiked] = useState(false);

  return (
    <NextLink
      href={`/exercise/${exercise.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e2939] to-[#141d2b] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/10"
    >
      {/* Картинка */}
      <div className="relative overflow-hidden">
        <img
          className="h-[220px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
          alt={exercise.title}
          src={exercise.image}
        />
        <div className="absolute inset-0 bg-[#00000042]" />

        <span
          className={cn(
            "absolute right-3 top-3 rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm",
            levelStyles[exercise.level] ??
              "border-blue-500/40 bg-blue-500/15 text-blue-300"
          )}
        >
          {exercise.level}
        </span>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setLiked((v) => !v);
          }}
          className="absolute left-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition hover:bg-black/60"
          aria-label="В избранное"
        >
          <Image
            width={20}
            height={20}
            alt=""
            src={liked ? "/svg/hurt.svg" : "/svg/emptyHurt.svg"}
          />
        </button>
      </div>

      {/* Контент */}
      <div className="flex flex-1 flex-col p-4">
        <h4 className="mb-1 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
          {exercise.title}
        </h4>
        <p className="mb-4 line-clamp-2 text-sm text-[#99a1af]">
          {exercise.description ?? "Описание появится позже."}
        </p>

        <div className="mb-4 flex flex-wrap gap-2">
          {exercise.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-3">
          <div className="flex items-center gap-2">
            <Image width={18} height={18} src="/svg/progress.svg" alt="" />
            <span className="text-sm text-amber-400">
              {exercise.calory ?? "—"} ккал/мин
            </span>
          </div>
          <span className="flex items-center gap-1 text-sm font-medium text-blue-400 transition-transform group-hover:translate-x-1">
            Подробнее
            <Image width={16} height={16} src="/svg/arrowRight.svg" alt="" />
          </span>
        </div>
      </div>
    </NextLink>
  );
}
