import "./TicketDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaPaperclip } from "react-icons/fa";

function TicketDetails() {

  const navigate = useNavigate();

  const { ticketId } = useParams();

  // Dummy Data
  const tickets = [

    {
      id: "TKT-1001",
      subject: "Login Issue",
      category: "Technical",
      priority: "High",
      status: "Open",
      date: "05 Aug 2026",
      description:
        "I am unable to login to my account after changing my password. Every time I enter my credentials, the system shows Invalid Email or Password."
    },

    {
      id: "TKT-1002",
      subject: "Payment Error",
      category: "Billing",
      priority: "Medium",
      status: "In Progress",
      date: "04 Aug 2026",
      description:
        "Payment has been deducted from my account but the subscription has not been activated."
    },

    {
      id: "TKT-1003",
      subject: "Password Reset",
      category: "Account",
      priority: "Low",
      status: "Closed",
      date: "03 Aug 2026",
      description:
        "Password reset link was not received initially but the issue has now been resolved."
    }

  ];

  const ticket = tickets.find(
    (item) => item.id === ticketId
  );

  if (!ticket) {

    return (

      <div className="ticket-details-page">

        <h2>Ticket Not Found</h2>

      </div>

    );

  }

  return (

    <div className="ticket-details-page">

      {/* Header */}

      <div className="page-header">

        <button
          className="back-btn"
          onClick={() => navigate("/my-tickets")}
        >

          <FaArrowLeft />

          <span>Back to My Tickets</span>

        </button>

      </div>

      {/* Main */}

      <div className="ticket-details-container">

        <h1>Ticket Details</h1>

        <p>

          Ticket Number :
          <strong> {ticket.id}</strong>

        </p>

        {/* Ticket Information */}

        <div className="details-card">

          <h2>Ticket Information</h2>

          <div className="info-grid">

            <div className="info-item">

              <strong>Subject</strong>

              <p>{ticket.subject}</p>

            </div>

            <div className="info-item">

              <strong>Category</strong>

              <p>{ticket.category}</p>

            </div>

            <div className="info-item">

              <strong>Priority</strong>

              <p>{ticket.priority}</p>

            </div>

            <div className="info-item">

              <strong>Status</strong>

              <p>{ticket.status}</p>

            </div>

            <div className="info-item">

              <strong>Created Date</strong>

              <p>{ticket.date}</p>

            </div>

          </div>

        </div>

        {/* Description */}

        <div className="details-card">

          <h2>Description</h2>

          <p>

            {ticket.description}

          </p>

        </div>

        {/* Attachment */}

        <div className="details-card">

          <h2>Attachment</h2>

          <div className="attachment-box">

            <FaPaperclip />

            <span>Screenshot_Login_Error.png</span>

          </div>

        </div>
                {/* ================= Current Status ================= */}

        <div className="details-card">

          <h2>Current Status</h2>

          <div className="status-box">

            {ticket.status === "Open" && (
              <p>
                🟢 Your ticket has been received and is waiting for a consultant.
              </p>
            )}

            {ticket.status === "In Progress" && (
              <p>
                🟡 A consultant is currently working on your issue.
                You will receive an update soon.
              </p>
            )}

            {ticket.status === "Closed" && (
              <p>
                🔵 This ticket has been successfully resolved and closed.
              </p>
            )}

          </div>

        </div>

        {/* ================= Conversation ================= */}

        <div className="details-card">

          <h2>Conversation with Support Team</h2>

          <div className="chat-box">

            <div className="message client">

              <strong>You</strong>

              <p>

                {ticket.description}

              </p>

              <span>{ticket.date} | 10:15 AM</span>

            </div>

            <div className="message consultant">

              <strong>Support Consultant</strong>

              <p>

                Thank you for contacting Support Management System.
                We have received your request and our team is reviewing your
                issue. We will update you shortly.

              </p>

              <span>{ticket.date} | 10:45 AM</span>

            </div>

          </div>

        </div>

        {/* ================= Timeline ================= */}

        <div className="details-card">

          <h2>Ticket Timeline</h2>

          <ul className="timeline">

            <li>

              ✅ Ticket Created

              <span>{ticket.date}</span>

            </li>

            <li>

              ✅ Assigned to Consultant

              <span>{ticket.date}</span>

            </li>

            <li>

              {ticket.status === "Closed"
                ? "✅ Ticket Closed"
                : "⏳ Issue Under Review"}

              <span>{ticket.date}</span>

            </li>

          </ul>

        </div>

        {/* ================= Reply ================= */}

        <div className="details-card">

          <h2>Reply to Support Team</h2>

          <textarea
            className="reply-box"
            rows="5"
            placeholder="Write your reply here..."
          ></textarea>

          <button className="reply-btn">

            Send Reply

          </button>

        </div>

      </div>

    </div>

  );

}

export default TicketDetails;