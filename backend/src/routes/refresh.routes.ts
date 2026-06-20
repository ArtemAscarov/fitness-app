import { Router } from "express";
import { RefreshController } from "../controllers/refresh.controller";

const refreshRouter = Router();

refreshRouter.post("/", RefreshController.refresh);

export default refreshRouter;
