import { prisma } from "../prisma.js";
import { CustomError } from "../util/CustomError.js";
import { FavoriteSchemaType } from "../validators/favorite.validator.js";

class FavoriteServiceClass {
  async delete(userId: number, exerciseId: number) {
    const data = await prisma.favorite.delete({
      where: {
        exerciseId_userId: {
          userId,
          exerciseId,
        },
      },
    });

    if (!data) throw new CustomError("Ошибка при удалении favorite", 500);

    return exerciseId;
  }

  async create(userId: number, { exerciseId }: FavoriteSchemaType) {
    const data = await prisma.favorite.create({
      data: {
        userId,
        exerciseId,
      },
    });

    if (!data) throw new CustomError("Ошибка при добавлении favorite", 500);

    return exerciseId;
  }
}

export const FavoriteService = new FavoriteServiceClass();
