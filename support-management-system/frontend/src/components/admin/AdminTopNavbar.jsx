import {
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";

function AdminTopNavbar() {
  return (
    <header className="admin-top-navbar">

      <div>
        <strong>Admin Dashboard</strong>
      </div>

      <input
        type="text"
        className="admin-search"
        placeholder="Search tickets..."
      />

      <div className="admin-navbar-right">

        <FaBell className="admin-navbar-icon" />

        <div className="admin-navbar-profile">
          <FaUserCircle className="admin-navbar-icon" />
          <span>Admin</span>
        </div>

      </div>

    </header>
  );
}

export default AdminTopNavbar;