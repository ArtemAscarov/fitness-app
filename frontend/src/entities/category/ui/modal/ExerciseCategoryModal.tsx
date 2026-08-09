"use client";

import { useBlockScroll } from "@/shared/hooks/useBlockScroll";
import { useModalStore } from "@/shared/stores/modalStore";
import Button from "@/shared/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCategoryQueryOptions } from "../../features/getCategoryQueryOptions";
import { FormEvent, useState } from "react";
import { Category, CategoryGroup } from "../../type";

type Props = {
  connected: Category[];
  onApply: (selected: Category[]) => void;
};

export default function ExerciseCategoryModal({ connected, onApply }: Props) {
  useBlockScroll(true);
  const { closeModal } = useModalStore((state) => state);
  const { data } = useQuery<CategoryGroup[]>(getCategoryQueryOptions());

  const [selected, setSelected] = useState<Category[]>(connected);

  const toggle = (category: Category) => {
    setSelected((prev) =>
      prev.some((c) => c.id === category.id)
        ? prev.filter((c) => c.id !== category.id)
        : [...prev, category],
    );
  };

  const apply = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onApply(selected);
    closeModal({ key: "ExerciseCategory" });
  };

  const isSelected = (id: number) => selected.some((c) => c.id === id);

  return (
    <div
      onClick={() => closeModal({ key: "ExerciseCategory" })}
      className="flex fixed justify-center items-center bg-[#00000081] z-20 w-full h-full inset-0"
    >
      <form
        onSubmit={apply}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-2xl px-3 py-2 relative items-center justify-center duration-200 slide-in-from-bottom-4 animate-in bg-[#1E2939] w-full max-w-[400px] text-white"
      >
        <Button
          className="absolute right-2 top-0"
          onClick={() => closeModal({ key: "ExerciseCategory" })}
          variant="ghost"
        >
          X
        </Button>
        <div className="flex justify-end items-center w-full mb-5">
          <h3 className="text-[20px] font-semibold flex-1 text-center">
            Категории упражнения
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto hide-scrollbar border border-amber-100 p-2">
          {data?.map((item) => (
            <div key={item.id}>
              <h4 className="text-[14px] font-bold border-b-white border-b">
                {item.name}
              </h4>
              <ul>
                {item.categories.map((category) => (
                  <li key={category.id}>
                    <Button
                      onClick={() => toggle(category)}
                      className={`text-[14px] p-1 justify-center ${isSelected(category.id) ? "border-b border-b-red-500 rounded-[0px]" : ""}`}
                      variant="ghost"
                    >
                      {category.name}
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-5">
          <Button type="submit">Применить</Button>
        </div>
      </form>
    </div>
  );
}
