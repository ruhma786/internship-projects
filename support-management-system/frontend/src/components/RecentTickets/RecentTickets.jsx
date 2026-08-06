import "./RecentTickets.css";

function RecentTickets() {
  return (
    <div className="recent-tickets">

      <div className="table-header">
        <h2>Recent Tickets</h2>

        <button className="view-all-btn">
          View All
        </button>
      </div>

      <table>

        <thead>

          <tr>
            <th>Ticket ID</th>
            <th>Subject</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          <tr>

            <td>#TKT101</td>

            <td>Unable to Login</td>

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

            <td>29 Jul 2026</td>

            <td>

              <button className="table-btn">
                View
              </button>

            </td>

          </tr>

          <tr>

            <td>#TKT102</td>

            <td>Password Reset</td>

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

            <td>28 Jul 2026</td>

            <td>

              <button className="table-btn">
                View
              </button>

            </td>

          </tr>

          <tr>

            <td>#TKT103</td>

            <td>Website Error</td>

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

            <td>26 Jul 2026</td>

            <td>

              <button className="table-btn">
                View
              </button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>
  );
}

export default RecentTickets;