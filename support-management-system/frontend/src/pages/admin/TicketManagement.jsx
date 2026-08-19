import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaEye,
  FaSearch,
  FaFilter,
  FaTicketAlt,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

import "./TicketManagement.css";


/* =====================================================
   TICKET DATA
   Temporary frontend data.
   Later this will come from MongoDB API.
===================================================== */

const initialTickets = [
  {
    id: "SUP-1048",
    subject: "Payment page is not working",
    client: "Sarah Ahmed",
    email: "sarah.ahmed@gmail.com",
    category: "Payment",
    priority: "High",
    status: "Pending Review",
    date: "Aug 10, 2026",
    description:
      "The client is unable to complete the payment. The payment page keeps loading after entering card information.",
  },

  {
    id: "SUP-1047",
    subject: "Unable to login to account",
    client: "Ali Raza",
    email: "ali.raza@gmail.com",
    category: "Account",
    priority: "Medium",
    status: "Pending Review",
    date: "Aug 10, 2026",
    description:
      "The client is unable to login to the account even though the correct email and password are being used.",
  },

  {
    id: "SUP-1046",
    subject: "Email notification not received",
    client: "Hina Malik",
    email: "hina.malik@gmail.com",
    category: "Notification",
    priority: "Low",
    status: "Pending Review",
    date: "Aug 09, 2026",
    description:
      "The client is not receiving email notifications after submitting a support request.",
  },

  {
    id: "SUP-1045",
    subject: "Dashboard loading slowly",
    client: "Usman Tariq",
    email: "usman.tariq@gmail.com",
    category: "Performance",
    priority: "High",
    status: "Approved",
    date: "Aug 09, 2026",
    description:
      "The client reports that the dashboard takes a long time to load after login.",
  },

  {
    id: "SUP-1044",
    subject: "Profile information update issue",
    client: "Ayesha Malik",
    email: "ayesha.malik@gmail.com",
    category: "Profile",
    priority: "Medium",
    status: "Rejected",
    date: "Aug 08, 2026",
    description:
      "The client is unable to update profile information from the account settings.",
  },
];


/* =====================================================
   COMPONENT
===================================================== */

function TicketManagement() {

  const navigate = useNavigate();

  const [tickets, setTickets] = useState(initialTickets);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

    /* =====================================================
     FILTER TICKETS
  ===================================================== */

  const filteredTickets = tickets.filter((ticket) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch =
      ticket.id.toLowerCase().includes(search) ||
      ticket.subject.toLowerCase().includes(search) ||
      ticket.client.toLowerCase().includes(search) ||
      ticket.category.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "All" ||
      ticket.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      ticket.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );

  });


  /* =====================================================
     STATISTICS
  ===================================================== */

  const totalTickets = tickets.length;

  const pendingTickets = tickets.filter(
    (ticket) => ticket.status === "Pending Review"
  ).length;

  const approvedTickets = tickets.filter(
    (ticket) => ticket.status === "Approved"
  ).length;

  const highPriorityTickets = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;


  /* =====================================================
     DYNAMIC VIEW FUNCTION
  ===================================================== */

  const handleViewTicket = (ticketId) => {

    navigate(`/tickets/${ticketId}`);

  };


  /* =====================================================
     RESET FILTERS
  ===================================================== */

  const handleResetFilters = () => {

    setSearchTerm("");

    setStatusFilter("All");

    setPriorityFilter("All");

  };


  /* =====================================================
     PAGE
  ===================================================== */

  return (

    <main className="ticket-management-page">


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="ticket-page-header">


        <button
          type="button"
          className="ticket-back-btn"
          onClick={() => navigate("/admin-dashboard")}
        >

          <FaArrowLeft />

          Back to Dashboard

        </button>


        <div className="ticket-heading">

          <div>

            <span className="ticket-label">
          
            </span>

            <h1>
              Ticket Management
            </h1>

            <p>
              Review, verify and manage client support requests.
            </p>

          </div>


          <div className="ticket-header-icon">

            <FaTicketAlt />

          </div>

        </div>

      </div>


      {/* =================================================
          STATISTICS
      ================================================= */}

      <section className="ticket-stat-grid">


        <div className="ticket-stat-card">

          <div className="ticket-stat-icon total">

            <FaTicketAlt />

          </div>

          <div>

            <span>
              Total Tickets
            </span>

            <strong>
              {totalTickets}
            </strong>

          </div>

        </div>


        <div className="ticket-stat-card">

          <div className="ticket-stat-icon pending">

            <FaClock />

          </div>

          <div>

            <span>
              Pending Review
            </span>

            <strong>
              {pendingTickets}
            </strong>

          </div>

        </div>


        <div className="ticket-stat-card">

          <div className="ticket-stat-icon approved">

            <FaCheckCircle />

          </div>

          <div>

            <span>
              Approved
            </span>

            <strong>
              {approvedTickets}
            </strong>

          </div>

        </div>


        <div className="ticket-stat-card">

          <div className="ticket-stat-icon high">

            <FaExclamationCircle />

          </div>

          <div>

            <span>
              High Priority
            </span>

            <strong>
              {highPriorityTickets}
            </strong>

          </div>

        </div>

      </section>


      {/* =================================================
          FILTER BAR
      ================================================= */}

      <section className="ticket-filter-card">


        <div className="ticket-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search ticket, client, category..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />

        </div>


        <div className="ticket-filter">

          <FaFilter />

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(event.target.value)
            }
          >

            <option value="All">
              All Status
            </option>

            <option value="Pending Review">
              Pending Review
            </option>

            <option value="Approved">
              Approved
            </option>

            <option value="Rejected">
              Rejected
            </option>

          </select>

        </div>


        <div className="ticket-filter">

          <select
            value={priorityFilter}
            onChange={(event) =>
              setPriorityFilter(event.target.value)
            }
          >

            <option value="All">
              All Priority
            </option>

            <option value="High">
              High
            </option>

            <option value="Medium">
              Medium
            </option>

            <option value="Low">
              Low
            </option>

          </select>

        </div>


        <button
          type="button"
          className="reset-filter-btn"
          onClick={handleResetFilters}
        >
          Reset
        </button>

      </section>
            {/* =================================================
          TICKET TABLE
      ================================================= */}

      <section className="ticket-table-card">


        <div className="ticket-table-header">

          <div>

            <h2>
              Support Tickets
            </h2>

            <p>
              {filteredTickets.length} ticket
              {filteredTickets.length !== 1 ? "s" : ""} found
            </p>

          </div>

        </div>


        <div className="ticket-table-wrapper">

          <table className="ticket-table">

            <thead>

              <tr>

                <th>
                  Ticket ID
                </th>

                <th>
                  Client
                </th>

                <th>
                  Subject
                </th>

                <th>
                  Category
                </th>

                <th>
                  Priority
                </th>

                <th>
                  Status
                </th>

                <th>
                  Date
                </th>

                <th>
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredTickets.length > 0 ? (

                filteredTickets.map((ticket) => (

                  <tr key={ticket.id}>


                    {/* Ticket ID */}

                    <td>

                      <span className="ticket-id">
                        {ticket.id}
                      </span>

                    </td>


                    {/* Client */}

                    <td>

                      {/* Client */}
  <td className="client-column">
    <div className="client-cell">

        <strong className="client-name">
            {ticket.client}
        </strong>

        <span className="client-email">
            {ticket.email}
        </span>

    </div>
  </td>
                    </td>


                    {/* Subject */}

                    <td>

                      <span className="ticket-subject">
                        {ticket.subject}
                      </span>

                    </td>


                    {/* Category */}

                    <td>

                      <span className="category-badge">
                        {ticket.category}
                      </span>

                    </td>


                    {/* Priority */}

                    <td>

                      <span
                        className={`priority-badge ${ticket.priority.toLowerCase()}`}
                      >
                        {ticket.priority}
                      </span>

                    </td>


                    {/* Status */}

                    <td>

                      <span
                        className={`status-badge ${
                          ticket.status
                            .toLowerCase()
                            .replace(/\s+/g, "-")
                        }`}
                      >
                        {ticket.status}
                      </span>

                    </td>


                    {/* Date */}

                    <td>

                      <span className="ticket-date">
                        {ticket.date}
                      </span>

                    </td>


                    {/* Dynamic View */}

                    <td>

                      <button
                        type="button"
                        className="view-ticket-btn"
                        onClick={() =>
                          handleViewTicket(ticket.id)
                        }
                      >

                        <FaEye />

                        View

                      </button>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="8"
                    className="no-tickets"
                  >

                    <FaTicketAlt />

                    <strong>
                      No tickets found
                    </strong>

                    <span>
                      Try changing your search or filters.
                    </span>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>


    </main>

  );

}


export default TicketManagement;