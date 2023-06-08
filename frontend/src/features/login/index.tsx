import { Link } from "react-router-dom";
import "./LoginPage.css";
import Input from "../common/Input";
import Button from "../common/Button";
import "./LoginPage.css";
import useLoginPage from "./useLoginPage";
import { BarLoader } from "react-spinners";
export default function LoginPage() {
  const { loginUser, onLoginFormFieldChange, onSubmitLoginForm, loading } =
    useLoginPage();
  return (
    <main className="login__page d-flex-center">
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
            disabled={loading}
            required
          />
          <Input
            onChange={onLoginFormFieldChange}
            label="Password"
            disabled={loading}
            type="password"
            value={loginUser.password}
            required={true}
            minLength={3}
            maxLength={20}
            name="password"
          />
          {loading ? (
            <div className="d-flex-center">
              <BarLoader />
            </div>
          ) : (
            <Button label="Login" type="submit" />
          )}
        </form>
      </div>
    </main>
  );
}
