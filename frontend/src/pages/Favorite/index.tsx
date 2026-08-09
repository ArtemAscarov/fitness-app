"use client";

import { getExercisesQueryOptions } from "@/entities/exercise/features/getExercisesQueryOptions";
import Card from "@/entities/exercise/UI/Card";
import Pagination from "@/entities/exercise/UI/Pagination";
import { transformParams } from "@/shared/features/TransformParams";
import NoData from "@/shared/ui/NoData";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

type Props = {};

export default function Index({}: Props) {
  const search = useSearchParams();
  const { data, isLoading } = useQuery(
    getExercisesQueryOptions({ isFavorite: true, ...transformParams(search) }),
  );

  return (
    <div className="max-w-[1400px] mx-auto px-2.5">
      <div className="py-[15px]">
        <h2 className="text-white font-semibold border-b border-[#ffffff7c] xl:text-[48px] text-[32px] mb-2">
          Избранные упражнения
        </h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5 py-5">
        {data?.results.map((item) => (
          <Card key={item.id} exercise={item} />
        ))}
      </div>

      {(!isLoading && !data?.results.length) || !data ? (
        <NoData
          className="min-h-[calc(100vh-100px)]"
          extraText="Попробуйте сменить фильтры"
        />
      ) : null}

      {data ? <Pagination data={data} /> : null}
    </div>
  );
}
