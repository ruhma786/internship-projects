import "./TopNavbar.css";
import {
  FaBell,
  FaSearch,
  FaUserCircle
} from "react-icons/fa";

function TopNavbar() {

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

        <div className="notification">

          <FaBell />

          <span className="badge">3</span>

        </div>

        <div className="profile">

          <FaUserCircle />

          <span>Client</span>

        </div>

      </div>

    </div>

  );
}

export default TopNavbar;