import "./Workflow.css";
import {
  FaUser,
  FaClipboardCheck,
  FaProjectDiagram,
  FaUserCog,
  FaCheckCircle
} from "react-icons/fa";

function Workflow() {
  return (
    <section className="workflow">

      <div className="container">

        <div className="section-title">

          <h2>How Our System Works</h2>

          <p>
            Follow these simple steps to resolve your support requests efficiently.
          </p>

        </div>

        <div className="workflow-grid">

          <div className="workflow-card">
            <FaUser className="workflow-icon" />
            <h3>1. Client</h3>
            <p>Create an account and submit a support request.</p>
          </div>

          <div className="workflow-card">
            <FaClipboardCheck className="workflow-icon" />
            <h3>2. Admin Review</h3>
            <p>Admin verifies the request and creates a support ticket.</p>
          </div>

          <div className="workflow-card">
            <FaProjectDiagram className="workflow-icon" />
            <h3>3. Project Manager</h3>
            <p>The ticket is assigned to the appropriate consultant.</p>
          </div>

          <div className="workflow-card">
            <FaUserCog className="workflow-icon" />
            <h3>4. Consultant</h3>
            <p>The consultant communicates with the client and resolves the issue.</p>
          </div>

          <div className="workflow-card">
            <FaCheckCircle className="workflow-icon" />
            <h3>5. Ticket Closed</h3>
            <p>After confirmation, the client or admin closes the ticket.</p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Workflow;