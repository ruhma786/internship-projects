import "./adminStats.css";
import {
  FaTicketAlt,
  FaClock,
  FaSpinner,
  FaCheckCircle
} from "react-icons/fa";

function AdminStats() {

  const stats = [
    {
      title: "Total Tickets",
      value: "156",
      icon: <FaTicketAlt />,
      text: "All support tickets"
    },
    {
      title: "Pending Review",
      value: "18",
      icon: <FaClock />,
      text: "Waiting for admin review"
    },
    {
      title: "In Progress",
      value: "42",
      icon: <FaSpinner />,
      text: "Currently being handled"
    },
    {
      title: "Resolved Tickets",
      value: "96",
      icon: <FaCheckCircle />,
      text: "Successfully resolved"
    }
  ];

  return (
    <div className="admin-stats">

      {stats.map((stat, index) => (

        <div className="admin-stat-card" key={index}>

          <div className="stat-icon">
            {stat.icon}
          </div>

          <div className="stat-content">

            <p>{stat.title}</p>

            <h2>{stat.value}</h2>

            <span>{stat.text}</span>

          </div>

        </div>

      ))}

    </div>
  );
}

export default AdminStats;