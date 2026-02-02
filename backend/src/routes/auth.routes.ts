import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { Validator } from "../middleware/Validator";
import { AuthValidator } from "../validators/auth.validator";

const authRouter = Router();

authRouter.post("/login", Validator(AuthValidator), AuthController.login);
authRouter.post("/register", Validator(AuthValidator), AuthController.register);

export default authRouter;
