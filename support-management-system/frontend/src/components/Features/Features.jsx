import "./Features.css";
import {
  FaTicketAlt,
  FaUsers,
  FaComments,
  FaChartLine
} from "react-icons/fa";

function Features() {
  return (
    <section className="features">

      <div className="container">

        <div className="section-title">

          <h2>Our Features</h2>

          <p>
            Everything you need to manage support tickets
            efficiently and professionally.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <FaTicketAlt className="feature-icon"/>

            <h3>Ticket Management</h3>

            <p>
              Create, update and track support tickets easily.
            </p>

          </div>

          <div className="feature-card">

            <FaUsers className="feature-icon"/>

            <h3>Role Based Access</h3>

            <p>
              Separate dashboards for Clients,
              Admins, Project Managers and Consultants.
            </p>

          </div>

          <div className="feature-card">

            <FaComments className="feature-icon"/>

            <h3>Live Communication</h3>

            <p>
              Chat with consultants directly from your tickets.
            </p>

          </div>

          <div className="feature-card">

            <FaChartLine className="feature-icon"/>

            <h3>Reports & Analytics</h3>

            <p>
              Monitor ticket status and support performance.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Features;