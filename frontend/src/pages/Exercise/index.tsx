"use client";

import Card from "@/shared/ui/Card";
import { exercises } from "@/entities/exercise/mock";
import { useQuery } from "@tanstack/react-query";
import { getExercisesQueryOptions } from "@/entities/exercise/features/getExercisesQueryOptions";

type Props = {};

export default function Index({}: Props) {
  const { data } = useQuery(getExercisesQueryOptions());

  return (
    <div className="max-w-[1400px] mx-auto px-2.5">
      <div className="relative my-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1d2a52] via-[#221c4a] to-[#3a1c4a] p-6 xl:p-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative">
          <h2 className="mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-[32px] font-bold text-transparent xl:text-[52px]">
            Каталог упражнений
          </h2>
          <p className="max-w-xl text-[16px] text-gray-300">
            Найдите подходящие упражнения для ваших тренировок — с подробной
            техникой, фото и пошаговыми инструкциями.
          </p>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {exercises.map((item) => (
          <Card key={item.id} exercise={item} />
        ))}
      </div>
    </div>
  );
}
