import instance from "../../axios/instance";
import { RegisterUserType } from "./useRegisterPage";

export const registerUserAPI = (registerUser: RegisterUserType) => {
  const { email, password, ...employee } = registerUser;
  const data = {
    user: { email, password },
    employee: {
      ...employee,
      hobbies: employee.hobbies.map((h) => h.value),
    },
  };
  return instance.post("/api/v1/users/register", data);
};
