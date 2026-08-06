import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaPlusCircle,
  FaTicketAlt,
  FaBell,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaComments,
} from "react-icons/fa";

function Sidebar() {

  const navigate = useNavigate();

  return (

    <div className="sidebar">

      <div className="sidebar-logo">
        <h2>Support MS</h2>
      </div>

      <ul>

        <li
          className="active"
          onClick={() => navigate("/client-dashboard")}
        >
          <FaTachometerAlt />
          <span>Dashboard</span>
        </li>

        <li
          onClick={() => navigate("/create-ticket")}
        >
          <FaPlusCircle />
          <span>Create Ticket</span>
        </li>

        <li
          onClick={() => navigate("/my-tickets")}
        >
          <FaTicketAlt />
          <span>My Tickets</span>
        </li>

        <li
          onClick={() => navigate("/messages")}
        >
          <FaComments />
          <span>Messages</span>
        </li>

        <li
          onClick={() => navigate("/notifications")}
        >
          <FaComments />
          <span>Notifications</span>
        </li>

        <li
          onClick={() => navigate("/profile")}
        >
          <FaUser />
          <span>My Profile</span>
        </li>

        <li
          onClick={() => navigate("/settings")}
        >
          <FaCog />
          <span>Settings</span>
        </li>

        <li
          className="logout"
          onClick={() => navigate("/login")}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </li>

      </ul>

    </div>

  );
}

export default Sidebar;