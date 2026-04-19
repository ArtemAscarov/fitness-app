import { Request, Response } from "express";
import { IdParamsSchema } from "../validators/general.validators";
import { CategoryService } from "../services/category.service";
import { CategorySchemaPatch } from "../validators/category.validator";

class CategoryControllerCalss {
  async create(req: Request, res: Response) {
    const createdElement = await CategoryService.create(req.body);
    return res.status(201).json(createdElement);
  }

  async delete(req: Request, res: Response) {
    const deletedCategory = await CategoryService.delete(Number(req.params.id));
    return res.status(200).json(deletedCategory);
  }

  async update(req: Request, res: Response) {
    const updatedCategory = await CategoryService.update(
      Number(req.params.id),
      req.body,
    );

    return res.status(200).json(updatedCategory);
  }

  async get(req: Request, res: Response) {
    const categories = await CategoryService.getAll();
    return res.status(200).json(categories);
  }
}

export const CategoryController = new CategoryControllerCalss();
