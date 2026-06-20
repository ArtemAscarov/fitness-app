"use client";

import { getExercisesQueryOptions } from "@/entities/exercise/features/getExercisesQueryOptions";
import Card from "@/shared/ui/Card";
import { useQuery } from "@tanstack/react-query";

type Props = {};

export default function Index({}: Props) {
  const { data } = useQuery(getExercisesQueryOptions());

  return (
    <div className="max-w-[1400px] mx-auto px-2.5">
      <div className="py-[30px]">
        <h2 className="text-white font-semibold xl:text-[48px] text-[32px] mb-2">
          Избранные упражнения
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 py-5">
        {data?.results.map((item) => (
          <Card key={item.id} exercise={item} />
        ))}
      </div>
    </div>
  );
}
