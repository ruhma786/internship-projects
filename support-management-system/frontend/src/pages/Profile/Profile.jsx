import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUserCircle } from "react-icons/fa";

function Profile() {

  const navigate = useNavigate();

  return (

    <div className="profile-page">

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

      {/* ================= Profile Container ================= */}

      <div className="profile-container">

        <h1>My Profile</h1>

        <p>
          View and manage your personal information.
        </p>

        {/* ================= Profile Picture ================= */}

        <div className="profile-image">

          <FaUserCircle />

        </div>

        {/* ================= Profile Form ================= */}

        <form className="profile-form">

          <div className="form-group">

            <label>Full Name</label>

            <input
              type="text"
              defaultValue="Ruhma Zulfiqar"
            />

          </div>

          <div className="form-group">

            <label>Email Address</label>

            <input
              type="email"
              defaultValue="ruhma@email.com"
            />

          </div>

          <div className="form-group">

            <label>Phone Number</label>

            <input
              type="text"
              defaultValue="03XX-XXXXXXX"
            />

          </div>

          <div className="form-group">

            <label>Address</label>

            <input
              type="text"
              defaultValue="Vehari, Pakistan"
            />

          </div>

          <div className="form-group">

            <label>Company</label>

            <input
              type="text"
              defaultValue="Support Management System"
            />

          </div>
                    {/* ================= Buttons ================= */}

          <div className="profile-buttons">

            <button
              type="button"
              className="edit-btn"
            >
              Edit Profile
            </button>

            <button
              type="submit"
              className="save-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default Profile;