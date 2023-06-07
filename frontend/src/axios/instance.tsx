import axios, { isAxiosError } from "axios";
export const baseURL = import.meta.env.DEV
  ? `http://localhost:9000`
  : import.meta.env.VITE_API_URL;
const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const isUnAuthorized =
      isAxiosError(error) && error.response?.status === 403;
    const isUnAuthenticated =
      isAxiosError(error) && error.response?.status === 401;
    if (window.location.pathname !== "/login" && isUnAuthenticated) {
      window.location.href = "/login";
    }
    if (window.location.pathname !== "/login" && isUnAuthorized) {
      window.location.href = "/unauthorized";
    }
    return Promise.reject(error);
  }
);
export default instance;
