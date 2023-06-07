import { Route, Routes } from "react-router-dom";
import "./App.css";
import RegisterPage from "./features/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./features/login";
import ProfilePage from "./features/profile";
import PrivateRoute from "./features/common/PrivateRoute";
import NotAuthorized from "./features/common/NotAuthorized";
import EmployeesPage from "./features/employees";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<LoginPage />} path="/login" />
        <Route
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          }
          path="/profile"
        />
        <Route
          element={
            <PrivateRoute>
              <EmployeesPage />
            </PrivateRoute>
          }
          path="/employees"
        />
        <Route
          element={
            <PrivateRoute>
              <NotAuthorized />
            </PrivateRoute>
          }
          path="/unauthorized"
        />
      </Routes>
      <ToastContainer />
    </>
  );
}
