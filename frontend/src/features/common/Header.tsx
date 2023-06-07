import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUserAction } from "../login/loginSlice";
import "./Header.css";
import HeaderLinks from "./HeaderLinks";
import { FiLogOut } from "react-icons/fi";
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
    navigate("/login");
  }
  return (
    <header>
      <h2>Ipangram</h2>
      <HeaderLinks />
      <div className="header__profile">
        <p>{user?.email}</p>
        <FiLogOut className="pointer" onClick={onLogout} />
      </div>
    </header>
  );
}
