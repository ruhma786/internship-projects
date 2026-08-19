import "./Messages.css";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

function Messages() {

  const navigate = useNavigate();

  return (

    <div className="messages-page">

      {/* ================= Page Header ================= */}

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

      <div className="messages-container">

        <h1>Messages</h1>

        <p>
          Chat with your assigned support consultant regarding your support ticket.
        </p>

        {/* ================= Chat Box ================= */}

        <div className="chat-box">

          {/* Consultant Message */}

          <div className="message consultant">

            <div className="message-info">

              <strong>Support Consultant</strong>

            </div>

            <div className="message-bubble">

              Hello! 👋
              How can I help you today?

            </div>

          </div>

          {/* Client Message */}

          <div className="message client">

            <div className="message-info">

              <strong>You</strong>

            </div>

            <div className="message-bubble">

              I am unable to login to my account.

            </div>

          </div>

          {/* Consultant */}

          <div className="message consultant">

            <div className="message-info">

              <strong>Support Consultant</strong>

            </div>

            <div className="message-bubble">

              Can you please share the error message?

            </div>

          </div>

          {/* Client */}

          <div className="message client">

            <div className="message-info">

              <strong>You</strong>

            </div>

            <div className="message-bubble">

              It says "Invalid Email or Password".

            </div>

          </div>
                    {/* ================= Message Input ================= */}

          <div className="chat-input">

            <input
              type="text"
              placeholder="Type your message..."
            />

            <button className="send-btn">

              <FaPaperPlane />

              <span>Send</span>

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Messages;