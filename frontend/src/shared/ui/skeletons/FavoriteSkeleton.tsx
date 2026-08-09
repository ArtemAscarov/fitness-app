import Skeleton from "./Skeleton";
import CardSkeleton from "./CardSkeleton";

export default function FavoriteSkeleton() {
  return (
    <div className="mx-auto max-w-[1400px] px-2.5">
      <div className="py-[30px]">
        <Skeleton className="h-10 w-80 max-w-full" />
      </div>

      <div className="mb-5 rounded-xl border border-neutral-700 bg-[#1e2939] p-2.5 xl:p-3">
        <div className="flex gap-2.5">
          <Skeleton className="h-[52px] w-full rounded-[10px]" />
          <Skeleton className="h-[52px] w-[120px] rounded-sm" />
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <CardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
