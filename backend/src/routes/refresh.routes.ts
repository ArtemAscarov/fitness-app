import { Router } from "express";
import { RefreshController } from "../controllers/refresh.controller";
import { bodyValidator } from "../middleware/Validators";
import { tokenSchema } from "../validators/general.validators";

const refreshRouter = Router();

refreshRouter.post("/", bodyValidator(tokenSchema), RefreshController.refresh);

export default refreshRouter;
