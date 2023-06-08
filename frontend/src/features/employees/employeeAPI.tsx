import instance from "../../axios/instance";
import { EmpQuery } from "./interfaces";

export const loadEmployeesData = (query: EmpQuery) => {
  return instance.get("/api/v1/employees", {
    params: query,
  });
};
