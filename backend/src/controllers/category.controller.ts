import { Response } from "express";
import { AuntificationRequest } from "../lib/types/type";

class CategoryControllerCalss {
  async create(req: AuntificationRequest, res: Response) {}

  async delete(req: AuntificationRequest, res: Response) {}

  async update(req: AuntificationRequest, res: Response) {}

  async get(req: AuntificationRequest, res: Response) {}
}

export const CategoryController = new CategoryControllerCalss();
