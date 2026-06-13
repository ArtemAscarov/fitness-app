import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { CheckAuth } from "../middleware/CheckAuth";
import { paramValidator, queryValidator } from "../middleware/Validators";
import { IdParamsSchema } from "../validators/general.validators";
import { UserGetQuerySchema } from "../validators/user.validator";

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
