import {
  FaTachometerAlt,
  FaTicketAlt,
  FaPlus,
  FaComments,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "./ClientSidebar.css";

function ClientSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="client-sidebar">

      {/* Logo */}
      <div className="client-sidebar-logo">
        <img
          src="/assets/images/logo.jpg"
          alt="Support Management System"
        />

        <h2>Support Management</h2>
      </div>

      {/* Navigation */}
      <nav className="client-sidebar-menu">

        {/* Dashboard */}
        <button onClick={() => navigate("/client-dashboard")}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </button>

        {/* My Tickets */}
        <button onClick={() => navigate("/client/tickets")}>
          <FaTicketAlt />
          <span>My Tickets</span>
        </button>

        {/* Create Ticket */}
        <button onClick={() => navigate("/client/create-ticket")}>
          <FaPlus />
          <span>Create Ticket</span>
        </button>

        {/* Ticket Conversation */}
        <button onClick={() => navigate("/client/ticket-conversation")}>
          <FaComments />
          <span>Ticket Conversation</span>
        </button>

        {/* Notifications */}
        <button onClick={() => navigate("/client/notifications")}>
          <FaBell />
          <span>Notifications</span>
        </button>

        {/* My Profile */}
        <button onClick={() => navigate("/client/profile")}>
          <FaUser />
          <span>My Profile</span>
        </button>

        {/* Settings */}
        <button onClick={() => navigate("/client/settings")}>
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

export default ClientSidebar;