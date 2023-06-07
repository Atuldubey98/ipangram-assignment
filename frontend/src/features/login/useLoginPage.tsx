import { ChangeEventHandler, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import useUserToast from "../common/useUserToast";
import { loginUserAction } from "./loginSlice";

export type LoginUserType = {
  email: string;
  password: string;
};
export default function useLoginPage() {
  const [loginUser, setLoginUser] = useState<LoginUserType>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  const onLoginFormFieldChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, name } = e.target;
    setLoginUser({
      ...loginUser,
      [name]: value,
    });
  };
  const { showToast } = useUserToast();

  function navigateToProfile() {
    navigate("/profile");
  }
  const onSubmitLoginForm: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (loginUser.email.length === 0 || loginUser.password.length === 0) {
      return;
    }
    appDispatch(loginUserAction(loginUser, navigateToProfile, showToast));
  };
  return {
    loginUser,
    onLoginFormFieldChange,
    onSubmitLoginForm,
  };
}
