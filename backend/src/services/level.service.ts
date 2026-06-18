import { prisma } from "../prisma";
import { CustomError } from "../util/CustomError";
import {
  LevelDataType,
  LevelDataTypePatch,
} from "../validators/level.validator";

class LevelServiceClass {
  async delete(id: number) {
    const PrismaData = await prisma.level.delete({
      where: {
        id: id,
      },
    });

    return PrismaData;
  }

  async create(newData: LevelDataType) {
    const PrismaData = await prisma.level.create({
      data: {
        name: newData.name,
        slug: newData.slug,
      },
    });

    return PrismaData;
  }

  async update(id: number, newData: LevelDataTypePatch) {
    const UpdatedData = await prisma.level.update({
      where: { id },
      data: newData,
    });

    return UpdatedData;
  }

  async getAll() {
    const Levels = await prisma.level.findMany();
    if (!Levels) throw new CustomError("Ошибка при получении уровней", 400);
    return Levels;
  }
}

export const LevelService = new LevelServiceClass();
