import Skeleton from "./Skeleton";
import CardSkeleton from "./CardSkeleton";

/** Повторяет pages/Exercise/index.tsx: баннер опроса, заголовок, фильтры, сетка карточек. */
export default function ExerciseSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-2.5">
      {/* Баннер опроса */}
      <div className="my-2 flex w-full flex-col items-center justify-center gap-2 rounded-md bg-[#00000048] p-5">
        <Skeleton className="h-7 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
      </div>

      {/* Заголовок каталога */}
      <div className="mb-5 space-y-2 py-[30px]">
        <Skeleton className="h-10 w-72" />
        <Skeleton className="h-5 w-96 max-w-full" />
      </div>

      {/* Строка поиска + фильтры */}
      <div className="mb-5 rounded-xl border border-neutral-700 bg-[#1e2939] p-2.5 xl:p-3">
        <div className="flex gap-2.5">
          <Skeleton className="h-[52px] w-full rounded-[10px]" />
          <Skeleton className="h-[52px] w-[120px] rounded-sm" />
        </div>
      </div>

      {/* Сетка карточек */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
