import React from "react";

import {
  FaTicketAlt,
  FaClock,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";

import "./ProjectManagerStatsCards.css";


const stats = [
  {
    title: "Assigned Tickets",
    value: 32,
    icon: <FaTicketAlt />,
    className: "assigned",
  },

  {
    title: "Pending Review",
    value: 8,
    icon: <FaClock />,
    className: "pending",
  },

  {
    title: "In Progress",
    value: 15,
    icon: <FaSpinner />,
    className: "progress",
  },

  {
    title: "Resolved Tickets",
    value: 9,
    icon: <FaCheckCircle />,
    className: "resolved",
  },
];


function ProjectManagerStatsCards() {

  return (

    <div className="stats-grid">

      {stats.map((stat) => (

        <div
          className={`stat-card ${stat.className}`}
          key={stat.title}
        >

          {/* Card Content */}
          <div className="stat-content">

            <p>
              {stat.title}
            </p>

            <h2>
              {stat.value}
            </h2>

          </div>


          {/* Card Icon */}
          <div className="stat-icon">

            {stat.icon}

          </div>

        </div>

      ))}

    </div>

  );
}


export default ProjectManagerStatsCards;