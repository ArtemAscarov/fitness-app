"use client";

import useToggle from "@/shared/hooks/useToggle";
import { cn } from "@/shared/lib/cn";
import Accordion from "@/shared/ui/Accordion";
import Button from "@/shared/ui/button";
import Card from "@/shared/ui/Card";
import Link from "@/shared/ui/Link";
import Image from "next/image";
import { excercises } from "@/entities/excercise/mock";

type Props = {};

export default function Index({}: Props) {
  const [isOpenFilters, toggle] = useToggle(false);

  const filters = [
    {
      id: 1,
      name: "Тренировки",
      children: [
        { id: 1, slug: "cardio", name: "Кардио" },
        { id: 2, slug: "strength", name: "Силовые" },
        { id: 3, slug: "stretching", name: "Растяжка" },
        { id: 4, slug: "hiit", name: "HIIT" },
        { id: 5, slug: "functional", name: "Функциональные" },
      ],
    },
    {
      id: 2,
      name: "Уровень",
      children: [
        { id: 6, slug: "beginner", name: "Новичок" },
        { id: 7, slug: "intermediate", name: "Средний" },
        { id: 8, slug: "advanced", name: "Продвинутый" },
        { id: 9, slug: "pro", name: "Профи" },
      ],
    },
    {
      id: 3,
      name: "Оборудование",
      children: [
        { id: 10, slug: "no-equipment", name: "Без оборудования" },
        { id: 11, slug: "dumbbells", name: "Гантели" },
        { id: 12, slug: "bands", name: "Резинки" },
        { id: 13, slug: "barbell", name: "Штанга" },
        { id: 14, slug: "kettlebell", name: "Гиря" },
      ],
    },
    {
      id: 4,
      name: "Цель",
      children: [
        { id: 15, slug: "weight-loss", name: "Похудение" },
        { id: 16, slug: "muscle-gain", name: "Набор массы" },
        { id: 17, slug: "endurance", name: "Выносливость" },
        { id: 18, slug: "flexibility", name: "Гибкость" },
      ],
    },
    {
      id: 5,
      name: "Длительность",
      children: [
        { id: 19, slug: "5-10", name: "5–10 мин" },
        { id: 20, slug: "10-20", name: "10–20 мин" },
        { id: 21, slug: "20-30", name: "20–30 мин" },
        { id: 22, slug: "30-plus", name: "30+ мин" },
      ],
    },
    {
      id: 6,
      name: "Интенсивность",
      children: [
        { id: 23, slug: "low", name: "Низкая" },
        { id: 24, slug: "medium", name: "Средняя" },
        { id: 25, slug: "high", name: "Высокая" },
      ],
    },
    {
      id: 7,
      name: "Часть тела",
      children: [
        { id: 26, slug: "legs", name: "Ноги" },
        { id: 27, slug: "arms", name: "Руки" },
        { id: 28, slug: "back", name: "Спина" },
        { id: 29, slug: "chest", name: "Грудь" },
        { id: 30, slug: "core", name: "Пресс" },
      ],
    },
    {
      id: 8,
      name: "Формат",
      children: [
        { id: 31, slug: "home", name: "Дом" },
        { id: 32, slug: "gym", name: "Зал" },
        { id: 33, slug: "outdoor", name: "Улица" },
      ],
    },
    {
      id: 9,
      name: "Пол",
      children: [
        { id: 34, slug: "male", name: "Мужской" },
        { id: 35, slug: "female", name: "Женский" },
        { id: 36, slug: "unisex", name: "Универсально" },
      ],
    },
    {
      id: 10,
      name: "Возраст",
      children: [
        { id: 37, slug: "kids", name: "Дети" },
        { id: 38, slug: "teens", name: "Подростки" },
        { id: 39, slug: "adults", name: "Взрослые" },
        { id: 40, slug: "seniors", name: "50+" },
      ],
    },
    {
      id: 11,
      name: "Тип нагрузки",
      children: [
        { id: 41, slug: "aerobic", name: "Аэробная" },
        { id: 42, slug: "anaerobic", name: "Анаэробная" },
        { id: 43, slug: "mixed", name: "Смешанная" },
      ],
    },
    {
      id: 12,
      name: "Ограничения",
      children: [
        { id: 44, slug: "joint-safe", name: "Щадящая для суставов" },
        { id: 45, slug: "rehab", name: "Реабилитация" },
        { id: 46, slug: "pregnancy", name: "Для беременных" },
      ],
    },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-2.5">

      <div className="py-[30px]">
        <h2 className="text-white font-semibold xl:text-[48px] text-[32px] mb-2">
          Избранные упражнения
        </h2>
      </div>

      <div
        className={cn(
          "bg-[#1e2939] rounded-xl p-2.5 xl:p-3 border border-neutral-700 mb-5 transition-all duration-200 overflow-hidden max-w-[1400px] mx-auto",
          isOpenFilters ? "max-h-[1000px]" : "max-h-[72px]"
        )}
      >
        <div
          className={cn(
            "flex gap-2.5 mb-5",
            isOpenFilters
              ? "border-b border-neutral-700 pb-[15px]"
              : "border-b border-[#0000]"
          )}
        >
          <label className="bg-[#364153] rounded-[10px] w-full px-[15px] py-2.5 flex gap-2.5 items-center">
            <Image alt="loop" width={20} height={20} src={"/svg/loop.svg"} />
            <input
              className="outline-none text-white w-full"
              placeholder="Поиск упражнений..."
              type="text"
            />
          </label>
          <Button
            onClick={toggle}
            variant="ghost"
            className="border border-black min-w-[120px]"
          >
            <Image alt="filter" width={20} height={20} src={"svg/filter.svg"} />
            Фильтры
          </Button>
        </div>

        <div>
          <h3 className="text-white text-[18px] font-bold mb-3">Фильтры</h3>

          <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-x-5 gap-y-5">
            {filters.map((item, index) => (
              <Accordion key={index} name={item.name}>
                {item.children.map((item) => (
                  <Link
                    key={item.id}
                    href={`?search=${item.slug}`}
                    className="text-[#dad3d9] border border-[#b9b3b8be] py-1 text-[14px]"
                    variant="ghost"
                  >
                    {item.name}
                  </Link>
                ))}
              </Accordion>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {excercises.map((item) => (
          <Card key={item.id} excercise={item} />
        ))}
      </div>
    </div>
  );
}
