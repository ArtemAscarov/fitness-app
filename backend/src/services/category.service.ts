import { prisma } from "../prisma";
import { CustomError } from "../util/CustomError";
import {
  CategoryDataType,
  CategoryDataTypePatch,
} from "../validators/category.validator";

class CategoryServiceClass {
  async delete(id: number) {
    const PrismaData = await prisma.category.delete({
      where: {
        id: id,
      },
    });

    return PrismaData;
  }

  async create(newData: CategoryDataType) {
    const PrismaData = await prisma.category.create({
      data: {
        name: newData.name,
        slug: newData.slug,
      },
    });

    return PrismaData;
  }

  async update(id: number, newData: CategoryDataTypePatch) {
    const UpdatedData = await prisma.category.update({
      where: { id },
      data: newData,
    });

    return UpdatedData;
  }

  async getAll() {
    const Categories = await prisma.category.findMany();
    if (!Categories)
      throw new CustomError("Ошибка при получении категорий", 400);
    return Categories;
  }
}

export const CategoryService = new CategoryServiceClass();
