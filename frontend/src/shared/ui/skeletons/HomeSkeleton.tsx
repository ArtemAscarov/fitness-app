import Skeleton from "./Skeleton";

/** Повторяет pages/Home/index.tsx: герой из двух колонок, блок статистики, карточки фич. */
export default function HomeSkeleton() {
  return (
    <>
      {/* HERO */}
      <section className="relative py-2 md:py-16">
        <div className="container mx-auto grid items-center gap-12 px-2.5 md:grid-cols-2">
          {/* Левая колонка */}
          <div className="mx-auto space-y-6 px-2.5">
            <Skeleton className="h-9 w-72 rounded-full" />
            <Skeleton className="h-10 w-full max-w-[450px]" />
            <Skeleton className="h-10 w-3/4 max-w-[450px]" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-4 w-full max-w-lg" />
              <Skeleton className="h-4 w-2/3 max-w-lg" />
            </div>
            <Skeleton className="h-11 w-48" />
          </div>

          {/* Правая колонка — карточка прогресса */}
          <div className="space-y-4 rounded-2xl bg-[#101a2c]/50 p-6">
            <Skeleton className="mb-4 h-6 w-40" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* СТАТИСТИКА */}
      <section className="bg-[#131c2b] py-16">
        <div className="container mx-auto grid grid-cols-2 gap-10 text-center md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="mx-auto h-8 w-24" />
              <Skeleton className="mx-auto h-4 w-32" />
            </div>
          ))}
        </div>
      </section>

      {/* КАРТОЧКИ ФИЧ */}
      <section className="bg-[#0e1625] py-20">
        <div className="container mx-auto mb-12 max-w-3xl space-y-3 text-center">
          <Skeleton className="mx-auto h-8 w-96 max-w-full" />
          <Skeleton className="mx-auto h-4 w-80 max-w-full" />
        </div>

        <div className="container mx-auto grid max-w-6xl gap-6 px-2.5 md:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl bg-[#132033] p-6">
              <Skeleton className="mb-4 h-10 w-10 rounded-lg" />
              <Skeleton className="mb-2 h-5 w-32" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
