import "./TopNavbar.css";
import { useNavigate } from "react-router-dom";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function TopNavbar() {

  const navigate = useNavigate();

  return (

    <div className="top-navbar">

      {/* Left */}

      <div className="top-left">

        <h2>Client Dashboard</h2>

      </div>

      {/* Center */}

      <div className="top-search">

        <FaSearch />

        <input
          type="text"
          placeholder="Search tickets..."
        />

      </div>

      {/* Right */}

      <div className="top-right">

        {/* Notification */}

        <div
          className="notification"
          onClick={() => navigate("/notifications")}
        >

          <FaBell />

          <span className="badge">
            3
          </span>

        </div>

        {/* Profile */}

        <div
          className="profile"
          onClick={() => navigate("/profile")}
        >

          <FaUserCircle />

          <span>Client</span>

        </div>

      </div>

    </div>

  );
}

export default TopNavbar;