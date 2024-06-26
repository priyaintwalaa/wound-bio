import express, { Router } from "express";
import { UserController } from "../controllers/user.controller.js";
import { verfiyRole, verifyToken } from "../middlewares/auth.middleware.js";
import { Roles } from "../constants/enums.js";
import { userRegistrationSchema } from "../schemas/zod.schema.js";
import { validateData } from "../middlewares/validation.middleware.js";

const userRouter: Router = express.Router();
const userController: UserController = new UserController();

//Create first system admin
userRouter.post(
    "/system-admin",
    validateData(userRegistrationSchema),
    userController.createSystemAdmin
);
userRouter.use(verifyToken);
userRouter.use(verfiyRole([Roles.SYSTEM_ADMIN]));
userRouter.get("/:id", userController.getUser);
//Create users from system admin's account, need to restrict
userRouter.post(
    "/",
    validateData(userRegistrationSchema),
    userController.createUser
);
userRouter.put("/:id", userController.updateUser);
// userRouter.put('/:id/status', userController.updateUserStatus);
userRouter.delete("/:id", userController.deleteUser);
userRouter.get("/:id/token", userController.getToken);

export default userRouter;
