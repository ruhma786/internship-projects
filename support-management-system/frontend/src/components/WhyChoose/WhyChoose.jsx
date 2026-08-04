import "./WhyChoose.css";
import {
  FaUserShield,
  FaClock,
  FaBell,
  FaLaptopCode
} from "react-icons/fa";

function WhyChoose() {
  return (
    <section className="why-section">

      <div className="container">

        <div className="section-title">

          <h2>Why Choose Us?</h2>

          <p>
            Our Support Management System provides a secure,
            fast and professional way to manage support requests.
          </p>

        </div>

        <div className="why-grid">

          <div className="why-card">

            <FaUserShield className="why-icon"/>

            <h3>Secure System</h3>

            <p>
              User authentication with role-based access for maximum security.
            </p>

          </div>

          <div className="why-card">

            <FaClock className="why-icon"/>

            <h3>Fast Response</h3>

            <p>
              Reduce response time with efficient ticket assignment.
            </p>

          </div>

          <div className="why-card">

            <FaBell className="why-icon"/>

            <h3>Real-Time Notifications</h3>

            <p>
              Receive instant updates whenever your ticket status changes.
            </p>

          </div>

          <div className="why-card">

            <FaLaptopCode className="why-icon"/>

            <h3>Easy Management</h3>

            <p>
              Manage clients, consultants, projects and tickets from one dashboard.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;