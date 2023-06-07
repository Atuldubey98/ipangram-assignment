import { Link } from "react-router-dom";
import Header from "./Header";
import "./NotAuthorized.css";
import { MdOutlineDoNotDisturb } from "react-icons/md";
export default function NotAuthorized() {
  return (
    <>
      <Header />
      <main className="not_auth">
        <MdOutlineDoNotDisturb size={40} />
        <h1>Not Authorized for this request</h1>
        <Link to={"/profile"}>Go to home page</Link>
      </main>
    </>
  );
}
