import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../src/prisma";

// ──────────────────────────────────────────────────────────────
// Группы категорий (CategoriesGroup)
// ──────────────────────────────────────────────────────────────

type GroupKey = "muscles" | "equipment" | "type" | "level";

const groupsData: { key: GroupKey; name: string }[] = [
  { key: "muscles", name: "Группы мышц" },
  { key: "equipment", name: "Оборудование" },
  { key: "type", name: "Тип тренировки" },
  { key: "level", name: "Уровень сложности" },
];

// ──────────────────────────────────────────────────────────────
// Категории (с привязкой к группе)
// ──────────────────────────────────────────────────────────────

type CategorySeed = { name: string; slug: string; group: GroupKey };

const categoriesData: CategorySeed[] = [
  // Группы мышц
  { name: "Грудь", slug: "chest", group: "muscles" },
  { name: "Спина", slug: "back", group: "muscles" },
  { name: "Ноги", slug: "legs", group: "muscles" },
  { name: "Руки", slug: "arms", group: "muscles" },
  { name: "Плечи", slug: "shoulders", group: "muscles" },
  { name: "Пресс", slug: "abs", group: "muscles" },
  { name: "Бицепс", slug: "biceps", group: "muscles" },
  { name: "Трицепс", slug: "triceps", group: "muscles" },
  { name: "Ягодицы", slug: "glutes", group: "muscles" },
  { name: "Икры", slug: "calves", group: "muscles" },
  { name: "Предплечья", slug: "forearms", group: "muscles" },
  { name: "Кор", slug: "core", group: "muscles" },
  { name: "Шея", slug: "neck", group: "muscles" },
  { name: "Трапеции", slug: "traps", group: "muscles" },
  { name: "Квадрицепс", slug: "quads", group: "muscles" },
  { name: "Бицепс бедра", slug: "hamstrings", group: "muscles" },
  { name: "Косые мышцы", slug: "obliques", group: "muscles" },
  { name: "Поясница", slug: "lower-back", group: "muscles" },

  // Оборудование
  { name: "Гантели", slug: "dumbbells", group: "equipment" },
  { name: "Штанга", slug: "barbell", group: "equipment" },
  { name: "Турник", slug: "pull-up-bar", group: "equipment" },
  { name: "Брусья", slug: "dip-bars", group: "equipment" },
  { name: "Резинка", slug: "resistance-band", group: "equipment" },
  { name: "Гиря", slug: "kettlebell", group: "equipment" },
  { name: "Скакалка", slug: "jump-rope", group: "equipment" },
  { name: "Медбол", slug: "med-ball", group: "equipment" },
  { name: "Без оборудования", slug: "bodyweight", group: "equipment" },
  { name: "Тренажёр", slug: "machine", group: "equipment" },
  { name: "Скамья", slug: "bench", group: "equipment" },
  { name: "TRX", slug: "trx", group: "equipment" },
  { name: "Канаты", slug: "battle-ropes", group: "equipment" },
  { name: "Бодибар", slug: "body-bar", group: "equipment" },
  { name: "Платформа", slug: "box", group: "equipment" },
  { name: "Ролик", slug: "ab-roller", group: "equipment" },
  { name: "Эспандер", slug: "expander", group: "equipment" },
  { name: "Степ", slug: "step", group: "equipment" },
  { name: "Фитбол", slug: "fitball", group: "equipment" },
  { name: "Колесо", slug: "wheel", group: "equipment" },

  // Тип тренировки
  { name: "Кардио", slug: "cardio", group: "type" },
  { name: "Растяжка", slug: "stretching", group: "type" },

  // Уровень сложности
  { name: "Новичок", slug: "easy", group: "level" },
  { name: "Занимающийся", slug: "medium", group: "level" },
  { name: "Опытный", slug: "hard", group: "level" },
];

// ──────────────────────────────────────────────────────────────
// Упражнения
// ──────────────────────────────────────────────────────────────

type ExerciseSeed = {
  title: string;
  calory: number;
  duration: string;
  level: "easy" | "medium" | "hard";
  categories: string[]; // slugs (мышцы / оборудование / тип), без уровня
};

const exercisesData: ExerciseSeed[] = [
  {
    title: "Отжимания от пола",
    calory: 90,
    duration: "5–10 мин",
    level: "easy",
    categories: ["chest", "triceps", "bodyweight"],
  },
  {
    title: "Классические приседания",
    calory: 110,
    duration: "5–10 мин",
    level: "easy",
    categories: ["legs", "glutes", "bodyweight"],
  },
  {
    title: "Подтягивания прямым хватом",
    calory: 130,
    duration: "5–8 мин",
    level: "hard",
    categories: ["back", "biceps", "pull-up-bar"],
  },
  {
    title: "Планка",
    calory: 50,
    duration: "2–5 мин",
    level: "easy",
    categories: ["core", "abs", "bodyweight"],
  },
  {
    title: "Выпады вперёд",
    calory: 100,
    duration: "6–10 мин",
    level: "medium",
    categories: ["legs", "glutes"],
  },
  {
    title: "Берпи",
    calory: 180,
    duration: "8–12 мин",
    level: "hard",
    categories: ["cardio", "core", "bodyweight"],
  },
  {
    title: "Жим штанги лёжа",
    calory: 140,
    duration: "8–12 мин",
    level: "medium",
    categories: ["chest", "barbell"],
  },
  {
    title: "Становая тяга",
    calory: 200,
    duration: "10–15 мин",
    level: "hard",
    categories: ["back", "barbell", "lower-back"],
  },
  {
    title: "Скручивания на пресс",
    calory: 60,
    duration: "4–8 мин",
    level: "easy",
    categories: ["abs", "core"],
  },
  {
    title: "Отжимания на брусьях",
    calory: 120,
    duration: "5–8 мин",
    level: "medium",
    categories: ["triceps", "dip-bars"],
  },
  {
    title: "Подъём штанги на бицепс",
    calory: 80,
    duration: "6–10 мин",
    level: "medium",
    categories: ["biceps", "barbell"],
  },
  {
    title: "Французский жим",
    calory: 85,
    duration: "6–10 мин",
    level: "medium",
    categories: ["triceps", "dumbbells"],
  },
  {
    title: "Махи гирей",
    calory: 160,
    duration: "8–12 мин",
    level: "medium",
    categories: ["glutes", "kettlebell"],
  },
  {
    title: "Прыжки на скакалке",
    calory: 200,
    duration: "10–15 мин",
    level: "easy",
    categories: ["cardio", "jump-rope"],
  },
  {
    title: "Болгарские выпады",
    calory: 130,
    duration: "8–12 мин",
    level: "hard",
    categories: ["legs", "glutes", "dumbbells"],
  },
  {
    title: "Тяга гантели в наклоне",
    calory: 110,
    duration: "8–12 мин",
    level: "medium",
    categories: ["back", "dumbbells"],
  },
  {
    title: "Жим гантелей сидя",
    calory: 105,
    duration: "8–12 мин",
    level: "medium",
    categories: ["shoulders", "dumbbells"],
  },
  {
    title: "Подъём ног в висе",
    calory: 90,
    duration: "5–8 мин",
    level: "hard",
    categories: ["abs", "pull-up-bar"],
  },
  {
    title: "Ягодичный мостик",
    calory: 70,
    duration: "5–8 мин",
    level: "easy",
    categories: ["glutes", "bodyweight"],
  },
  {
    title: "Подъём на носки",
    calory: 55,
    duration: "4–7 мин",
    level: "easy",
    categories: ["calves", "bodyweight"],
  },
  {
    title: "Велосипед (скручивания)",
    calory: 75,
    duration: "5–8 мин",
    level: "easy",
    categories: ["abs", "obliques"],
  },
  {
    title: "Приседания с гирей (гоблет)",
    calory: 140,
    duration: "8–12 мин",
    level: "medium",
    categories: ["legs", "kettlebell"],
  },
  {
    title: "Отжимания с узкой постановкой",
    calory: 95,
    duration: "5–8 мин",
    level: "medium",
    categories: ["triceps", "bodyweight"],
  },
  {
    title: "Тяга верхнего блока",
    calory: 100,
    duration: "8–12 мин",
    level: "easy",
    categories: ["back", "machine"],
  },
  {
    title: "Разведение гантелей лёжа",
    calory: 90,
    duration: "6–10 мин",
    level: "medium",
    categories: ["chest", "dumbbells"],
  },
  {
    title: "Подъём гантелей перед собой",
    calory: 70,
    duration: "5–8 мин",
    level: "easy",
    categories: ["shoulders", "dumbbells"],
  },
  {
    title: "Гиперэкстензия",
    calory: 65,
    duration: "5–8 мин",
    level: "easy",
    categories: ["lower-back", "bench"],
  },
  {
    title: "Прыжки на тумбу",
    calory: 170,
    duration: "8–12 мин",
    level: "hard",
    categories: ["legs", "box"],
  },
  {
    title: "Скалолаз",
    calory: 150,
    duration: "6–10 мин",
    level: "medium",
    categories: ["cardio", "core"],
  },
  {
    title: "Русские скручивания",
    calory: 80,
    duration: "5–8 мин",
    level: "medium",
    categories: ["obliques", "med-ball"],
  },
  {
    title: "Жим ногами",
    calory: 150,
    duration: "8–12 мин",
    level: "medium",
    categories: ["quads", "machine"],
  },
  {
    title: "Сгибание ног лёжа",
    calory: 90,
    duration: "6–10 мин",
    level: "medium",
    categories: ["hamstrings", "machine"],
  },
  {
    title: "Подтягивания обратным хватом",
    calory: 125,
    duration: "5–8 мин",
    level: "hard",
    categories: ["back", "biceps", "pull-up-bar"],
  },
  {
    title: "Армейский жим штанги",
    calory: 135,
    duration: "8–12 мин",
    level: "hard",
    categories: ["shoulders", "barbell"],
  },
  {
    title: "Тяга каната",
    calory: 190,
    duration: "6–10 мин",
    level: "hard",
    categories: ["cardio", "battle-ropes"],
  },
  {
    title: "Ролик для пресса",
    calory: 95,
    duration: "5–8 мин",
    level: "hard",
    categories: ["abs", "ab-roller"],
  },
  {
    title: "Выпады назад",
    calory: 105,
    duration: "6–10 мин",
    level: "medium",
    categories: ["legs", "glutes"],
  },
  {
    title: "Зашагивания на платформу",
    calory: 110,
    duration: "8–12 мин",
    level: "easy",
    categories: ["legs", "step"],
  },
  {
    title: "Подъём на бицепс с резинкой",
    calory: 60,
    duration: "5–8 мин",
    level: "easy",
    categories: ["biceps", "resistance-band"],
  },
  {
    title: "Растяжка задней поверхности бедра",
    calory: 30,
    duration: "5–10 мин",
    level: "easy",
    categories: ["stretching", "hamstrings"],
  },
];

async function main() {
  // Порядок удаления учитывает зависимости (Cascade закрывает часть,
  // но категории/группы и юзеров чистим явно)
  await prisma.favorite.deleteMany();
  await prisma.exerciseSection.deleteMany();
  await prisma.refresh.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.category.deleteMany();
  await prisma.categoriesGroup.deleteMany();
  await prisma.user.deleteMany();

  // ── Группы категорий ──
  for (const g of groupsData) {
    await prisma.categoriesGroup.create({ data: { name: g.name } });
  }
  const groups = await prisma.categoriesGroup.findMany();
  const groupIdByKey = Object.fromEntries(
    groupsData.map((g) => {
      const found = groups.find((row) => row.name === g.name);
      if (!found)
        throw new Error(`Группа "${g.name}" не найдена после создания`);
      return [g.key, found.id];
    }),
  ) as Record<GroupKey, number>;

  // ── Категории (привязаны к группам) ──
  await prisma.category.createMany({
    data: categoriesData.map((c) => ({
      name: c.name,
      slug: c.slug,
      categoryGroupId: groupIdByKey[c.group],
    })),
  });
  const categories = await prisma.category.findMany();
  const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.id]));

  // ── Пользователи ──
  const userPass = await bcrypt.hash("password123", 10);
  const usersData: Prisma.UserCreateManyInput[] = [
    {
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: "ADMIN",
    },
    ...Array.from({ length: 39 }, (_, i) => ({
      email: `user${i + 1}@gmail.com`,
      password: userPass,
    })),
  ];

  await prisma.user.createMany({ data: usersData });
  const users = await prisma.user.findMany();

  // ── Упражнения (категории + уровень сложности как категория группы "level") ──
  for (const ex of exercisesData) {
    const categorySlugs = [...ex.categories, ex.level];

    await prisma.exercise.create({
      data: {
        title: ex.title,
        calory: ex.calory,
        duration: ex.duration,
        image: `https://picsum.photos/seed/${encodeURIComponent(ex.title)}/600/400`,
        category: {
          connect: categorySlugs.map((slug) => ({ id: catBySlug[slug] })),
        },
        exerciseSections: {
          create: [
            {
              title: "Техника выполнения",
              description: `Базовая техника упражнения «${ex.title}».`,
              list: [
                "Примите исходное положение",
                "Выполните движение под контролем",
                "Плавно вернитесь в начало",
              ],
            },
            {
              title: "Частые ошибки",
              description: `На что обратить внимание в «${ex.title}».`,
              list: [
                "Не задерживайте дыхание",
                "Держите спину ровной",
                "Не используйте инерцию",
              ],
            },
          ],
        },
      },
    });
  }

  const exercises = await prisma.exercise.findMany();

  await prisma.favorite.createMany({
    data: users.map((u, i) => ({
      userId: u.id,
      exerciseId: exercises[(i * 3 + 1) % exercises.length].id,
    })),
    skipDuplicates: true,
  });

  console.log(
    `Seed готов: ${groups.length} групп категорий, ${categories.length} категорий, ` +
      `${users.length} юзеров, ${exercises.length} упражнений, ` +
      `${exercises.length * 2} секций, ${users.length} избранных`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
