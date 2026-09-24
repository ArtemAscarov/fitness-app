import { Router } from "express";
import { RefreshController } from "../controllers/refresh.controller.js";

const refreshRouter = Router();

refreshRouter.post("/", RefreshController.refresh);

export default refreshRouter;
