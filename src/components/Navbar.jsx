import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
const Navbar = ({ email }) => {
  const navigate = useNavigate();

  const logout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="navbar">
      <h2>Smart Issue Board</h2>
      <div>
        <span>{email}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
