import {
  FaBell,
  FaUserCircle
} from "react-icons/fa";

import "./ClientTopNavbar.css";

function ClientTopNavbar() {
  return (
    <header className="client-top-navbar">

      {/* Dashboard Title */}
      <div>
        <strong>Client Dashboard</strong>
      </div>

      {/* Search */}
      <input
        type="text"
        className="client-search"
        placeholder="Search tickets..."
      />

      {/* Right Side */}
      <div className="client-navbar-right">

        {/* Notification */}
        <FaBell className="client-navbar-icon" />

        {/* Profile */}
        <div className="client-navbar-profile">
          <FaUserCircle className="client-navbar-icon" />
          <span>Client</span>
        </div>

      </div>

    </header>
  );
}

export default ClientTopNavbar;