import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaCog } from "react-icons/fa";

function Settings() {

  const navigate = useNavigate();

  return (

    <div className="settings-page">

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

      {/* ================= Container ================= */}

      <div className="settings-container">

        <h1>

          <FaCog />

          Settings

        </h1>

        <p>
          Manage your account preferences and security settings.
        </p>

        {/* ================= Notifications ================= */}

        <div className="setting-group">

          <h3>Notification Preferences</h3>

          <label>

            <input type="checkbox" defaultChecked />

            Email Notifications

          </label>

          <label>

            <input type="checkbox" />

            SMS Notifications

          </label>

        </div>

        {/* ================= Language ================= */}

        <div className="setting-group">

          <h3>Language</h3>

          <select>

            <option>English</option>

            <option>Urdu</option>

          </select>

        </div>

                {/* ================= Change Password ================= */}

        <div className="setting-group">

          <h3>Change Password</h3>

          <input
            type="password"
            placeholder="Enter New Password"
          />

          <input
            type="password"
            placeholder="Confirm New Password"
          />

        </div>

        {/* ================= Buttons ================= */}

        <div className="settings-buttons">

          <button
            type="button"
            className="save-btn"
          >
            Save Settings
          </button>

          <button
            type="button"
            className="logout-btn"
            onClick={() => navigate("/login")}
          >
            Logout
          </button>

        </div>

      </div>

    </div>

  );

}

export default Settings;