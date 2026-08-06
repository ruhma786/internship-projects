import "./DashboardCards.css";
import {
  FaTicketAlt,
  FaClock,
  FaSpinner,
  FaCheckCircle
} from "react-icons/fa";

function DashboardCards() {

  return (

    <div className="dashboard-cards">

      <div className="dashboard-card">

        <div className="card-icon total">
          <FaTicketAlt />
        </div>

        <div className="card-info">
          <h2>12</h2>
          <p>Total Tickets</p>
        </div>

      </div>

      <div className="dashboard-card">

        <div className="card-icon open">
          <FaClock />
        </div>

        <div className="card-info">
          <h2>5</h2>
          <p>Open Tickets</p>
        </div>

      </div>

      <div className="dashboard-card">

        <div className="card-icon progress">
          <FaSpinner />
        </div>

        <div className="card-info">
          <h2>4</h2>
          <p>In Progress</p>
        </div>

      </div>

      <div className="dashboard-card">

        <div className="card-icon closed">
          <FaCheckCircle />
        </div>

        <div className="card-info">
          <h2>3</h2>
          <p>Closed Tickets</p>
        </div>

      </div>

    </div>

  );

}

export default DashboardCards;