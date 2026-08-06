import "./MyTickets.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function MyTickets() {

  const navigate = useNavigate();

  return (

    <div className="mytickets-page">

      {/* ================= Back Button ================= */}

      <div className="page-header">

        <button
          className="back-btn"
          onClick={() => navigate("/client-dashboard")}
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>

      </div>

      {/* ================= Main Container ================= */}

      <div className="tickets-container">

        <h1>My Tickets</h1>

        <p>
          View, track and manage all your submitted support tickets.
        </p>

        {/* ================= Ticket Summary ================= */}

        <div className="ticket-summary">

          <div className="summary-card total">
            <h2>12</h2>
            <p>Total Tickets</p>
          </div>

          <div className="summary-card open">
            <h2>5</h2>
            <p>Open</p>
          </div>

          <div className="summary-card progress">
            <h2>4</h2>
            <p>In Progress</p>
          </div>

          <div className="summary-card closed">
            <h2>3</h2>
            <p>Closed</p>
          </div>

        </div>

        {/* ================= Search & Filter ================= */}

        <div className="ticket-toolbar">

          <input
            type="text"
            placeholder="Search Ticket..."
            className="search-box"
          />

          <select className="filter-box">

            <option>All Status</option>
            <option>Open</option>
            <option>In Progress</option>
            <option>Closed</option>

          </select>

        </div>

        {/* ================= Ticket Table ================= */}

        <table className="ticket-table">

          <thead>

            <tr>

              <th>Ticket ID</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Action</th>

            </tr>

          </thead>

          <tbody>
                        {/* ================= Ticket 1 ================= */}

            <tr>

              <td>TKT-1001</td>

              <td>Login Issue</td>

              <td>Technical</td>

              <td>
                <span className="priority high">
                  High
                </span>
              </td>

              <td>
                <span className="status open">
                  Open
                </span>
              </td>

              <td>05 Aug 2026</td>

              <td>

                <button
                  className="view-btn"
                  onClick={() => navigate("/ticket-details/TKT-1001")}
                  
                >
                  View
                </button>

              </td>

            </tr>

            {/* ================= Ticket 2 ================= */}

            <tr>

              <td>TKT-1002</td>

              <td>Payment Error</td>

              <td>Billing</td>

              <td>
                <span className="priority medium">
                  Medium
                </span>
              </td>

              <td>
                <span className="status progress">
                  In Progress
                </span>
              </td>

              <td>04 Aug 2026</td>

              <td>

                <button
                  className="view-btn"
                  onClick={() => navigate("/ticket-details/TKT-1002")}
                  
                >
                  View
                </button>

              </td>

            </tr>

            {/* ================= Ticket 3 ================= */}

            <tr>

              <td>TKT-1003</td>

              <td>Password Reset</td>

              <td>Account</td>

              <td>
                <span className="priority low">
                  Low
                </span>
              </td>

              <td>
                <span className="status closed">
                  Closed
                </span>
              </td>

              <td>03 Aug 2026</td>

              <td>

                <button
                  className="view-btn"
                  onClick={() => navigate("/ticket-details/TKT-1003")}
                >
                  View
                </button>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default MyTickets;
        