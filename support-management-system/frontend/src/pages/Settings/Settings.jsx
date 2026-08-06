import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Settings() {

  const navigate = useNavigate();

  return (

    <div className="settings-page">

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

      {/* Settings Container */}

      <div className="settings-container">

        <h1>Settings</h1>

        <p>
          Manage your account preferences, security settings and notification options.
        </p>

      </div>

    </div>

  );
}

export default Settings;