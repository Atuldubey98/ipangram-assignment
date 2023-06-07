import instance from "../../axios/instance";

export const loadEmployeeAPI = () => {
  return instance.get("/api/v1/employees/current-user");
};
