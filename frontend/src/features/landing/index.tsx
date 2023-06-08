import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import "./LandingPage.css";
export default function LandingPage() {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <main className="landing__page d-flex-center">
      <h1>iPangram</h1>
      <p>Employee Details</p>
      {user ? (
        <div className="d-flex-center">
          <Link to={"/profile"}>Go to Profile</Link>
        </div>
      ) : (
        <div className="btns d-flex-center">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </main>
  );
}
