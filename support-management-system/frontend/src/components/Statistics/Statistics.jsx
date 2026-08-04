import "./Statistics.css";
import {
  FaTicketAlt,
  FaSmile,
  FaUserTie,
  FaHeadset
} from "react-icons/fa";

function Statistics() {
  return (
    <section className="statistics">

      <div className="container">

        <div className="section-title">

          <h2>Our Achievements</h2>

          <p>
            Trusted by clients with fast, secure and reliable support services.
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <FaTicketAlt className="stat-icon" />
            <h3>500+</h3>
            <p>Tickets Resolved</p>
          </div>

          <div className="stat-card">
            <FaSmile className="stat-icon" />
            <h3>98%</h3>
            <p>Customer Satisfaction</p>
          </div>

          <div className="stat-card">
            <FaUserTie className="stat-icon" />
            <h3>50+</h3>
            <p>Professional Consultants</p>
          </div>

          <div className="stat-card">
            <FaHeadset className="stat-icon" />
            <h3>24/7</h3>
            <p>Support Available</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Statistics;