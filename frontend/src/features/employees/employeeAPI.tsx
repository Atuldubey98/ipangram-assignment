import instance from "../../axios/instance";
import { EmployeeCompanyDetails } from "./EmployeeDetailsUpdateModal";
import { EmpQuery } from "./interfaces";

export const loadEmployeesData = (query: EmpQuery) => {
  return instance.get("/api/v1/employees", {
    params: query,
  });
};
export const updateEmployeeData = (
  empDetails: EmployeeCompanyDetails,
  employeeId: string
) => {
  return instance.patch(`/api/v1/employees/${employeeId}`, empDetails);
};

export const updateEmployeeCompanyDetails = (
  empDetails: EmployeeCompanyDetails,
  employeeIds: string[]
) => {
  return instance.patch("/api/v1/employees", {
    ...empDetails,
    employeeIds,
  });
};
