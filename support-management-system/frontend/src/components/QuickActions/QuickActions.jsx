import "./QuickActions.css";
import {
  FaPlusCircle,
  FaTicketAlt,
  FaUserCircle,
  FaComments,
} from "react-icons/fa";

function QuickActions() {
  return (
    <div className="quick-actions">

      <h2>Quick Actions</h2>

      <div className="action-grid">

        <div className="action-card">
          <FaPlusCircle />
          <h3>Create Ticket</h3>
          <p>Submit a new support request.</p>
        </div>

        <div className="action-card">
          <FaTicketAlt />
          <h3>My Tickets</h3>
          <p>View all your support tickets.</p>
        </div>

        <div className="action-card">
          <FaUserCircle />
          <h3>My Profile</h3>
          <p>Update your personal information.</p>
        </div>

        <div className="action-card">
          <FaComments />
          <h3>Messages</h3>
          <p>Chat with the support team.</p>
        </div>

      </div>

    </div>
  );
}

export default QuickActions;