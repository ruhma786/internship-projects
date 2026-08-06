import "./CreateTicket.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

function CreateTicket() {
  const navigate = useNavigate();

  return (
    <div className="create-ticket-page">

      {/* Back Button */}
      <div className="page-header">
        <button
          className="back-btn"
          onClick={() => navigate("/client-dashboard")}
        >
          <FaArrowLeft />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="ticket-container">

        <h1>Create New Support Ticket</h1>

        <p>
          Fill out the form below to submit your support request.
          Our support team will review your ticket and respond as soon as possible.
        </p>

        <form className="ticket-form">

          {/* Ticket Title */}
          <div className="form-group">
            <label>Ticket Title</label>
            <input
              type="text"
              placeholder="Enter ticket title"
            />
          </div>

          {/* Category */}
          <div className="form-group">
            <label>Category</label>

            <select>
              <option>Select Category</option>
              <option>Login Issue</option>
              <option>Password Reset</option>
              <option>Technical Issue</option>
              <option>Bug Report</option>
              <option>Payment Issue</option>
              <option>Feature Request</option>
              <option>Other</option>
            </select>

          </div>

          {/* Description */}
          <div className="form-group">

            <label>Description</label>

            <textarea
              rows="6"
              placeholder="Describe your issue..."
            ></textarea>

          </div>

          {/* Priority */}
          <div className="form-group">

            <label>Priority</label>

            <div className="priority-options">

              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                />
                Low
              </label>

              <label>
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                />
                Medium
              </label>

              <label>
                <input
                  type="radio"
                  name="priority"
                  value="High"
                />
                High
              </label>

            </div>

          </div>

          {/* Attachment */}
          <div className="form-group">

            <label>Attachment</label>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />

          </div>

          {/* Preferred Contact */}
          <div className="form-group">

            <label>Preferred Contact</label>

            <div className="contact-options">

              <label>
                <input
                  type="radio"
                  name="contact"
                  value="Email"
                />
                Email
              </label>

              <label>
                <input
                  type="radio"
                  name="contact"
                  value="Phone"
                />
                Phone
              </label>

            </div>

          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="submit-ticket-btn"
          >
            Submit Ticket
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateTicket;