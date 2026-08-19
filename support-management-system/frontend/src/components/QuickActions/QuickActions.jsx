import "./QuickActions.css";
import { useNavigate } from "react-router-dom";
import {
  FaPlusCircle,
  FaTicketAlt,
  FaUserCircle,
  FaComments,
  FaBell,
} from "react-icons/fa";

function QuickActions() {

  const navigate = useNavigate();

  return (

    <div className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="action-grid">

        {/* Create Ticket */}

        <div
          className="action-card"
          onClick={() => navigate("/create-ticket")}
        >
          <FaPlusCircle />

          <h3>Create Ticket</h3>

          <p>Submit a new support request.</p>

        </div>

        {/* My Tickets */}

        <div
          className="action-card"
          onClick={() => navigate("/my-tickets")}
        >
          <FaTicketAlt />

          <h3>My Tickets</h3>

          <p>View all your support tickets.</p>

        </div>

        {/* My Profile */}

        <div
          className="action-card"
          onClick={() => navigate("/profile")}
        >
          <FaUserCircle />

          <h3>My Profile</h3>

          <p>Update your personal information.</p>

        </div>

        {/* Messages */}

        <div
          className="action-card"
          onClick={() => navigate("/messages")}
        >
          <FaComments />

          <h3>Messages</h3>

          <p>Chat with the support team.</p>

        </div>

        {/* Notifications */}

      <div
       className="action-card"
       onClick={() => navigate("/notifications")}
      >

      <FaBell />

      <h3>Notifications</h3>

      <p>View all your latest notifications.</p>

      </div>

      </div>

    </div>

  );
}

export default QuickActions;