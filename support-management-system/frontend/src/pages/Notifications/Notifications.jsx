import "./Notifications.css";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaBell,
  FaReply,
  FaCheckCircle,
  FaClipboardCheck,
} from "react-icons/fa";

function Notifications() {

  const navigate = useNavigate();

  return (

    <div className="notifications-page">

      {/* ================= Header ================= */}

      <div className="page-header">

        <button
          className="back-btn"
          onClick={() => navigate("/client-dashboard")}
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>

      </div>

      {/* ================= Main Container ================= */}

      <div className="notifications-container">

        <h1>
          <FaBell />
          Notifications
        </h1>

        <p>
          Stay updated with all ticket activities and system alerts.
        </p>

        {/* Notification 1 */}

        <div className="notification-card">

          <div className="notification-icon reply">

            <FaReply />

          </div>

          <div className="notification-content">

            <h3>Support Consultant Replied</h3>

            <p>
              Your support consultant has replied to your ticket.
            </p>

            <span>2 minutes ago</span>

          </div>

        </div>

        {/* Notification 2 */}

        <div className="notification-card">

          <div className="notification-icon progress">

            <FaClipboardCheck />

          </div>

          <div className="notification-content">

            <h3>Ticket Updated</h3>

            <p>
              Your ticket status has been changed to
              <strong> In Progress</strong>.
            </p>

            <span>1 hour ago</span>

          </div>

        </div>

                {/* ================= Notification 3 ================= */}

        <div className="notification-card">

          <div className="notification-icon success">

            <FaCheckCircle />

          </div>

          <div className="notification-content">

            <h3>Ticket Closed</h3>

            <p>
              Your support ticket has been resolved successfully.
            </p>

            <span>Yesterday</span>

          </div>

        </div>

        {/* ================= Notification 4 ================= */}

        <div className="notification-card">

          <div className="notification-icon new-ticket">

            <FaBell />

          </div>

          <div className="notification-content">

            <h3>New Ticket Created</h3>

            <p>
              Your support request has been submitted successfully.
              Our support team will review it shortly.
            </p>

            <span>2 days ago</span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Notifications;