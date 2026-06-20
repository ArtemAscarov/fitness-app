import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { AuthValidator } from "../validators/auth.validator";
import { bodyValidator } from "../middleware/Validators";

const authRouter = Router();

authRouter.post("/login", bodyValidator(AuthValidator), AuthController.login);
authRouter.post(
  "/register",
  bodyValidator(AuthValidator),
  AuthController.register,
);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
