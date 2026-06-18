import { Request, Response } from "express";
import { LevelService } from "../services/level.service";

class LevelControllerClass {
  async create(req: Request, res: Response) {
    const createdElement = await LevelService.create(req.body);
    return res.status(201).json(createdElement);
  }

  async delete(req: Request, res: Response) {
    const deletedLevel = await LevelService.delete(Number(req.params.id));
    return res.status(200).json(deletedLevel);
  }

  async update(req: Request, res: Response) {
    const updatedLevel = await LevelService.update(
      Number(req.params.id),
      req.body,
    );

    return res.status(200).json(updatedLevel);
  }

  async get(req: Request, res: Response) {
    const levels = await LevelService.getAll();
    return res.status(200).json(levels);
  }
}

export const LevelController = new LevelControllerClass();
