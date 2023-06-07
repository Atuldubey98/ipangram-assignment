import { Router } from "express";
import UserController from "../controllers/user.controller";
import {
  loginValidation,
  regiserValidation,
  validate,
} from "../utils/validation";
import isAuthenticated from "../middlewares/isAuthenticated";

const userRouter = Router();
userRouter.post(
  "/register",
  validate(regiserValidation),
  UserController.registerUser
);
userRouter.post("/login", validate(loginValidation), UserController.loginUser);
userRouter.get("/", isAuthenticated, UserController.getCurrentUser);
userRouter.post("/logout", isAuthenticated, UserController.logoutCurrentUser);
export default userRouter;
