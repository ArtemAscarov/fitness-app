import { prisma } from "../prisma.js";
import { CustomError } from "../util/CustomError.js";
import {
  CategoryDataType,
  CategoryDataTypePatch,
} from "../validators/category.validator.js";

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
    // const PrismaData = await prisma.category.create({
    //   data: {
    //     name: newData.name, I decided to do it in prisma studio (npm run studio)
    //     slug: newData.slug,
    //   },
    // });
    // return PrismaData;
  }

  async update(id: number, newData: CategoryDataTypePatch) {
    const UpdatedData = await prisma.category.update({
      where: { id },
      data: newData,
    });

    return UpdatedData;
  }

  async getAll() {
    const Categories = await prisma.categoriesGroup.findMany({
      include: { categories: true },
    });
    if (!Categories)
      throw new CustomError("Ошибка при получении категорий", 400);
    return Categories;
  }
}

export const CategoryService = new CategoryServiceClass();
