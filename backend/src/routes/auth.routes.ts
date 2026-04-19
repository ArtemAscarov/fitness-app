import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { AuthValidator } from "../validators/auth.validator";
import { bodyValidator } from "../middleware/Validators";

const authRouter = Router();

authRouter.post("/login", bodyValidator(AuthValidator), AuthController.login);
authRouter.post("/register", bodyValidator(AuthValidator), AuthController.register);

export default authRouter;
