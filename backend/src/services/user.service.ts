import { AuthJwtPayload } from "../lib/types/type.js";
import { prisma } from "../prisma.js";
import { CustomError } from "../util/CustomError.js";
import { UserGetQuerySchemaType } from "../validators/user.validator.js";

class UserServiceClass {
  private select = {
    email: true,
    role: true,
    id: true,
  };

  async getUserData(userData: AuthJwtPayload) {
    const data = await prisma.user.findUnique({
      where: {
        id: userData.id,
      },
      select: this.select,
    });

    if (!data) throw new CustomError("Ошибка при получении пользователя", 500);

    return data;
  }

  async getUsers(filters: UserGetQuerySchemaType) {
    const [data, count] = await prisma.$transaction([
      prisma.user.findMany({
        take: filters.limit,
        skip: filters.limit * (filters.page - 1),
        select: this.select,
      }),
      prisma.user.count(),
    ]);

    if (!data) throw new CustomError("Ошибка при получении пользователей", 500);

    return { results: data, count };
  }

  async getUserById(id: number) {
    const data = await prisma.user.findUnique({
      where: {
        id,
      },
      select: this.select,
    });

    if (!data) throw new CustomError("Ошибка при получении пользователя", 500);

    return data;
  }
}

export const UserService = new UserServiceClass();
