import "./ProfileSummary.css";
import { useNavigate } from "react-router-dom";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaTicketAlt,
} from "react-icons/fa";

function ProfileSummary() {

  const navigate = useNavigate();

  return (

    <div className="profile-summary">

      <h2>My Profile</h2>

      <div className="profile-card">

        {/* Profile Image */}

        <div className="profile-image">

          <FaUserCircle />

        </div>

        {/* Choose Image */}

        <div className="choose-image">

          <input
            type="file"
            id="profile-upload"
            accept="image/*"
          />

          <label htmlFor="profile-upload">
            Choose Image
          </label>

        </div>

        {/* User Name */}

        <h3>Ali Hassan</h3>

        <p className="role">
          Client
        </p>

        {/* Profile Information */}

        <div className="profile-info">

          <div className="info-item">

            <FaEnvelope />

            <span>alihassan@gmail.com</span>

          </div>

          <div className="info-item">

            <FaPhone />

            <span>+92 300 1234567</span>

          </div>

          <div className="info-item">

            <FaTicketAlt />

            <span>Total Tickets : 12</span>

          </div>

        </div>

        {/* Edit Button */}

        <button
          className="edit-profile-btn"
          onClick={() => navigate("/profile")}
        >
          Edit Profile
        </button>

      </div>

    </div>

  );
}

export default ProfileSummary;