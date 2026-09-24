import { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { CheckAuth } from "../middleware/CheckAuth.js";
import { paramValidator, queryValidator } from "../middleware/Validators.js";
import { IdParamsSchema } from "../validators/general.validators.js";
import { UserGetQuerySchema } from "../validators/user.validator.js";

const UserRouter = Router();

UserRouter.get("/me", CheckAuth({ isStrict: true }), UserController.getMe);

UserRouter.get(
  "/",
  CheckAuth({ isStrict: true, accessedRoles: ["ADMIN"] }),
  queryValidator(UserGetQuerySchema),
  UserController.getUsers,
);

UserRouter.get(
  "/:id",
  CheckAuth({ isStrict: true, accessedRoles: ["ADMIN"] }),
  paramValidator(IdParamsSchema),
  UserController.getUser,
);

export default UserRouter;
