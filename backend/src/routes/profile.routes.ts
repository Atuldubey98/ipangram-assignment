import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAuthorized from "../middlewares/isAuthorized";
import ProfileController from "../controllers/profile.controller";

const profileRouter = Router();

profileRouter.get(
  "/",
  isAuthenticated,
  isAuthorized("manager"),
  ProfileController.getProfilesOfEmployees
);
profileRouter.get(
  "/current-user",
  isAuthenticated,
  ProfileController.getCurrentLoggedInUserProfile
);
export default profileRouter;
