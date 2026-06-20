"use client";

import Card from "@/shared/ui/Card";
import { useQuery } from "@tanstack/react-query";
import { getExercisesQueryOptions } from "@/entities/exercise/features/getExercisesQueryOptions";
import { Skeleton } from "@/shared/ui/skeletons";
import NoData from "@/shared/ui/NoData";

type Props = {};

export default function Index({}: Props) {
  const { data, isLoading } = useQuery(getExercisesQueryOptions());

  return (
    <div className="max-w-[1400px] mx-auto px-2.5">
      <div className="py-5 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {isLoading ? (
          <Skeleton className="w-10 h-20" />
        ) : (
          data?.results.map((item) => <Card key={item.id} exercise={item} />)
        )}
      </div>
      {!data?.results.length && (
        <NoData
          className="min-h-[calc(100vh-100px)]"
          extraText="Попробуйте сменить фильтры"
        />
      )}
    </div>
  );
}
