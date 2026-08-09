"use client";

import Image from "next/image";
import NextLink from "next/link";
import type { Exercise } from "@/entities/exercise/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { changeIsFavoriteState } from "../api/changeIsFavoriteState";
import { PaginationResultType } from "@/shared/types/type";
import { getUserQueryOptions } from "@/entities/user/features/getUserQueryOptions";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/cn";
import Link from "@/shared/ui/Link";
import Button from "@/shared/ui/button";

type Props = {
  exercise: Exercise;
};

export default function Card({ exercise }: Props) {
  console.log(exercise);
  
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data } = useQuery(getUserQueryOptions());
  const categories = exercise.category.flat();

  const mutation = useMutation({
    mutationFn: () =>
      changeIsFavoriteState({
        exerciseId: exercise.id,
        isFavorite: exercise.isFavorite,
      }),
    onSuccess: () => {
      queryClient.setQueriesData(
        { queryKey: ["exercise", { isFavorite: true }] },
        (old: PaginationResultType<Exercise> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            results: old.results.filter((item) => item.id !== exercise.id),
          };
        },
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["exercise"] });

      const prewExercises = queryClient.getQueriesData({
        queryKey: ["exercise"],
      });

      queryClient.setQueriesData(
        { queryKey: ["exercise"] },
        (old: PaginationResultType<Exercise> | undefined) => {
          if (!old) return old;
          return {
            ...old,
            results: old?.results.map((item) =>
              item.id === exercise.id
                ? { ...item, isFavorite: !exercise.isFavorite }
                : item,
            ),
          };
        },
      );

      return prewExercises;
    },
    onError: (err, _, prewExercises) => {
      console.log(err);
      prewExercises?.forEach(([key, value]) => {
        queryClient.setQueryData(key, value);
      });
    },
  });

  return (
    <NextLink
      href={`/exercise/${exercise.id}`}
      className="group relative max-h-auto flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-[#1e2939] to-[#141d2b] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-blue-500/10"
    >
      {/* Картинка */}
      <div className="relative overflow-hidden">
        <div className="relative h-[220px] w-full">
          <Image
            quality={75}
            fill
            sizes="(max-width: 640px) 378px, 328px"
            className="transition-transform duration-500 group-hover:scale-105"
            alt={exercise.title}
            src={exercise.image}
          />
          <div className="absolute inset-0 bg-[#0000006b]" />
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            data ? mutation.mutate() : router.push("/auth/login");
          }}
          className="absolute left-3 cursor-pointer top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition hover:bg-black/60"
          aria-label="В избранное"
        >
          <Image
            width={20}
            height={20}
            alt="addToFavorite"
            src={exercise.isFavorite ? "/svg/hurt.svg" : "/svg/emptyHurt.svg"}
          />
        </button>

        <Button
          variant="ghost"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            router.push(`/admin/edit-exercise/${exercise.id}`);
          }}
          className={cn(
            "absolute right-3 cursor-pointer top-3 h-9 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition hover:bg-black/60",
            !data ? "hidden" : data.role === "ADMIN" ? "" : "hidden",
          )}
          aria-label="В избранное"
        >
          <Image
            width={20}
            height={20}
            alt="EditExercise"
            src={"/svg/edit.svg"}
          />
        </Button>
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
          {categories.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
            >
              #{tag.name}
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
