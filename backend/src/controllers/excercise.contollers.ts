import { Request, Response } from "express";
import { ExcerciseService } from "../services/excercise.service";
import { AuntificationRequest } from "../lib/types/type";

class ExcerciseControllerClass {
  async get(req: AuntificationRequest, res: Response) {
    const data = await ExcerciseService.getAll(res.locals.query, req.user);

    return res.json(data).status(200);
  }

  async delete(req: Request, res: Response) {
    const data = await ExcerciseService.delete(+req.params.id);

    return res.status(200).json(data);
  }

  async patch(req: Request, res: Response) {
    const data = await ExcerciseService.update(+req.params.id, req.body);

    return res.status(200).json(data);
  }

  async post(req: Request, res: Response) {
    const data = await ExcerciseService.create(req.body);

    return res.status(200).json(data);
  }

  async getOne(req: Request, res: Response) {
    const data = await ExcerciseService.getOne(+req.params.id);

    return res.status(200).json(data);
  }
}

export const ExcerciseController = new ExcerciseControllerClass();
