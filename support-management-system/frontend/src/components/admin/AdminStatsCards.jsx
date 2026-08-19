import React from "react";
import {
  FaTicketAlt,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Tickets",
    value: 248,
    icon: <FaTicketAlt />,
    className: "total",
  },
  {
    title: "Pending Review",
    value: 32,
    icon: <FaClock />,
    className: "pending",
  },
  {
    title: "In Progress",
    value: 76,
    icon: <FaSpinner />,
    className: "progress",
  },
  {
    title: "Resolved Tickets",
    value: 140,
    icon: <FaCheckCircle />,
    className: "resolved",
  },
];

function AdminStatsCards() {
  return (
    <div className="stats-grid">

      {stats.map((stat) => (
        <div
          className={`stat-card ${stat.className}`}
          key={stat.title}
        >

          <div className="stat-content">
            <p>{stat.title}</p>
            <h2>{stat.value}</h2>
          </div>

          <div className="stat-icon">
            {stat.icon}
          </div>

        </div>
      ))}

    </div>
  );
}

export default AdminStatsCards;