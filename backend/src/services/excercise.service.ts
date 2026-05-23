import { Prisma } from "@prisma/client";
import { AuthJwtPayload } from "../lib/types/type";
import { prisma } from "../prisma";
import { CustomError } from "../util/CustomError";
import {
  ExcerciseCategroyUpdateType,
  ExcerciseFiltersType,
  ExcerciseSchemaPatchType,
  ExcerciseSchemaType,
} from "../validators/exercise.validator";

class ExcerciseServiceClass {
  async getOne(id: number) {
    const data = await prisma.exercise.findUnique({
      where: {
        id,
      },
    });

    if (!data) throw new CustomError("Ошибка при получении упражнения", 500);

    return data;
  }

  async getAll(query: ExcerciseFiltersType, user?: AuthJwtPayload) {
    const where: Prisma.ExerciseWhereInput = {};

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

        include: {
          favorites: {
            where: {
              userId: user?.id,
            },
          },
          category: true,
        },
      }),
      prisma.exercise.count({ where }),
    ]);

    if (!data) throw new CustomError("Ошибка при получении упражнений", 500);

    const reducedData = data.map(({ favorites, ...excercise }) => {
      return {
        ...excercise,
        isFavorite: favorites.length > 0,
      };
    });

    return { count, results: reducedData };
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

  async create(body: ExcerciseSchemaType) {
    const data = await prisma.exercise.create({
      data: { ...body },
    });

    if (!data) throw new CustomError("Ошибка при создании упражнения", 500);

    return data;
  }

  async update(id: number, body: ExcerciseSchemaPatchType) {
    const data = await prisma.exercise.update({
      where: { id },
      data: body,
    });

    if (!data) throw new CustomError("Ошибка при обновлении упражнения", 500);

    return data;
  }

  async bindToCategory({
    excerciseId,
    categoryId,
  }: ExcerciseCategroyUpdateType) {
    const data = await prisma.exercise.update({
      where: { id: excerciseId },
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
    excerciseId,
    categoryId,
  }: ExcerciseCategroyUpdateType) {
    const data = await prisma.exercise.update({
      where: {
        id: excerciseId,
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

export const ExcerciseService = new ExcerciseServiceClass();
