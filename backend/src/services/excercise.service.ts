import { Prisma } from "@prisma/client";
import { AuthJwtPayload } from "../lib/types/type";
import { prisma } from "../prisma";
import { CustomError } from "../util/CustomError";
import {
  ExcerciseFiltersType,
  ExcerciseSchemaPatchType,
  ExcerciseSchemaType,
} from "../validators/exercise.validator";

class ExcerciseServiceClass {
  async getOne(id: number) {
    const data = prisma.exercise.findUnique({
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

    if (query.tag)
      where.tag = {
        some: {
          slug: {
            in: query.tag,
          },
        },
      };

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

    const data = await prisma.exercise.findMany({
      where,

      include: {
        favorites: {
          where: {
            userId: user?.id,
          },
        },
        tag: true,
      },
    });

    if (!data) throw new CustomError("Ошибка при получении упражнений", 500);

    const reducedData = data.map(({ favorites, ...excercise }) => {
      return {
        ...excercise,
        isFavorite: favorites.length > 0,
      };
    });

    return reducedData;
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
      data: { ...body, isFavorite: false },
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
}

export const ExcerciseService = new ExcerciseServiceClass();
