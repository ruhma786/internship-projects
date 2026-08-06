import "./ProfileSummary.css";
import { FaUserCircle, FaEnvelope, FaPhone, FaTicketAlt } from "react-icons/fa";

function ProfileSummary() {
  return (
    <div className="profile-summary">

      <h2>My Profile</h2>

      <div className="profile-card">

        <div className="profile-image">
          <FaUserCircle />
        </div>

        <h3>Ali Hassan</h3>

        <p className="role">Client</p>

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

        <button className="edit-profile-btn">
          Edit Profile
        </button>

      </div>

    </div>
  );
}

export default ProfileSummary;