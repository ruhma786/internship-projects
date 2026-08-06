import "./Notifications.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Notifications() {

  const navigate = useNavigate();

  return (

    <div className="notifications-page">

      {/* Back Button */}

      <div className="page-header">

        <button
          className="back-btn"
          onClick={() => navigate("/client-dashboard")}
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>

      </div>

      {/* Notifications Container */}

      <div className="notifications-container">

        <h1>Notifications</h1>

        <p>
          Stay updated with your latest ticket activities, messages and important announcements.
        </p>

      </div>

    </div>

  );
}

export default Notifications;