import Image from "next/image";
import Link from "@/shared/ui/Link";
import { cn } from "@/shared/lib/cn";
import type { Exercise } from "@/entities/exercise/types";

type Props = {
  exercise: Exercise;
};

const levelStyles: Record<string, string> = {
  Новичок: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300",
  Средний: "border-amber-500/40 bg-amber-500/15 text-amber-300",
  Продвинутый: "border-rose-500/40 bg-rose-500/15 text-rose-300",
};

export default function ExerciseDetail({ exercise }: Props) {
  return (
    <div className="mx-auto max-w-[1100px] px-2.5 pb-16">
      {/* Навигация */}
      <div className="flex items-center justify-between py-5">
        <Link
          href="/exercise"
          variant="ghost"
          className="gap-2 !px-3 text-gray-300"
        >
          <Image
            width={18}
            height={18}
            src="/svg/arrowRight.svg"
            alt=""
            className="rotate-180"
          />
          К каталогу
        </Link>
        <Link
          href={`/exercise/${exercise.id}/edit`}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
        >
          Редактировать
        </Link>
      </div>

      {/* ===== БАЗОВЫЕ ДАННЫЕ (hero) ===== */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10">
        <img
          src={exercise.image}
          alt={exercise.title}
          className="h-[360px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b111c] via-[#0b111c]/70 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full p-6 xl:p-10">
          <div className="mb-3 flex flex-wrap items-center gap-3">
            <span
              className={cn(
                "rounded-full border px-3 py-1 text-sm font-medium backdrop-blur-sm",
                levelStyles[exercise.level] ??
                  "border-blue-500/40 bg-blue-500/15 text-blue-300"
              )}
            >
              {exercise.level}
            </span>
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
            {exercise.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ДЕТАЛИ: основная информация ===== */}
      <section className="mt-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1e2939] to-[#141d2b] p-6 xl:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-8 w-1.5 rounded-full bg-gradient-to-b from-blue-400 to-indigo-500" />
          <h2 className="text-2xl font-semibold text-white">
            Основная информация
          </h2>
        </div>
        <p className="leading-relaxed text-gray-300">{exercise.mainInfo}</p>
      </section>

      {/* ===== ДЕТАЛИ: секции ===== */}
      <div className="mt-8 space-y-6">
        {exercise.sections.length === 0 && (
          <p className="rounded-2xl border border-dashed border-white/15 bg-white/5 p-6 text-center text-gray-400">
            Секции пока не добавлены.
          </p>
        )}

        {exercise.sections.map((section, index) => (
          <section
            key={section.id}
            className="overflow-hidden rounded-3xl border border-white/10 bg-[#141d2b]"
          >
            <div
              className={cn(
                "flex flex-col gap-6 md:flex-row",
                index % 2 === 1 && "md:flex-row-reverse"
              )}
            >
              {/* Фото */}
              <div className="md:w-2/5">
                <img
                  src={section.image}
                  alt={section.title}
                  className="h-full max-h-[320px] w-full object-cover md:min-h-[260px]"
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

                <p className="mb-4 text-gray-300">{section.instruction}</p>

                <ul className="space-y-2.5">
                  {section.list.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
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
