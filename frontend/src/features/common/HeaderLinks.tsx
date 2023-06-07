import { Link } from "react-router-dom";
import "./HeaderLinks.css";
import ManagerContainer from "./ManagerContainer";
export default function HeaderLinks() {
  return (
    <ul className="header__links">
      <li>
        <Link to={"/profile"}>Profile</Link>
      </li>
      <ManagerContainer>
        <li>
          <Link to={"/employees"}>Employees</Link>
        </li>
      </ManagerContainer>
    </ul>
  );
}
