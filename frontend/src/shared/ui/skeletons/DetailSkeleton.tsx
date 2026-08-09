import Skeleton from "./Skeleton";

export default function DetailSkeleton() {
  return (
    <div className="mx-auto max-w-[1100px] px-2.5 pb-16">
      {/* Навигация */}
      <div className="flex items-center justify-between py-5">
        <Skeleton className="h-10 w-36 rounded-xl" />
        <Skeleton className="h-10 w-40 rounded-xl" />
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10">
        <Skeleton className="h-[360px] w-full rounded-3xl rounded-b-none" />

        <div className="absolute bottom-0 left-0 w-full p-6 xl:p-10">
          {/* badges */}
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <Skeleton className="h-7 w-24 rounded-full" />
            <Skeleton className="h-7 w-28 rounded-full" />
            <Skeleton className="h-7 w-20 rounded-full" />
          </div>

          {/* title */}
          <Skeleton className="mb-2 h-10 w-3/5 xl:h-14" />
          {/* description */}
          <Skeleton className="mb-2 h-4 w-full max-w-2xl" />
          <Skeleton className="h-4 w-4/6 max-w-2xl" />

          {/* tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </div>
      </section>

      {/* Основная информация */}
      <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1e2939] to-[#141d2b] p-6 xl:p-8">
        <div className="flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-indigo-500" />
          <Skeleton className="h-8 w-56" />
        </div>
        <div className="mt-6 space-y-3">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </section>

      {/* Секции упражнения — 2 блока */}
      {Array.from({ length: 2 }).map((_, i) => (
        <section
          key={i}
          className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-[#141d2b]"
        >
          <div
            className={`flex flex-col gap-6 md:flex-row ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            {/* image placeholder */}
            <div className="md:w-2/5">
              <Skeleton className="h-full min-h-[260px] w-full rounded-3xl rounded-b-none" />
            </div>

            {/* content */}
            <div className="flex-1 p-6 xl:p-8">
              {/* section number + title */}
              <div className="mb-3 flex items-center gap-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-6 w-48" />
              </div>

              {/* description lines */}
              <div className="mb-4 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>

              {/* list items */}
              <div className="space-y-2.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex items-start gap-3">
                    <Skeleton className="mt-1 h-5 w-5 flex-none rounded-full" />
                    <Skeleton className="h-4 flex-1" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
