import {
  FaTachometerAlt,
  FaTicketAlt,
  FaUserTie,
  FaUsers,
  FaBell,
  FaChartBar,
  FaUser,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "./ProjectManagerSidebar.css";

function ProjectManagerSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="project-manager-sidebar">

      {/* Logo */}
      <div className="project-manager-sidebar-logo">
        <img
          src="/assets/images/logo.jpg"
          alt="Support Management System"
        />

        <h2>Support Management</h2>
      </div>


      {/* Navigation */}
      <nav className="project-manager-sidebar-menu">

        {/* Dashboard */}
        <button onClick={() => navigate("/project-manager-dashboard")}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </button>


        {/* Assigned Tickets */}
        <button onClick={() => navigate("/project-manager/tickets")}>
          <FaTicketAlt />
          <span>Assigned Tickets</span>
        </button>


        {/* Consultants */}
        <button onClick={() => navigate("/project-manager/consultants")}>
          <FaUsers />
          <span>Consultants</span>
        </button>


        {/* Notifications */}
        <button onClick={() => navigate("/project-manager/notifications")}>
          <FaBell />
          <span>Notifications</span>
        </button>


        {/* Reports */}
        <button onClick={() => navigate("/project-manager/reports")}>
          <FaChartBar />
          <span>Reports</span>
        </button>


        {/* My Profile */}
        <button onClick={() => navigate("/project-manager/profile")}>
          <FaUser />
          <span>My Profile</span>
        </button>


        {/* Settings */}
        <button onClick={() => navigate("/project-manager/settings")}>
          <FaCog />
          <span>Settings</span>
        </button>


        {/* Logout */}
        <button onClick={() => navigate("/login")}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </nav>

    </aside>
  );
}

export default ProjectManagerSidebar;