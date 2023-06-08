import { Router } from "express";
import isAuthenticated from "../middlewares/isAuthenticated";
import isAuthorized from "../middlewares/isAuthorized";
import EmployeeController from "../controllers/employee.controller";
import { employeeValidation, validate } from "../utils/validation";

const employeeRouter = Router();

employeeRouter.get(
  "/",
  isAuthenticated,
  isAuthorized("manager"),
  EmployeeController.getProfilesOfEmployees
);
employeeRouter.patch(
  "/",
  isAuthenticated,
  isAuthorized("manager"),
  EmployeeController.bulkUpdateEmployeeDetails
);
employeeRouter.get(
  "/current-user",
  isAuthenticated,
  EmployeeController.getCurrentLoggedInUserProfile
);
employeeRouter.patch(
  "/:employeeId",
  isAuthenticated,
  isAuthorized("manager"),
  validate(employeeValidation),
  EmployeeController.updateEmployeeData
);
export default employeeRouter;
