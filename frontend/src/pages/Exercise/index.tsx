"use client";

import useToggle from "@/shared/hooks/useToggle";
import { cn } from "@/shared/lib/cn";
import Accordion from "@/shared/ui/Accordion";
import Button from "@/shared/ui/button";
import Card from "@/shared/ui/Card";
import Link from "@/shared/ui/Link";
import Image from "next/image";
import { exercises } from "@/entities/exercise/mock";

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
      <div className="relative my-6 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1d2a52] via-[#221c4a] to-[#3a1c4a] p-6 xl:p-12">
        <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-56 w-56 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="relative">
          <h2 className="mb-3 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-[32px] font-bold text-transparent xl:text-[52px]">
            Каталог упражнений
          </h2>
          <p className="max-w-xl text-[16px] text-gray-300">
            Найдите подходящие упражнения для ваших тренировок — с подробной
            техникой, фото и пошаговыми инструкциями.
          </p>
        </div>
      </div>

      <div className="mb-10 grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-5">
        {exercises.map((item) => (
          <Card key={item.id} exercise={item} />
        ))}
      </div>
    </div>
  );
}
