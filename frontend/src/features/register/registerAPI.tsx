import instance from "../../axios/instance";
import { RegisterUserType } from "./useRegisterPage";

export const registerUserAPI = (registerUser: RegisterUserType) => {
  const { email, password, ...profile } = registerUser;
  const data = {
    user: { email, password },
    profile: {
      ...profile,
      hobbies: profile.hobbies.map((h) => h.value),
    },
  };
  return instance.post("/api/v1/users/register", data);
};
