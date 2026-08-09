import { Prisma } from "@prisma/client";
import { AuthJwtPayload } from "../lib/types/type";
import { prisma } from "../prisma";
import { CustomError } from "../util/CustomError";
import {
  ExerciseCategroyUpdateType,
  ExerciseFiltersType,
  ExerciseSchemaPatchType,
  ExerciseSchemaType,
} from "../validators/exercise.validator";

class ExerciseServiceClass {
  async getOne(id: number) {
    const data = await prisma.exercise.findUnique({
      where: {
        id,
      },
      include: {
        exerciseSections: true,
        category: true,
      },
    });

    if (!data) throw new CustomError("Нету такого упражнения", 404);

    return data;
  }

  async getAll(query: ExerciseFiltersType, user?: AuthJwtPayload) {
    let where: Prisma.ExerciseWhereInput = {};
    let include: any = { category: true };

    if (user)
      include.favorites = {
        where: {
          userId: user?.id,
        },
      };

    if (query.title)
      where.title = { contains: query.title, mode: "insensitive" };

    if (query.calory) where.calory = { equals: query.calory };

    if (query.category && query.category.length > 0) {
      where.category = {
        some: {
          slug: {
            in: query.category,
          },
        },
      };
    }

    if (user && query.isFavorite === true) {
      where.favorites = {
        some: {
          userId: user.id,
        },
      };
    }

    if (user && query.isFavorite === false) {
      where.favorites = {
        none: {
          userId: user.id,
        },
      };
    }

    const [data, count] = await prisma.$transaction([
      prisma.exercise.findMany({
        where,

        take: query.limit,
        skip: query.limit * (query.page - 1),
        orderBy: {
          id: "desc",
        },

        include,
      }),
      prisma.exercise.count({ where }),
    ]);

    if (!data) throw new CustomError("Ошибка при получении упражнений", 500);

    const reducedData = data.map(({ favorites, ...exercise }) => {
      return {
        ...exercise,
        isFavorite: user ? favorites.length > 0 : false,
      };
    });

    return {
      page: query.page,
      count,
      pageCount: Math.ceil(count / query.limit),
      results: reducedData,
      limit: query.limit,
      isHasNext: count > query.limit * query.page,
      isHasPrev: query.page > 1,
    };
  }

  async delete(id: number) {
    const data = await prisma.exercise.delete({
      where: {
        id,
      },
    });

    if (!data) throw new CustomError("Ошибка при удалении упражнения", 500);

    return data;
  }

  async create(body: ExerciseSchemaType) {
    const { exerciseSections, ...newBody } = body;

    const newData = exerciseSections.filter((i) => !i.id) || [];

    const data = await prisma.exercise.create({
      data: {
        ...newBody,
        exerciseSections: {
          createMany: { data: newData },
        },
      },
    });

    if (!data) throw new CustomError("Ошибка при создании упражнения", 500);

    return data;
  }

  async update(id: number, body: ExerciseSchemaPatchType) {
    const { exerciseSections, ...other } = body;

    const newExercises = exerciseSections?.filter((i) => !i.id) || [];
    const oldExercises = exerciseSections?.filter((i) => i.id) || [];
    const keepIds = oldExercises.map((s) => s.id!);

    const data = await prisma.exercise.update({
      where: { id },
      data: {
        ...other,

        ...(exerciseSections && {
          exerciseSections: {
            update: oldExercises.map(({ id, ...i }) => ({
              where: {
                id: id,
              },
              data: i,
            })),
            createMany: {
              data: newExercises,
            },
            deleteMany: {
              id: { notIn: keepIds },
            },
          },
        }),
      },
    });

    if (!data) throw new CustomError("Ошибка при обновлении упражнения", 500);

    return data;
  }

  async bindToCategory({ exerciseId, categoryId }: ExerciseCategroyUpdateType) {
    const data = await prisma.exercise.update({
      where: { id: exerciseId },
      data: {
        category: {
          connect: { id: categoryId },
        },
      },
    });

    if (!data) throw new CustomError("Ошибка при создании связи", 500);

    return data;
  }

  async toreCategoryConnection({
    exerciseId,
    categoryId,
  }: ExerciseCategroyUpdateType) {
    const data = await prisma.exercise.update({
      where: {
        id: exerciseId,
      },
      data: {
        category: {
          disconnect: {
            id: categoryId,
          },
        },
      },
    });

    if (!data) throw new CustomError("Ошибка при разрыве связи", 500);

    return data;
  }
}

export const ExerciseService = new ExerciseServiceClass();
