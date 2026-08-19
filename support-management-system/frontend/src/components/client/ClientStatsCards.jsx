import React from "react";
import {
  FaTicketAlt,
  FaFolderOpen,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

import "./ClientStatsCards.css";

const stats = [
  {
    title: "Total Tickets",
    value: 24,
    icon: <FaTicketAlt />,
    className: "total",
  },
  {
    title: "Open Tickets",
    value: 8,
    icon: <FaFolderOpen />,
    className: "open",
  },
  {
    title: "In Progress",
    value: 6,
    icon: <FaSpinner />,
    className: "progress",
  },
  {
    title: "Resolved Tickets",
    value: 10,
    icon: <FaCheckCircle />,
    className: "resolved",
  },
];

function ClientStatsCards() {
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

export default ClientStatsCards;