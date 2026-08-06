import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function Profile() {

  const navigate = useNavigate();

  return (

    <div className="profile-page">

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

      {/* Profile Container */}

      <div className="profile-container">

        <h1>My Profile</h1>

        <p>
          View and manage your personal information and account settings.
        </p>

      </div>

    </div>

  );
}

export default Profile;