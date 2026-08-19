import {
  FaTachometerAlt,
  FaTicketAlt,
  FaUsers,
  FaUserTie,
  FaUserCog,
  FaBell,
  FaChartBar,
  FaUser,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function AdminSidebar() {

  const navigate = useNavigate();

  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="sidebar-logo">
        <img
          src="/assets/images/logo.jpg"
          alt="Support Management System"
        />

        <h2>Support Management</h2>
      </div>

      {/* Navigation */}
      <nav className="sidebar-menu">

        <button onClick={() => navigate("/admin-dashboard")}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </button>

        <button onClick={() => navigate("/tickets")}>
          <FaTicketAlt />
          <span>Ticket Management</span>
        </button>

        <button onClick={() => navigate("/admin/users")}>
          <FaUsers />
          <span>User Management</span>
        </button>

        <button onClick={() => navigate("/admin/project-managers")}>
          <FaUserTie />
          <span>Project Managers</span>
        </button>

        <button onClick={() => navigate("/admin/consultants")}>
          <FaUserCog />
          <span>Consultants</span>
        </button>

        <button onClick={() => navigate("/admin/notifications")}>
          <FaBell />
          <span>Notifications</span>
        </button>

        <button onClick={() => navigate("/admin/reports")}>
          <FaChartBar />
          <span>Reports & Analytics</span>
        </button>

        <button onClick={() => navigate("/admin/profile")}>
          <FaUser />
          <span>My Profile</span>
        </button>

        <button onClick={() => navigate("/admin/settings")}>
          <FaCog />
          <span>Settings</span>
        </button>

        <button onClick={() => navigate("/login")}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </nav>

    </aside>
  );
}

export default AdminSidebar;