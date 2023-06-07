import { Link } from "react-router-dom";
import AddOrRemoveList from "../common/AddOrRemoveList";
import Button from "../common/Button";
import Input from "../common/Input";
import InputErrTxt from "../common/InputErrTxt";
import SelectOptions from "../common/SelectOptions";
import useFocusOnTextField from "../common/useFocusOnTextField";
import "./RegisterPage.css";
import useRegisterPage from "./useRegisterPage";

export default function RegisterPage() {
  const { fieldRef } = useFocusOnTextField();
  const {
    genderOptions,
    onRegisterFormSubmit,
    onRegisterFieldChange,
    registerUser,
    registerFormErrors,
    addHobbyToRegisteredUser,
    onRemoveHobby,
    onChangeHobby,
    hobby,
  } = useRegisterPage();
  return (
    <main className="register__page">
      <div className="register__wrapper">
        <h1>Register Page</h1>
        <Link to={"/login"}>Already Registered ? Login</Link>
        <form onSubmit={onRegisterFormSubmit}>
          <Input
            onChange={onRegisterFieldChange}
            label="Email"
            type="email"
            name="email"
            required
            value={registerUser.email}
            ref={fieldRef}
          />
          {registerFormErrors.emailErrTxt ? (
            <InputErrTxt errorTxt={registerFormErrors.emailErrTxt} />
          ) : null}
          <Input
            required={true}
            label="Password"
            value={registerUser.password}
            onChange={onRegisterFieldChange}
            type="password"
            minLength={8}
            maxLength={20}
            name="password"
          />
          {registerFormErrors.passwordErrTxt ? (
            <InputErrTxt errorTxt={registerFormErrors.passwordErrTxt} />
          ) : null}
          <Input
            label="First Name"
            type="text"
            required={true}
            value={registerUser.firstName}
            name="firstName"
            onChange={onRegisterFieldChange}
          />
          {registerFormErrors.firstNameErrTxt ? (
            <InputErrTxt errorTxt={registerFormErrors.firstNameErrTxt} />
          ) : null}
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={registerUser.lastName}
            onChange={onRegisterFieldChange}
          />
          <SelectOptions
            onChange={onRegisterFieldChange}
            name="gender"
            options={genderOptions}
            label="Gender"
            value={registerUser.gender}
          />
          <AddOrRemoveList
            buttonLabel="Add Hobby"
            onRemoveClick={onRemoveHobby}
            addToList={addHobbyToRegisteredUser}
            listItems={registerUser.hobbies}
            inputProps={{
              value: hobby.value,
              onChange: onChangeHobby,
            }}
          />
          <Button label="Register" type="submit" />
        </form>
      </div>
    </main>
  );
}
