import { Router } from "express";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthValidator } from "../validators/auth.validator.js";
import { bodyValidator } from "../middleware/Validators.js";

const authRouter = Router();

authRouter.post("/login", bodyValidator(AuthValidator), AuthController.login);
authRouter.post(
  "/register",
  bodyValidator(AuthValidator),
  AuthController.register,
);
authRouter.post("/logout", AuthController.logout);

export default authRouter;
