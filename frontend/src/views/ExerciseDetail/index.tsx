import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import type { Exercise } from "@/entities/exercise/types";
import PrevPageButton from "@/entities/exercise/UI/PrevPageButton";
import Link from "@/shared/ui/Link";
import { Category } from "@/entities/category/type";

type Props = {
  exercise: Exercise;
};

export default function ExerciseDetail({ exercise }: Props) {
  const allCategories = exercise.category.flat() as Category[];

  return (
    <div className="mx-auto max-w-[1100px] px-2.5 pb-16">
      {/* Навигация */}
      <div className="flex items-center justify-between py-5">
        <PrevPageButton />
      </div>

      <section className="relative overflow-hidden rounded-3xl border border-white/10">
        <img
          src={exercise.image || "/img/mainPageStart.png"}
          alt={exercise.title}
          className="h-[360px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b111c] via-[#0b111c]/70 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 xl:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-sm text-amber-300 backdrop-blur-sm">
              <Image width={16} height={16} src="/svg/progress.svg" alt="" />
              {exercise.calory ?? "—"} ккал/мин
            </span>
            <span className="flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1 text-sm text-gray-200 backdrop-blur-sm">
              <Image width={16} height={16} src="/svg/clock.svg" alt="" />
              {exercise.duration ?? "—"}
            </span>
          </div>

          <h1 className="mb-2 text-3xl font-bold text-white xl:text-5xl">
            {exercise.title}
          </h1>
          <p className="max-w-2xl text-gray-300">
            {exercise.description ?? "Описание появится позже."}
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            {allCategories?.map((item) => (
              <Link
                href={`/exercise?category=${item.slug}`}
                key={item.id}
                className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
              >
                #{item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1e2939] to-[#141d2b] p-6 xl:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-indigo-500" />
          <h2 className="text-2xl font-semibold text-white">
            Основная информация
          </h2>
        </div>
      </section>

      <div className="mt-8 space-y-6">
        {exercise.exerciseSections.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-gray-400">
            Секции пока не добавлены.
          </p>
        )}

        {exercise.exerciseSections.map((section, index) => (
          <section
            key={section.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#141d2b]"
          >
            <div
              className={cn(
                "flex flex-col gap-6 md:flex-row",
                index % 2 === 1 && "md:flex-row-reverse",
              )}
            >
              {/* Фото */}
              <div className="md:w-2/5">
                <img
                  src={section.image || "/svg/sectionsPlug.svg"}
                  alt={section.title}
                  className={`h-full max-h-[320px] w-full object-cover md:min-h-[260px] ${index % 2 === 1 ? "-scale-x-100" : ""}`}
                />
              </div>

              {/* Контент */}
              <div className="flex-1 p-6 xl:p-8">
                <div className="mb-3 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-xl font-semibold text-white">
                    {section.title}
                  </h3>
                </div>

                <p className="mb-4 text-gray-300">{section.description}</p>

                <ul className="space-y-2.5">
                  {section.list.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-300"
                    >
                      <span className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-blue-500/20 text-xs text-blue-300">
                        {i + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
