import { prisma } from "../prisma";
import { CustomError } from "../util/CustomError";
import { FavoriteSchemaType } from "../validators/favorite.validator";

class FavoriteServiceClass {
  async delete(userId: number, { excerciseId }: FavoriteSchemaType) {
    const data = await prisma.favorite.delete({
      where: {
        excerciseId_userId: {
          userId,
          excerciseId,
        },
      },
    });

    if (!data) throw new CustomError("Ошибка при удалении favorite", 500);

    return excerciseId;
  }

  async create(userId: number, { excerciseId }: FavoriteSchemaType) {
    const data = await prisma.favorite.create({
      data: {
        userId,
        excerciseId,
      },
    });

    if (!data) throw new CustomError("Ошибка при добавлении favorite", 500);

    return excerciseId;
  }
}

export const FavoriteService = new FavoriteServiceClass();
