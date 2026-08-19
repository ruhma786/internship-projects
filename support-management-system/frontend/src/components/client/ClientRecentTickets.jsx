import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaTicketAlt,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";

import "./ClientRecentTickets.css";


const recentTickets = [
  {
    id: "SUP-1048",
    subject: "Payment page is not working",
    priority: "High",
    status: "Pending Review",
    date: "Aug 10, 2026",
  },

  {
    id: "SUP-1049",
    subject: "Unable to login",
    priority: "Medium",
    status: "In Progress",
    date: "Aug 10, 2026",
  },

  {
    id: "SUP-1050",
    subject: "Email notifications not working",
    priority: "Medium",
    status: "Resolved",
    date: "Aug 09, 2026",
  },

  {
    id: "SUP-1051",
    subject: "Dashboard loading issue",
    priority: "Low",
    status: "In Progress",
    date: "Aug 09, 2026",
  },
];


export default function ClientRecentTickets() {

  const navigate = useNavigate();


  // ============================================
  // OPEN TICKET DETAIL
  // ============================================

  const handleViewTicket = (ticketId) => {

    navigate(`/client/tickets/${ticketId}`);

  };


  // ============================================
  // STATUS ICON
  // ============================================

  const getStatusIcon = (status) => {

    if (status === "In Progress") {
      return <FaSpinner />;
    }

    if (status === "Resolved") {
      return <FaCheckCircle />;
    }

    return <FaClock />;
  };


  return (

    <section className="client-recent-tickets-card">


      {/* =========================================
          HEADER
      ========================================= */}

      <div className="client-recent-section-header">

        <div className="client-recent-header-content">

         {/* <span className="client-recent-section-label">
            MY SUPPORT ACTIVITY
          </span>*/}

          <h2>
            Recent Tickets
          </h2>

          <p>
            View the latest support requests submitted by you.
          </p>

        </div>


        <button
          type="button"
          className="client-view-all-btn"
          onClick={() => navigate("/client/tickets")}
        >

          <span>
            View All Tickets
          </span>

          <FaArrowRight />

        </button>

      </div>



      {/* =========================================
          TABLE HEADER
      ========================================= */}

      <div className="client-recent-tickets-heading">

        <span>
          TICKET
        </span>

        <span>
          SUBJECT
        </span>

        <span>
          PRIORITY
        </span>

        <span>
          STATUS
        </span>

        <span>
          DATE
        </span>

        <span>
          ACTION
        </span>

      </div>



      {/* =========================================
          TICKET LIST
      ========================================= */}

      <div className="client-recent-tickets-list">

        {recentTickets.map((ticket) => (

          <div
            className="client-recent-ticket-row"
            key={ticket.id}
          >


            {/* =================================
                TICKET
            ================================= */}

            <div className="client-recent-ticket-id">

              <div className="client-ticket-icon-box">
                <FaTicketAlt />
              </div>

              <div>

                <strong>
                  #{ticket.id}
                </strong>

                <span>
                  My Support Ticket
                </span>

              </div>

            </div>



            {/* =================================
                SUBJECT
            ================================= */}

            <div className="client-recent-ticket-subject">

              <h3>
                {ticket.subject}
              </h3>

              <span>
                Support Request
              </span>

            </div>



            {/* =================================
                PRIORITY
            ================================= */}

            <span
              className={`client-ticket-priority ${ticket.priority.toLowerCase()}`}
            >

              {ticket.priority}

            </span>



            {/* =================================
                STATUS
            ================================= */}

            <span
              className={`client-ticket-status ${ticket.status
                .toLowerCase()
                .replaceAll(" ", "-")}`}
            >

              {getStatusIcon(ticket.status)}

              {ticket.status}

            </span>



            {/* =================================
                DATE
            ================================= */}

            <span className="client-ticket-date">

              {ticket.date}

            </span>



            {/* =================================
                VIEW BUTTON
            ================================= */}

            <button
              type="button"
              className="client-recent-view-btn"
              onClick={() =>
                handleViewTicket(ticket.id)
              }
            >

              View

            </button>

          </div>

        ))}

      </div>


    </section>

  );
}