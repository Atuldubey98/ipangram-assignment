import { ChangeEventHandler, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../app/hooks";
import useUserToast from "../common/useUserToast";
import { registerUserAction } from "./registerSlice";
export type RegisterUserType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  hobbies: { _id: string; value: string }[];
  gender: string;
};
export default function useRegisterPage() {
  const defaultHobby = {
    _id: uuidv4(),
    value: "",
  };
  const [hobby, setHobby] = useState<{ _id: string; value: string }>(
    defaultHobby
  );
  const onChangeHobby: ChangeEventHandler<HTMLInputElement> = (e) => {
    setHobby({
      ...hobby,
      value: e.currentTarget.value,
    });
  };
  const { showToast } = useUserToast();
  const genderOptions = [
    {
      value: "male",
      label: "Male",
    },
    {
      value: "female",
      label: "Female",
    },
    {
      value: "others",
      label: "Others",
    },
  ];

  type RegisterUserErrors = {
    emailErrTxt: string;
    passwordErrTxt: string;
    firstNameErrTxt: string;
    hasErrors: boolean;
  };
  const [registerUser, setRegisterUser] = useState<RegisterUserType>({
    email: "",
    hobbies: [],
    password: "",
    firstName: "",
    lastName: "",
    gender: "male",
  });
  const [registerFormErrors, setRegisterFormErrors] =
    useState<RegisterUserErrors>({
      emailErrTxt: "",
      passwordErrTxt: "",
      firstNameErrTxt: "",
      hasErrors: true,
    });
  const appDispatch = useAppDispatch();

  const onRegisterFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (registerFormErrors.hasErrors) {
      return;
    }
    appDispatch(registerUserAction(registerUser, showToast));
  };
  function addHobbyToRegisteredUser() {
    if (hobby.value.length === 0) {
      return;
    }
    setRegisterUser({
      ...registerUser,
      hobbies: [...registerUser.hobbies, hobby],
    });
    setHobby(defaultHobby);
  }
  function onRemoveHobby(_id: string) {
    setRegisterUser({
      ...registerUser,
      hobbies: registerUser.hobbies.filter((h) => h._id !== _id),
    });
  }
  const onRegisterFieldChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (e) => {
    const { value, name } = e.target;
    setRegisterUser({
      ...registerUser,
      [name]: value,
    });
    const passwordErrTxt = registerUser.password.match(
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
    )
      ? ""
      : "Password should contain one lower case, one upper case, one special character and length should be between 8 and 20";
    const emailErrTxt = registerUser.email.match(/.+\@.+\..+/)
      ? ""
      : "Email is not valid";
    const firstNameErrTxt =
      registerUser.firstName.length > 3
        ? ""
        : "First Name should be greater than or equal to 3";
    const hasErrors =
      passwordErrTxt.length > 0 ||
      emailErrTxt.length > 0 ||
      firstNameErrTxt.length > 0;

    setRegisterFormErrors({
      passwordErrTxt,
      emailErrTxt,
      hasErrors,
      firstNameErrTxt,
    });
  };

  return {
    genderOptions,
    onRegisterFieldChange,
    registerUser,
    onRegisterFormSubmit,
    addHobbyToRegisteredUser,
    registerFormErrors,
    onChangeHobby,
    onRemoveHobby,
    hobby,
  };
}
