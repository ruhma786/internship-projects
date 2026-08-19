import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaArrowLeft,
  FaUserTie,
  FaTicketAlt,
  FaUser,
  FaEnvelope,
  FaCalendarAlt,
  FaFlag,
  FaCheckCircle,
  FaClipboardList,
  FaChevronDown,
} from "react-icons/fa";

import "./ProjectManagerAssignment.css";



/* =====================================================
   SAMPLE TICKET DATA
===================================================== */

const tickets = {
  "SUP-1048": {
    id: "SUP-1048",
    subject: "Payment page is not working",
    client: "Sarah Ahmed",
    email: "sarah.ahmed@gmail.com",
    category: "Payment",
    priority: "High",
    date: "Aug 10, 2026",

    description:
      "The client is unable to complete the payment. The payment page keeps loading after entering card information and the transaction is not completed.",
  },

  "SUP-1047": {
    id: "SUP-1047",
    subject: "Unable to login to account",
    client: "Ali Raza",
    email: "ali.raza@gmail.com",
    category: "Account",
    priority: "Medium",
    date: "Aug 10, 2026",

    description:
      "The client is unable to login to the account even though the correct email and password are being used.",
  },
};


/* =====================================================
   PROJECT MANAGERS
===================================================== */

const projectManagers = [
  {
    id: "PM001",
    name: "Ahmed Khan",
    email: "ahmed.khan@supportsystem.com",
    projects: 8,
    availability: "Available",
  },

  {
    id: "PM002",
    name: "Maria Ali",
    email: "maria.ali@supportsystem.com",
    projects: 5,
    availability: "Available",
  },

  {
    id: "PM003",
    name: "Usman Tariq",
    email: "usman.tariq@supportsystem.com",
    projects: 11,
    availability: "Busy",
  },

  {
    id: "PM004",
    name: "Ayesha Malik",
    email: "ayesha.malik@supportsystem.com",
    projects: 6,
    availability: "Available",
  },
];


/* =====================================================
   COMPONENT
===================================================== */

function ProjectManagerAssignment() {

  const navigate = useNavigate();

  const { ticketId } = useParams();

  const ticket = tickets[ticketId] || tickets["SUP-1048"];


  const [selectedManager, setSelectedManager] = useState("");

  const [assignmentNotes, setAssignmentNotes] = useState("");

  const [assigned, setAssigned] = useState(false);


  /* =====================================================
     ASSIGN PROJECT MANAGER
  ===================================================== */

  const handleAssign = (event) => {

    event.preventDefault();

    if (!selectedManager) {

      alert("Please select a Project Manager.");

      return;
    }

    setAssigned(true);

  };


  const selectedManagerData = projectManagers.find(
    (manager) => manager.id === selectedManager
  );


  return (

    <main className="pm-assignment-page">


      {/* =================================================
          PAGE HEADER
      ================================================= */}

      <div className="pm-page-header">


        <button
          type="button"
          className="pm-back-btn"
          onClick={() =>
            navigate(`/tickets/${ticket.id}`)
          }
        >

          <FaArrowLeft />

          Back to Ticket Details

        </button>


        <div className="pm-heading">

          <div>

            <span className="pm-label">
              TICKET WORKFLOW
            </span>

            <h1>
              Project Manager Assignment
            </h1>

            <p>
              Assign an appropriate Project Manager to coordinate this support request.
            </p>

          </div>


          <div className="pm-ticket-badge">

            <FaTicketAlt />

            #{ticket.id}

          </div>

        </div>

      </div>


      {/* =================================================
          ASSIGNMENT CONTENT
      ================================================= */}

      <div className="pm-assignment-grid">


        {/* =================================================
            LEFT — TICKET SUMMARY
        ================================================= */}

        <section className="pm-ticket-card">


          <div className="pm-card-header">

            <div className="pm-card-icon ticket-icon">

              <FaTicketAlt />

            </div>

            <div>

              <h2>
                Ticket Summary
              </h2>

              <p>
                Approved support request
              </p>

            </div>

          </div>


          <div className="pm-ticket-content">


            <div className="pm-subject">

              <span>
                Support Issue
              </span>

              <h2>
                {ticket.subject}
              </h2>

            </div>


            <div className="pm-ticket-info">


              <div className="pm-info-item">

                <FaUser />

                <div>

                  <small>
                    Client
                  </small>

                  <strong>
                    {ticket.client}
                  </strong>

                </div>

              </div>


              <div className="pm-info-item">

                <FaEnvelope />

                <div>

                  <small>
                    Email
                  </small>

                  <strong>
                    {ticket.email}
                  </strong>

                </div>

              </div>


              <div className="pm-info-item">

                <FaClipboardList />

                <div>

                  <small>
                    Category
                  </small>

                  <strong>
                    {ticket.category}
                  </strong>

                </div>

              </div>


              <div className="pm-info-item">

                <FaFlag />

                <div>

                  <small>
                    Priority
                  </small>

                  <strong
                    className={
                      ticket.priority.toLowerCase()
                    }
                  >
                    {ticket.priority}
                  </strong>

                </div>

              </div>


              <div className="pm-info-item">

                <FaCalendarAlt />

                <div>

                  <small>
                    Submitted
                  </small>

                  <strong>
                    {ticket.date}
                  </strong>

                </div>

              </div>

            </div>


            <div className="pm-problem-box">

              <h3>
                Problem Description
              </h3>

              <p>
                {ticket.description}
              </p>

            </div>

          </div>

        </section>


        {/* =================================================
            RIGHT — ASSIGNMENT FORM
        ================================================= */}

        <section className="pm-assignment-card">


          <div className="pm-card-header">

            <div className="pm-card-icon manager-icon">

              <FaUserTie />

            </div>

            <div>

              <h2>
                Assign Project Manager
              </h2>

              <p>
                Select a manager responsible for this issue.
              </p>

            </div>

          </div>


          {!assigned ? (

            <form
              className="pm-form"
              onSubmit={handleAssign}
            >


              {/* PROJECT MANAGER */}

              <div className="pm-form-group">

                <label htmlFor="projectManager">
                  Project Manager
                </label>

                <div className="pm-select-wrapper">

                  <FaUserTie />

                  <select
                    id="projectManager"
                    value={selectedManager}
                    onChange={(event) =>
                      setSelectedManager(event.target.value)
                    }
                  >

                    <option value="">
                      Select Project Manager
                    </option>

                    {projectManagers.map((manager) => (

                      <option
                        key={manager.id}
                        value={manager.id}
                        disabled={
                          manager.availability === "Busy"
                        }
                      >

                        {manager.name} — {manager.availability}

                      </option>

                    ))}

                  </select>

                  <FaChevronDown />

                </div>

              </div>


              {/* SELECTED MANAGER */}

              {selectedManagerData && (

                <div className="selected-manager">

                  <div className="manager-avatar">

                    {selectedManagerData.name.charAt(0)}

                  </div>

                  <div>

                    <strong>
                      {selectedManagerData.name}
                    </strong>

                    <span>
                      {selectedManagerData.email}
                    </span>

                    <small>
                      {selectedManagerData.projects} active projects
                    </small>

                  </div>

                  <span className="available-badge">

                    {selectedManagerData.availability}

                  </span>

                </div>

              )}


              {/* ASSIGNMENT NOTES */}

              <div className="pm-form-group">

                <label htmlFor="assignmentNotes">
                  Assignment Notes
                  <span>Optional</span>
                </label>

                <textarea
                  id="assignmentNotes"
                  rows="6"
                  value={assignmentNotes}
                  onChange={(event) =>
                    setAssignmentNotes(event.target.value)
                  }
                  placeholder="Add important information for the Project Manager..."
                />

              </div>


              {/* WORKFLOW INFO */}

              <div className="pm-workflow-info">

                <FaCheckCircle />

                <div>

                  <strong>
                    What happens after assignment?
                  </strong>

                  <p>
                    The Project Manager will review the problem,
                    break it into smaller subtasks and assign
                    each subtask to the appropriate Consultant.
                  </p>

                </div>

              </div>


              {/* BUTTON */}

              <button
                type="submit"
                className="assign-manager-btn"
              >

                <FaUserTie />

                Assign Project Manager

              </button>


            </form>

          ) : (

            /* =================================================
               SUCCESS STATE
            ================================================= */

            <div className="assignment-success">


              <div className="success-icon">

                <FaCheckCircle />

              </div>


              <h2>
                Project Manager Assigned
              </h2>


              <p>
                {selectedManagerData?.name} has been assigned
                to ticket <strong>#{ticket.id}</strong>.
              </p>


              <div className="success-manager">

                <div className="manager-avatar">

                  {selectedManagerData?.name.charAt(0)}

                </div>

                <div>

                  <strong>
                    {selectedManagerData?.name}
                  </strong>

                  <span>
                    Project Manager
                  </span>

                </div>

              </div>


              <button
                type="button"
                className="continue-workflow-btn"
                onClick={() =>
                  navigate(
                    `/tickets/${ticket.id}/subtasks`
                  )
                }
              >

                Continue to Problem Breakdown

                <FaArrowLeft className="rotate-arrow" />

              </button>


            </div>

          )}

        </section>

      </div>


      {/* =================================================
          WORKFLOW STEPS
      ================================================= */}

      <section className="pm-workflow-card">


        <div className="workflow-step completed">

          <div className="workflow-number">
            <FaCheckCircle />
          </div>

          <div>

            <strong>
              Ticket Approved
            </strong>

            <span>
              Admin verified the support request.
            </span>

          </div>

        </div>


        <div className="workflow-line"></div>


        <div className="workflow-step active">

          <div className="workflow-number">
            2
          </div>

          <div>

            <strong>
              Project Manager
            </strong>

            <span>
              Assign a manager to coordinate the issue.
            </span>

          </div>

        </div>


        <div className="workflow-line"></div>


        <div className="workflow-step">

          <div className="workflow-number">
            3
          </div>

          <div>

            <strong>
              Problem Breakdown
            </strong>

            <span>
              Divide the problem into smaller subtasks.
            </span>

          </div>

        </div>


        <div className="workflow-line"></div>


        <div className="workflow-step">

          <div className="workflow-number">
            4
          </div>

          <div>

            <strong>
              Consultant Assignment
            </strong>

            <span>
              Assign each subtask to a specific consultant.
            </span>

          </div>

        </div>

      </section>


    </main>

  );
}


export default ProjectManagerAssignment;