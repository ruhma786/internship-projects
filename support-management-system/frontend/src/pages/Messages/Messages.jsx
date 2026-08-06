import "./Messages.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Messages() {

  const navigate = useNavigate();

  return (

    <div className="messages-page">

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

      {/* Page Content */}

      <div className="messages-container">

        <h1>Messages</h1>

        <p>
          Communicate with the support team and view all your conversations.
        </p>

      </div>

    </div>

  );
}

export default Messages;