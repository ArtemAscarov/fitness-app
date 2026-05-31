import Skeleton from "./Skeleton";

/** Повторяет pages/Syrvey/index.tsx: карточка по центру с прогресс-баром и шагом. */
export default function SyrveySkeleton() {
  return (
    <div className="flex h-[calc(100vh-200px)] flex-col items-center justify-center p-2.5 md:py-5">
      <div className="w-full max-w-[520px] rounded-md bg-[#1e2939] p-3">
        {/* «Шаг N из 5» */}
        <Skeleton className="mb-3 h-5 w-24" />

        {/* Прогресс-бар */}
        <Skeleton className="h-1.5 w-full rounded" />

        {/* Содержимое шага */}
        <div className="mt-6 space-y-4">
          <Skeleton className="h-7 w-2/3" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full rounded-md" />
            ))}
          </div>
          <Skeleton className="ml-auto h-10 w-32" />
        </div>
      </div>
    </div>
  );
}
