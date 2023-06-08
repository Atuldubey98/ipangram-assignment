import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUserAction } from "../login/loginSlice";
import "./Header.css";
import HeaderLinks from "./HeaderLinks";
import { FiLogOut } from "react-icons/fi";
import { setEmployeeStateDefault } from "../employee/employeeSlice";
import { setCompanyEmployeeStateDefault } from "../employees/employeeSlice";
export default function Header() {
  const { user } = useAppSelector((state) => state.auth);
  const appDispatch = useAppDispatch();
  const navigate = useNavigate();
  const onLogout = () => {
    if (confirm("Do you want logout ?")) {
      appDispatch(logoutUserAction(resetAllStates));
    }
  };
  function resetAllStates() {
    appDispatch(setCompanyEmployeeStateDefault());
    appDispatch(setEmployeeStateDefault());
    navigate("/login");
  }
  return (
    <header>
      <Link
        style={{
          textDecoration: "none",
          color : "black"
        }}
        to={"/"}
      >
        <h2>Ipangram</h2>
      </Link>
      <HeaderLinks />
      <div className="header__profile">
        <p>{user?.email}</p>
        <FiLogOut className="pointer" onClick={onLogout} />
      </div>
    </header>
  );
}
