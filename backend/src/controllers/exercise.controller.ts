import { Request, Response } from "express";
import { ExerciseService } from "../services/exercise.service";

class ExerciseControllerClass {
  async get(req: Request, res: Response) {
    const data = await ExerciseService.getAll(res.locals.query, res.locals.user);

    return res.json(data).status(200);
  }

  async delete(req: Request, res: Response) {
    const data = await ExerciseService.delete(+req.params.id);

    return res.status(200).json(data);
  }

  async patch(req: Request, res: Response) {
    const data = await ExerciseService.update(+req.params.id, req.body);

    return res.status(200).json(data);
  }

  async post(req: Request, res: Response) {
    const data = await ExerciseService.create(req.body);

    return res.status(200).json(data);
  }

  async getOne(req: Request, res: Response) {
    const data = await ExerciseService.getOne(+req.params.id);

    return res.status(200).json(data);
  }

  async connectToCategory(req: Request, res: Response) {
    const data = await ExerciseService.bindToCategory(req.body);

    return res.status(200).json(data);
  }

  async disconnectToCategroy(req: Request, res: Response) {
    const data = await ExerciseService.toreCategoryConnection(req.body);

    res.status(200).json(data);
  }
}

export const ExerciseController = new ExerciseControllerClass();
