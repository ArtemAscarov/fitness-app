import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import { prisma } from "../src/prisma";


const categoriesData: Prisma.CategoryCreateManyInput[] = [
  { name: "Грудь", slug: "chest" },
  { name: "Спина", slug: "back" },
  { name: "Ноги", slug: "legs" },
  { name: "Руки", slug: "arms" },
  { name: "Плечи", slug: "shoulders" },
  { name: "Пресс", slug: "abs" },
  { name: "Бицепс", slug: "biceps" },
  { name: "Трицепс", slug: "triceps" },
  { name: "Ягодицы", slug: "glutes" },
  { name: "Икры", slug: "calves" },
  { name: "Предплечья", slug: "forearms" },
  { name: "Кардио", slug: "cardio" },
  { name: "Растяжка", slug: "stretching" },
  { name: "Кор", slug: "core" },
  { name: "Шея", slug: "neck" },
  { name: "Трапеции", slug: "traps" },
  { name: "Квадрицепс", slug: "quads" },
  { name: "Бицепс бедра", slug: "hamstrings" },
  { name: "Косые мышцы", slug: "obliques" },
  { name: "Поясница", slug: "lower-back" },
  { name: "Гантели", slug: "dumbbells" },
  { name: "Штанга", slug: "barbell" },
  { name: "Турник", slug: "pull-up-bar" },
  { name: "Брусья", slug: "dip-bars" },
  { name: "Резинка", slug: "resistance-band" },
  { name: "Гиря", slug: "kettlebell" },
  { name: "Скакалка", slug: "jump-rope" },
  { name: "Медбол", slug: "med-ball" },
  { name: "Без оборудования", slug: "bodyweight" },
  { name: "Тренажёр", slug: "machine" },
  { name: "Скамья", slug: "bench" },
  { name: "TRX", slug: "trx" },
  { name: "Канаты", slug: "battle-ropes" },
  { name: "Бодибар", slug: "body-bar" },
  { name: "Платформа", slug: "box" },
  { name: "Ролик", slug: "ab-roller" },
  { name: "Эспандер", slug: "expander" },
  { name: "Степ", slug: "step" },
  { name: "Фитбол", slug: "fitball" },
  { name: "Колесо", slug: "wheel" },
];


const levelsData: Prisma.LevelCreateManyInput[] = [
  { name: "Новичок", slug: "easy" },
  { name: "Занимающийся", slug: "medium" },
  { name: "Опытный", slug: "hard" },
];


type ExerciseSeed = {
  title: string;
  calory: number;
  duration: string;
  level: "easy" | "medium" | "hard";
  categories: string[]; 
};

const exercisesData: ExerciseSeed[] = [
  { title: "Отжимания от пола", calory: 90, duration: "5–10 мин", level: "easy", categories: ["chest", "triceps", "bodyweight"] },
  { title: "Классические приседания", calory: 110, duration: "5–10 мин", level: "easy", categories: ["legs", "glutes", "bodyweight"] },
  { title: "Подтягивания прямым хватом", calory: 130, duration: "5–8 мин", level: "hard", categories: ["back", "biceps", "pull-up-bar"] },
  { title: "Планка", calory: 50, duration: "2–5 мин", level: "easy", categories: ["core", "abs", "bodyweight"] },
  { title: "Выпады вперёд", calory: 100, duration: "6–10 мин", level: "medium", categories: ["legs", "glutes"] },
  { title: "Берпи", calory: 180, duration: "8–12 мин", level: "hard", categories: ["cardio", "core", "bodyweight"] },
  { title: "Жим штанги лёжа", calory: 140, duration: "8–12 мин", level: "medium", categories: ["chest", "barbell"] },
  { title: "Становая тяга", calory: 200, duration: "10–15 мин", level: "hard", categories: ["back", "barbell", "lower-back"] },
  { title: "Скручивания на пресс", calory: 60, duration: "4–8 мин", level: "easy", categories: ["abs", "core"] },
  { title: "Отжимания на брусьях", calory: 120, duration: "5–8 мин", level: "medium", categories: ["triceps", "dip-bars"] },
  { title: "Подъём штанги на бицепс", calory: 80, duration: "6–10 мин", level: "medium", categories: ["biceps", "barbell"] },
  { title: "Французский жим", calory: 85, duration: "6–10 мин", level: "medium", categories: ["triceps", "dumbbells"] },
  { title: "Махи гирей", calory: 160, duration: "8–12 мин", level: "medium", categories: ["glutes", "kettlebell"] },
  { title: "Прыжки на скакалке", calory: 200, duration: "10–15 мин", level: "easy", categories: ["cardio", "jump-rope"] },
  { title: "Болгарские выпады", calory: 130, duration: "8–12 мин", level: "hard", categories: ["legs", "glutes", "dumbbells"] },
  { title: "Тяга гантели в наклоне", calory: 110, duration: "8–12 мин", level: "medium", categories: ["back", "dumbbells"] },
  { title: "Жим гантелей сидя", calory: 105, duration: "8–12 мин", level: "medium", categories: ["shoulders", "dumbbells"] },
  { title: "Подъём ног в висе", calory: 90, duration: "5–8 мин", level: "hard", categories: ["abs", "pull-up-bar"] },
  { title: "Ягодичный мостик", calory: 70, duration: "5–8 мин", level: "easy", categories: ["glutes", "bodyweight"] },
  { title: "Подъём на носки", calory: 55, duration: "4–7 мин", level: "easy", categories: ["calves", "bodyweight"] },
  { title: "Велосипед (скручивания)", calory: 75, duration: "5–8 мин", level: "easy", categories: ["abs", "obliques"] },
  { title: "Приседания с гирей (гоблет)", calory: 140, duration: "8–12 мин", level: "medium", categories: ["legs", "kettlebell"] },
  { title: "Отжимания с узкой постановкой", calory: 95, duration: "5–8 мин", level: "medium", categories: ["triceps", "bodyweight"] },
  { title: "Тяга верхнего блока", calory: 100, duration: "8–12 мин", level: "easy", categories: ["back", "machine"] },
  { title: "Разведение гантелей лёжа", calory: 90, duration: "6–10 мин", level: "medium", categories: ["chest", "dumbbells"] },
  { title: "Подъём гантелей перед собой", calory: 70, duration: "5–8 мин", level: "easy", categories: ["shoulders", "dumbbells"] },
  { title: "Гиперэкстензия", calory: 65, duration: "5–8 мин", level: "easy", categories: ["lower-back", "bench"] },
  { title: "Прыжки на тумбу", calory: 170, duration: "8–12 мин", level: "hard", categories: ["legs", "box"] },
  { title: "Скалолаз", calory: 150, duration: "6–10 мин", level: "medium", categories: ["cardio", "core"] },
  { title: "Русские скручивания", calory: 80, duration: "5–8 мин", level: "medium", categories: ["obliques", "med-ball"] },
  { title: "Жим ногами", calory: 150, duration: "8–12 мин", level: "medium", categories: ["quads", "machine"] },
  { title: "Сгибание ног лёжа", calory: 90, duration: "6–10 мин", level: "medium", categories: ["hamstrings", "machine"] },
  { title: "Подтягивания обратным хватом", calory: 125, duration: "5–8 мин", level: "hard", categories: ["back", "biceps", "pull-up-bar"] },
  { title: "Армейский жим штанги", calory: 135, duration: "8–12 мин", level: "hard", categories: ["shoulders", "barbell"] },
  { title: "Тяга каната", calory: 190, duration: "6–10 мин", level: "hard", categories: ["cardio", "battle-ropes"] },
  { title: "Ролик для пресса", calory: 95, duration: "5–8 мин", level: "hard", categories: ["abs", "ab-roller"] },
  { title: "Выпады назад", calory: 105, duration: "6–10 мин", level: "medium", categories: ["legs", "glutes"] },
  { title: "Зашагивания на платформу", calory: 110, duration: "8–12 мин", level: "easy", categories: ["legs", "step"] },
  { title: "Подъём на бицепс с резинкой", calory: 60, duration: "5–8 мин", level: "easy", categories: ["biceps", "resistance-band"] },
  { title: "Растяжка задней поверхности бедра", calory: 30, duration: "5–10 мин", level: "easy", categories: ["stretching", "hamstrings"] },
];

async function main() {
  await prisma.favorite.deleteMany();
  await prisma.exerciseSection.deleteMany();
  await prisma.refresh.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.category.deleteMany();
  await prisma.level.deleteMany();
  await prisma.user.deleteMany();


  await prisma.level.createMany({ data: levelsData });
  await prisma.category.createMany({ data: categoriesData });

  const levels = await prisma.level.findMany();
  const categories = await prisma.category.findMany();
  const levelBySlug = Object.fromEntries(levels.map((l) => [l.slug, l.id]));
  const catBySlug = Object.fromEntries(categories.map((c) => [c.slug, c.id]));


  const userPass = await bcrypt.hash("password123", 10);
  const usersData: Prisma.UserCreateManyInput[] = [
    { email: "admin@gmail.com", password: await bcrypt.hash("admin123", 10), role: "ADMIN" },
    ...Array.from({ length: 39 }, (_, i) => ({
      email: `user${i + 1}@gmail.com`,
      password: userPass,
    })),
  ];

  await prisma.user.createMany({ data: usersData });
  const users = await prisma.user.findMany();


  for (const ex of exercisesData) {
    await prisma.exercise.create({
      data: {
        title: ex.title,
        calory: ex.calory,
        duration: ex.duration,
        image: `https://picsum.photos/seed/${encodeURIComponent(ex.title)}/600/400`,
        levelId: levelBySlug[ex.level],
        category: {
          connect: ex.categories.map((slug) => ({ id: catBySlug[slug] })),
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
    `Seed готов: ${levels.length} уровней, ${categories.length} категорий, ` +
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
