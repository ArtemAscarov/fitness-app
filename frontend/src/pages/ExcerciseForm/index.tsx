"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/shared/ui/button";
import Link from "@/shared/ui/Link";
import type { Excercise, ExcerciseSection } from "@/entities/excercise/types";

type Props = {
  /** Если передан — режим редактирования, иначе создание. */
  excercise?: Excercise;
};

type SectionDraft = Omit<ExcerciseSection, "list"> & { list: string };

const emptySection = (id: number): SectionDraft => ({
  id,
  title: "",
  instruction: "",
  image: "",
  list: "",
});

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0f1623] px-4 py-2.5 text-white outline-none transition focus:border-blue-500/60 placeholder:text-gray-500";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-300";

export default function ExcerciseForm({ excercise }: Props) {
  const isEdit = Boolean(excercise);

  const [form, setForm] = useState({
    title: excercise?.title ?? "",
    description: excercise?.description ?? "",
    level: excercise?.level ?? "Новичок",
    calory: excercise?.calory?.toString() ?? "",
    duration: excercise?.duration ?? "",
    tags: excercise?.tags.join(", ") ?? "",
    image: excercise?.image ?? "",
    mainInfo: excercise?.mainInfo ?? "",
  });

  const [sections, setSections] = useState<SectionDraft[]>(
    excercise?.sections.map((s) => ({ ...s, list: s.list.join("\n") })) ?? [
      emptySection(1),
    ]
  );

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setSection = (id: number, key: keyof SectionDraft, value: string) =>
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: value } : s))
    );

  const addSection = () =>
    setSections((prev) => [
      ...prev,
      emptySection(prev.length ? Math.max(...prev.map((s) => s.id)) + 1 : 1),
    ]);

  const removeSection = (id: number) =>
    setSections((prev) => prev.filter((s) => s.id !== id));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Фронтенд-only: бэкенда пока нет, просто показываем результат.
    const payload = {
      ...form,
      calory: Number(form.calory) || undefined,
      tags: form.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      sections: sections.map((s) => ({
        ...s,
        list: s.list
          .split("\n")
          .map((i) => i.trim())
          .filter(Boolean),
      })),
    };
    console.log("submit", payload);
    alert(isEdit ? "Упражнение обновлено (демо)" : "Упражнение создано (демо)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-[900px] px-2.5 pb-16"
    >
      <div className="flex items-center justify-between py-5">
        <Link
          href={isEdit ? `/excercise/${excercise!.id}` : "/excercise"}
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
          Назад
        </Link>
      </div>

      <h1 className="mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-3xl font-bold text-transparent xl:text-4xl">
        {isEdit ? "Редактирование упражнения" : "Новое упражнение"}
      </h1>

      {/* Базовые данные */}
      <fieldset className="mb-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1e2939] to-[#141d2b] p-6">
        <legend className="px-2 text-lg font-semibold text-white">
          Базовые данные
        </legend>

        <div className="mt-2 space-y-4">
          <div>
            <label className={labelClass}>Название</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Например: Отжимания"
              required
            />
          </div>

          <div>
            <label className={labelClass}>Описание</label>
            <textarea
              className={`${inputClass} min-h-[80px] resize-y`}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Короткое описание упражнения"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Уровень</label>
              <select
                className={inputClass}
                value={form.level}
                onChange={(e) => set("level", e.target.value)}
              >
                <option>Новичок</option>
                <option>Средний</option>
                <option>Продвинутый</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Калории/мин</label>
              <input
                type="number"
                className={inputClass}
                value={form.calory}
                onChange={(e) => set("calory", e.target.value)}
                placeholder="8"
              />
            </div>
            <div>
              <label className={labelClass}>Длительность</label>
              <input
                className={inputClass}
                value={form.duration}
                onChange={(e) => set("duration", e.target.value)}
                placeholder="10–15 мин"
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Теги (через запятую)</label>
            <input
              className={inputClass}
              value={form.tags}
              onChange={(e) => set("tags", e.target.value)}
              placeholder="грудь, трицепс, без оборудования"
            />
          </div>

          <div>
            <label className={labelClass}>Ссылка на фото</label>
            <input
              className={inputClass}
              value={form.image}
              onChange={(e) => set("image", e.target.value)}
              placeholder="/img/trainMan2.png"
            />
          </div>
        </div>
      </fieldset>

      {/* Детали: основная информация */}
      <fieldset className="mb-6 rounded-3xl border border-white/10 bg-gradient-to-br from-[#1e2939] to-[#141d2b] p-6">
        <legend className="px-2 text-lg font-semibold text-white">
          Основная информация
        </legend>
        <textarea
          className={`${inputClass} mt-2 min-h-[100px] resize-y`}
          value={form.mainInfo}
          onChange={(e) => set("mainInfo", e.target.value)}
          placeholder="Подробное описание для блока «Основная информация»"
        />
      </fieldset>

      {/* Детали: секции */}
      <div className="mb-6 space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Секции</h2>
          <Button
            type="button"
            onClick={addSection}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
          >
            + Добавить секцию
          </Button>
        </div>

        {sections.map((section, index) => (
          <fieldset
            key={section.id}
            className="rounded-3xl border border-white/10 bg-[#141d2b] p-6"
          >
            <legend className="flex items-center gap-2 px-2 text-sm font-medium text-blue-300">
              Секция {index + 1}
            </legend>

            <div className="mt-2 space-y-4">
              <div>
                <label className={labelClass}>Название секции</label>
                <input
                  className={inputClass}
                  value={section.title}
                  onChange={(e) =>
                    setSection(section.id, "title", e.target.value)
                  }
                  placeholder="Например: Техника выполнения"
                />
              </div>
              <div>
                <label className={labelClass}>Инструкция</label>
                <textarea
                  className={`${inputClass} min-h-[70px] resize-y`}
                  value={section.instruction}
                  onChange={(e) =>
                    setSection(section.id, "instruction", e.target.value)
                  }
                  placeholder="Краткая инструкция к секции"
                />
              </div>
              <div>
                <label className={labelClass}>Ссылка на фото</label>
                <input
                  className={inputClass}
                  value={section.image}
                  onChange={(e) =>
                    setSection(section.id, "image", e.target.value)
                  }
                  placeholder="/img/trainMan2.png"
                />
              </div>
              <div>
                <label className={labelClass}>
                  Список (каждый пункт с новой строки)
                </label>
                <textarea
                  className={`${inputClass} min-h-[90px] resize-y`}
                  value={section.list}
                  onChange={(e) =>
                    setSection(section.id, "list", e.target.value)
                  }
                  placeholder={"Шаг 1\nШаг 2\nШаг 3"}
                />
              </div>

              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(section.id)}
                  className="text-sm text-rose-400 transition hover:text-rose-300"
                >
                  Удалить секцию
                </button>
              )}
            </div>
          </fieldset>
        ))}
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          className="flex-1 justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500"
        >
          {isEdit ? "Сохранить изменения" : "Создать упражнение"}
        </Button>
      </div>
    </form>
  );
}
