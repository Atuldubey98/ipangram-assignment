import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAuthorized from "../middlewares/isAuthorized";
import EmployeeController from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get(
  "/",
  isAuthenticated,
  isAuthorized("manager"),
  EmployeeController.getProfilesOfEmployees
);
employeeRouter.get(
  "/current-user",
  isAuthenticated,
  EmployeeController.getCurrentLoggedInUserProfile
);
export default employeeRouter;
