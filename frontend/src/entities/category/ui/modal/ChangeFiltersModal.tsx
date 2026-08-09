"use client";

import { useBlockScroll } from "@/shared/hooks/useBlockScroll";
import { useModalStore } from "@/shared/stores/modalStore";
import Button from "@/shared/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getCategoryQueryOptions } from "../../features/getCategoryQueryOptions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { CategoryGroup } from "../../type";

type Props = {};

export default function ChangeFiltersModal({}: Props) {
  useBlockScroll(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { closeModal } = useModalStore((state) => state);
  const { data } = useQuery<CategoryGroup[]>(getCategoryQueryOptions());

  const [selectedSlug, setSelectedSlug] = useState<string[]>(
    searchParams?.get("category")?.split(",") || [],
  );

  const changeFilters = (slug: string) => {
    setSelectedSlug((prew) =>
      prew.includes(slug) ? prew.filter((i) => i !== slug) : [...prew, slug],
    );
  };

  const getNewExercises = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const param = new URLSearchParams(searchParams?.toString() || "");
    closeModal({ key: "SelectCategory" });

    selectedSlug.length === 0 ||
    (selectedSlug[0].length === 0 && selectedSlug.length < 2)
      ? param.delete("category")
      : param.set("category", selectedSlug.join(","));

    param.delete("page");

    router.push(`${pathname}?${param.toString()}`);
  };

  return (
    <div
      onClick={() => closeModal({ key: "SelectCategory" })}
      className="flex fixed justify-center items-center bg-[#00000081] z-20 w-full h-full insert-0 "
    >
      <form
        onSubmit={getNewExercises}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col rounded-2xl px-3 py-2 relative items-center justify-center duration-200 slide-in-from-bottom-4 animate-in bg-[#1E2939] w-full max-w-[400px] text-white"
      >
        <Button
          className="absolute right-2 top-0"
          onClick={() => closeModal({ key: "SelectCategory" })}
          variant="ghost"
        >
          X
        </Button>
        <div className="flex justify-end items-center w-full mb-5">
          <h3 className="text-[20px] font-semibold flex-1 text-center">
            Фильтры
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-3 max-h-[400px] overflow-y-auto hide-scrollbar border border-amber-100 p-2">
          {data?.map((item) => (
            <div key={item.id}>
              <h4 className="text-[14px] font-bold border-b-white border-b ">
                {item.name}
              </h4>
              <ul className="">
                {item.categories.map((children) => (
                  <li key={children.id}>
                    <Button
                      onClick={() => changeFilters(children.slug)}
                      className={`text-[14px] p-1 ${selectedSlug.includes(children.slug) ? "border-b border-b-red-500 rounded-[0px] p" : ""} justify-center`}
                      variant="ghost"
                    >
                      {children.name}
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
