import Skeleton from "./Skeleton";

/**
 * Повторяет разметку shared/ui/Card.tsx: картинка, заголовок,
 * описание, чипы-теги, строка с ккал и кнопки.
 */
export default function CardSkeleton() {
  return (
    <div className="max-w-[610px]">
      {/* Картинка */}
      <Skeleton className="h-[300px] w-full rounded-t-[10px] rounded-b-none" />

      <div className="p-2.5">
        {/* Заголовок */}
        <Skeleton className="mb-2 h-6 w-1/2" />

        {/* Описание */}
        <div className="mb-2.5 space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
        </div>

        {/* Чипы-теги */}
        <div className="mb-5 flex items-center gap-2.5">
          <Skeleton className="h-7 w-20 rounded-xl" />
          <Skeleton className="h-7 w-20 rounded-xl" />
          <Skeleton className="h-7 w-20 rounded-xl" />
        </div>

        {/* Ккал */}
        <Skeleton className="mb-4 h-5 w-28" />

        {/* Кнопки */}
        <div className="flex gap-[15px]">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-[50px]" />
        </div>
      </div>
    </div>
  );
}
