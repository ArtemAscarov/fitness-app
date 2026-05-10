import { prisma } from "../prisma";
import { CustomError } from "../util/CustomError";
import {
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

  async getAll() {
    const data = await prisma.exercise.findMany();

    if (!data) throw new CustomError("Ошибка при получении упражнений", 500);

    return data;
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
