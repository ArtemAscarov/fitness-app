"use client";

import Card from "@/entities/exercise/UI/Card";
import { useQuery } from "@tanstack/react-query";
import { getExercisesQueryOptions } from "@/entities/exercise/features/getExercisesQueryOptions";
import NoData from "@/shared/ui/NoData";
import { useSearchParams } from "next/navigation";
import { transformParams } from "@/shared/features/TransformParams";
import Pagination from "@/entities/exercise/UI/Pagination";

type Props = {};

export default function Index({}: Props) {
  const search = useSearchParams();

  const { data, isLoading } = useQuery(
    getExercisesQueryOptions(transformParams(search)),
  );

  return (
    <div className="max-w-[1400px] flex flex-col mx-auto px-2.5 min-h-[calc(100dvh-100px)]">
      <div className="py-5 max-h-max grid  grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {data
          ? data?.results.map((item) => <Card key={item.id} exercise={item} />)
          : null}
      </div>

      {!isLoading && !data?.results.length && (
        <NoData
          extraText="Попробуйте сменить фильтры"
        />
      )}

      {data ? <Pagination data={data} /> : null}
    </div>
  );
}
