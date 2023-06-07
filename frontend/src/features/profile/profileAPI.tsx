import instance from "../../axios/instance";

export const loadProfileAPI = () => {
  return instance.get("/api/v1/profiles/current-user");
};
