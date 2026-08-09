"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/shared/ui/button";
import Link from "@/shared/ui/Link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { Category } from "@/entities/category/type";
import { useModalStore } from "@/shared/stores/modalStore";
import ExerciseCategoryModal from "@/entities/category/ui/modal/ExerciseCategoryModal";
import type {
  Exercise,
  ExerciseFormData,
  ExerciseSection,
} from "@/entities/exercise/types";
import {
  addExercise,
  connectExerciseToCategory,
  disconnectExerciseToCategory,
  editExercise,
} from "@/entities/exercise/api";

type Props = {
  exercise?: Exercise;
};

type SectionDraft = Omit<ExerciseSection, "list"> & {
  list: string;
  id: number;
};

const emptySection = (id: number): SectionDraft => ({
  id: id + 1000, // Это для того что бы пометить новые секции
  title: "",
  description: "",
  image: "",
  list: "",
});

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0f1623] px-4 py-2.5 text-white outline-none transition focus:border-blue-500/60 placeholder:text-gray-500";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-300";

export default function ExerciseForm({ exercise }: Props) {
  const isEdit = Boolean(exercise);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { modals, openModal } = useModalStore((state) => state);  

  const [form, setForm] = useState({
    title: exercise?.title ?? "",
    description: exercise?.description ?? "",
    calory: exercise?.calory?.toString() ?? "",
    duration: exercise?.duration ?? "",
    image: exercise?.image ?? "",
  });

  const [sections, setSections] = useState<SectionDraft[]>(
    exercise?.exerciseSections.map((s) => ({
      ...s,
      list: s.list.join("\n"),
    })) ?? [emptySection(1)],
  );

  const [selectedCategories, setSelectedCategories] = useState<Category[]>(
    exercise?.category ?? [],
  );

  const set = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const setSection = (id: number, key: keyof SectionDraft, value: string) => {
    if (sections.length > 99) return;
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)),
    );
  };

  const addSection = () => {
    if (sections.length > 99) return;
    setSections((prev) => [
      ...prev,
      emptySection(
        prev.length
          ? Math.max(...prev.map((s) => s.id)) > 1000
            ? Math.max(...prev.map((s) => s.id)) - 999
            : Math.max(...prev.map((s) => s.id)) + 1
          : 1,
      ),
    ]);
  };

  const removeSection = (id: number) => {
    if (sections.length > 99) return;
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  const removeCategory = async (categoryId: number) => {
    // Сначала обновляем UI, чтобы клик реагировал мгновенно
    setSelectedCategories((prev) => prev.filter((c) => c.id !== categoryId));

    // В режиме создания связи в БД ещё нет — привяжутся после создания
    if (!exercise) return;

    try {
      await disconnectExerciseToCategory({
        exerciseId: exercise.id,
        categoryId,
      });
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    } catch (error) {
      console.log(error);
    }
  };

  const applyCategories = async (selected: Category[]) => {
    const previous = selectedCategories;
    setSelectedCategories(selected);

    // В режиме создания категории привяжем после создания упражнения
    if (!exercise) return;

    const currentIds = previous.map((c) => c.id);
    const toAdd = selected.filter((c) => !currentIds.includes(c.id));
    const toRemove = previous.filter(
      (c) => !selected.some((s) => s.id === c.id),
    );

    try {
      await Promise.all([
        ...toAdd.map((category) =>
          connectExerciseToCategory({
            exerciseId: exercise.id,
            categoryId: category.id,
          }),
        ),
        ...toRemove.map((category) =>
          disconnectExerciseToCategory({
            exerciseId: exercise.id,
            categoryId: category.id,
          }),
        ),
      ]);
      queryClient.invalidateQueries({ queryKey: ["exercise"] });
    } catch (error) {
      console.log(error);
    }
  };

  const mutation = useMutation({
    mutationFn: (data: ExerciseFormData) =>
      exercise ? editExercise({ id: exercise.id, ...data }) : addExercise(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["exercise"] });

      // При создании категории привязываются уже после того, как появился id
      if (!exercise && selectedCategories.length > 0) {
        selectedCategories.forEach((category) =>
          connectExerciseToCategory({
            exerciseId: data.id,
            categoryId: category.id,
          }),
        );
      }

      router.push(`/exercise/${exercise ? exercise.id : data.id}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ExerciseFormData = {
      title: form.title,
      description: form.description || undefined,
      duration: form.duration || undefined,
      image: form.image,
      calory: form.calory ? Number(form.calory) : undefined,
      exerciseSections: sections
        .filter((s) => s.title.trim() !== "")
        .map((s) => ({
          title: s.title,
          description: s.description || undefined,
          image: s.image || undefined,
          list: s.list.split("\n").filter(Boolean),
          // id > 1000 — фейковые id новых секций, их не отправляем
          ...(s.id <= 1000 ? { id: s.id } : {}),
        })),
    };

    mutation.mutate(payload);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-[900px] px-2.5 pb-16"
      >
        <div className="flex items-center justify-between py-5">
          <Link
            href={isEdit ? `/exercise/${exercise!.id}` : "/exercise"}
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
              <label className={labelClass}>
                Название <span className="text-rose-500">*</span>
              </label>
              <input
                className={inputClass}
                value={form.title || ""}
                onChange={(e) => set("title", e.target.value)}
                placeholder="Например: Отжимания"
                required
              />
            </div>

            <div>
              <label className={labelClass}>Описание</label>
              <textarea
                className={`${inputClass} min-h-[80px] resize-y hide-scrollbar`}
                value={form.description || ""}
                onChange={(e) => set("description", e.target.value)}
                placeholder="Короткое описание упражнения"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className={labelClass}>Калории/мин</label>
                <input
                  type="number"
                  className={inputClass}
                  value={form.calory || ""}
                  onChange={(e) => set("calory", e.target.value)}
                  placeholder="8"
                />
              </div>
              <div>
                <label className={labelClass}>Длительность</label>
                <input
                  className={inputClass}
                  value={form.duration || ""}
                  onChange={(e) => set("duration", e.target.value)}
                  placeholder="10–15 мин"
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Категории</label>
              <div className="flex flex-wrap items-center gap-1.5">
                {selectedCategories.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => removeCategory(item.id)}
                    title="Убрать категорию"
                    className="flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm text-blue-300 transition hover:border-rose-500/40 hover:text-rose-300"
                  >
                    {item.name}
                    <span className="text-xs">×</span>
                  </button>
                ))}
                <Button
                  variant="ghost"
                  onClick={() => openModal({ key: "ExerciseCategory" })}
                  aria-label="Добавить категорию"
                >
                  <Image
                    width={20}
                    alt="addCategory"
                    height={20}
                    src={"/svg/plus.svg"}
                  />
                </Button>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Ссылка на фото <span className="text-rose-500">*</span>
              </label>
              <input
                className={inputClass}
                value={form.image || ""}
                onChange={(e) => set("image", e.target.value)}
                placeholder="/img/trainMan2.png"
              />
            </div>
          </div>
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
                    value={section.title || ""}
                    onChange={(e) =>
                      setSection(section.id, "title", e.target.value)
                    }
                    placeholder="Например: Техника выполнения"
                  />
                </div>
                <div>
                  <label className={labelClass}>Инструкция</label>
                  <textarea
                    className={`${inputClass} min-h-[70px] resize-y hide-scrollbar`}
                    value={section.description || ""}
                    onChange={(e) =>
                      setSection(section.id, "description", e.target.value)
                    }
                    placeholder="Краткая инструкция к секции"
                  />
                </div>
                <div>
                  <label className={labelClass}>Ссылка на фото</label>
                  <input
                    className={inputClass}
                    value={section.image || ""}
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
                    className={`${inputClass} min-h-[90px] resize-y hide-scrollbar`}
                    value={section.list || ""}
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

        {mutation.isError && (
          <p className="mb-3 text-center text-sm text-rose-400">
            Не удалось сохранить. Проверьте данные и попробуйте снова.
          </p>
        )}

        <div className="flex gap-3">
          <Button
            type="submit"
            disabled={mutation.isPending}
            className="flex-1 justify-center bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {mutation.isPending
              ? "Сохранение..."
              : isEdit
                ? "Сохранить изменения"
                : "Создать упражнение"}
          </Button>
        </div>
      </form>

      {modals.ExerciseCategory.isOpen && (
        <ExerciseCategoryModal
          connected={selectedCategories}
          onApply={applyCategories}
        />
      )}
    </>
  );
}
