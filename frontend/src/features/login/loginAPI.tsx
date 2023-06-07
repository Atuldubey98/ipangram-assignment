import instance from "../../axios/instance";
import { LoginUserType } from "./useLoginPage";

export const loginUserAPI = (loginUser: LoginUserType) => {
  return instance.post("/api/v1/users/login", loginUser);
};
export const loadUserAPI = () => {
  return instance.get("/api/v1/users");
};
export const logoutAPI = () => {
  return instance.post("/api/v1/users/logout");
};
