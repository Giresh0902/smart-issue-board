import Navbar from "../components/Navbar";
import { auth } from "../firebase";
import { Link } from "react-router-dom";
import "./homepage.css";
const Dashboard = () => {
  return (
    <>
      <Navbar email={auth.currentUser.email} />

      <div className="container">
        <h1>Welcome, {auth.currentUser.email}</h1>

        <Link to="/create">
          <button>Create Issue</button>
        </Link>

        <Link to="/issues">
          <button>View Issues</button>
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
