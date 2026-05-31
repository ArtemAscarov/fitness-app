import Skeleton from "./Skeleton";

/** Повторяет pages/Auth/Register.tsx: карточка с тремя полями и кнопкой. */
export default function RegisterSkeleton() {
  return (
    <div className="min-h-[calc(100vh-400px)] px-2.5 py-10 flex items-center justify-center">
      <div className="flex w-full max-w-[400px] items-center justify-center bg-[#1E2939]">
        <div className="relative w-full max-w-md rounded-xl p-4 md:p-6">
          {/* Заголовок */}
          <div className="border-default flex items-center justify-between border-b pb-4 md:pb-5">
            <Skeleton className="h-6 w-24" />
          </div>

          <div className="pt-4 md:pt-6">
            {/* Три поля: email + 2 пароля */}
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="mb-4 space-y-2.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-11 w-full rounded-sm" />
              </div>
            ))}

            {/* Remember me */}
            <div className="my-6">
              <Skeleton className="h-4 w-32" />
            </div>

            {/* Кнопка */}
            <Skeleton className="mx-auto my-2.5 h-10 w-full max-w-[200px]" />

            {/* Ссылка снизу */}
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}
