import "./Notifications.css";
import {
  FaBell,
  FaCheckCircle,
  FaCommentDots,
  FaClock,
} from "react-icons/fa";

function Notifications() {
  return (
    <div className="notifications">

      <div className="notification-header">
        <h2>Recent Notifications</h2>
      </div>

      <div className="notification-list">

        <div className="notification-item">
          <FaBell className="icon red" />

          <div>
            <h4>Ticket Assigned</h4>
            <p>Your ticket has been assigned to a consultant.</p>
            <span>5 minutes ago</span>
          </div>
        </div>

        <div className="notification-item">
          <FaCommentDots className="icon blue" />

          <div>
            <h4>New Reply</h4>
            <p>Consultant replied to your support ticket.</p>
            <span>20 minutes ago</span>
          </div>
        </div>

        <div className="notification-item">
          <FaClock className="icon orange" />

          <div>
            <h4>Status Updated</h4>
            <p>Ticket status changed to In Progress.</p>
            <span>1 hour ago</span>
          </div>
        </div>

        <div className="notification-item">
          <FaCheckCircle className="icon green" />

          <div>
            <h4>Ticket Closed</h4>
            <p>Your issue has been resolved successfully.</p>
            <span>Yesterday</span>
          </div>
        </div>

      </div>

    </div>
  );
}

export default Notifications;