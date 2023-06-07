import { Link } from "react-router-dom";
import "./LoginPage.css";
import Input from "../common/Input";
import Button from "../common/Button";
import "./LoginPage.css";
import useLoginPage from "./useLoginPage";
export default function LoginPage() {
  const { loginUser, onLoginFormFieldChange, onSubmitLoginForm } =
    useLoginPage();
  return (
    <main>
      <div className="login__wrapper">
        <h1>Login Page</h1>
        <Link to={"/register"}>Click here to register</Link>
        <form onSubmit={onSubmitLoginForm}>
          <Input
            onChange={onLoginFormFieldChange}
            label="Email"
            type="email"
            value={loginUser.email}
            name="email"
            required
          />
          <Input
            onChange={onLoginFormFieldChange}
            label="Password"
            type="password"
            value={loginUser.password}
            required={true}
            minLength={3}
            maxLength={20}
            name="password"
          />
          <Button label="Login" type="submit" />
        </form>
      </div>
    </main>
  );
}
