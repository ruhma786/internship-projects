import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaCheckCircle,
    FaTimesCircle,
    FaInfoCircle,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaCalendarAlt,
    FaFlag,
    FaTicketAlt
} from "react-icons/fa";

import "./TicketDetails.css";


// =====================================================
// TEMPORARY TICKET DATA
// Later this data will come from MongoDB through API
// =====================================================

const tickets = [
    {
        id: "SUP-1048",
        client: "Sarah Ahmed",
        email: "sarah.ahmed@gmail.com",
        phone: "03001234567",
        subject: "Payment page is not working",
        category: "Payment",
        priority: "High",
        status: "Pending Review",
        date: "Aug 10, 2026",
        description:
            "The payment page is not working properly. The client receives an error when trying to complete the payment."
    },

    {
        id: "SUP-1049",
        client: "Ali Raza",
        email: "ali.raza@gmail.com",
        phone: "03111234567",
        subject: "Unable to login",
        category: "Authentication",
        priority: "Medium",
        status: "Pending Review",
        date: "Aug 10, 2026",
        description:
            "The client is unable to login to the system even after entering valid login credentials."
    },

    {
        id: "SUP-1050",
        client: "Hina Malik",
        email: "hina.malik@gmail.com",
        phone: "03221234567",
        subject: "Email notifications not working",
        category: "Notification",
        priority: "Medium",
        status: "In Progress",
        date: "Aug 09, 2026",
        description:
            "The client is not receiving email notifications for important ticket updates."
    },

    {
        id: "SUP-1051",
        client: "Usman Tariq",
        email: "usman.tariq@gmail.com",
        phone: "03331234567",
        subject: "Dashboard loading issue",
        category: "Dashboard",
        priority: "Low",
        status: "Pending Review",
        date: "Aug 09, 2026",
        description:
            "The client reports that the dashboard takes too much time to load."
    },

    {
        id: "SUP-1052",
        client: "Ayesha Malik",
        email: "ayesha.malik@gmail.com",
        phone: "03441234567",
        subject: "Profile information not updating",
        category: "Profile",
        priority: "Medium",
        status: "Resolved",
        date: "Aug 08, 2026",
        description:
            "The client was unable to update profile information from the account settings."
    }
];


// =====================================================
// TICKET DETAIL COMPONENT
// =====================================================

export default function TicketDetail() {

    const navigate = useNavigate();

    const { ticketId } = useParams();


    // =================================================
    // MORE INFORMATION STATES
    // =================================================

    const [showInfoForm, setShowInfoForm] = useState(false);

    const [adminMessage, setAdminMessage] = useState("");

    const [messageSent, setMessageSent] = useState(false);


    // =================================================
    // FIND SELECTED TICKET
    // =================================================

    const ticket = tickets.find(
        (item) => item.id === ticketId
    );


    // =================================================
    // TICKET NOT FOUND
    // =================================================

    if (!ticket) {

        return (
            <main className="ticket-detail-page">

                <div className="ticket-not-found">

                    <FaTimesCircle className="not-found-icon" />

                    <h2>
                        Ticket Not Found
                    </h2>

                    <p>
                        The requested ticket does not exist
                        or may have been removed.
                    </p>

                    <button
                        type="button"
                        className="back-dashboard-btn"
                        onClick={() =>
                            navigate("/tickets")
                        }
                    >
                        <FaArrowLeft />

                        Back to Ticket Management
                    </button>

                </div>

            </main>
        );
    }


    // =================================================
    // BACK TO TICKET MANAGEMENT
    // =================================================

    const handleBack = () => {

        navigate("/tickets");

    };


    // =================================================
    // APPROVE TICKET
    // =================================================

    const handleApprove = () => {

        /*
         * Later:
         *
         * PUT /api/tickets/:ticketId/approve
         *
         * After successful API response:
         * Navigate to Project Manager Assignment.
         */

        navigate(
            `/assign-project-manager/${ticket.id}`
        );

    };


    // =================================================
    // REQUEST MORE INFORMATION
    // =================================================

    const handleMoreInformation = () => {

        setShowInfoForm(true);

        setMessageSent(false);

    };


    // =================================================
    // SEND MESSAGE TO CLIENT
    // =================================================

    const handleSendMessage = () => {

        if (!adminMessage.trim()) {
            return;
        }


        /*
         * Later:
         *
         * POST /api/tickets/:ticketId/messages
         *
         * The backend will save the message
         * and notify the client.
         */

        setMessageSent(true);

    };


    // =================================================
    // CANCEL MORE INFORMATION
    // =================================================

    const handleCancelMessage = () => {

        setShowInfoForm(false);

        setAdminMessage("");

        setMessageSent(false);

    };


    // =================================================
    // REJECT TICKET
    // =================================================

    const handleReject = () => {

        const confirmReject = window.confirm(
            `Are you sure you want to reject ticket ${ticket.id}?`
        );


        if (!confirmReject) {
            return;
        }


        /*
         * Later:
         *
         * PUT /api/tickets/:ticketId/reject
         *
         * Backend will update ticket status to Rejected.
         */

        alert(
            `Ticket ${ticket.id} has been rejected.`
        );


        navigate("/tickets");

    };


    // =================================================
    // MAIN UI
    // =================================================

    return (
        <main className="ticket-detail-page">

            {/* =================================================
                PAGE HEADER
            ================================================= */}

            <div className="ticket-detail-header">

                {/* Back Button */}

                <button
                    type="button"
                    className="back-dashboard-btn"
                    onClick={handleBack}
                >
                    <FaArrowLeft />

                    Back to Ticket Management
                </button>


                {/* Heading */}

                <div className="ticket-heading">

                    <div>

                        <h1>
                            Ticket Details
                        </h1>

                        <p>
                            Review and verify the client's
                            support request.
                        </p>

                    </div>


                    {/* Ticket ID */}

                    <div className="ticket-id-badge">

                        <FaTicketAlt />

                        <span>
                            {ticket.id}
                        </span>

                    </div>

                </div>

            </div>


            {/* =================================================
                MAIN GRID
            ================================================= */}

            <div className="ticket-detail-grid">


                {/* =================================================
                    LEFT SIDE
                ================================================= */}

                <section className="ticket-main-card">


                    {/* =================================================
                        TICKET INFORMATION
                    ================================================= */}

                    <div className="detail-section">

                        <div className="section-title">

                            <FaTicketAlt />

                            <h2>
                                Ticket Information
                            </h2>

                        </div>


                        {/* Subject */}

                        <div className="ticket-subject">

                            <span>
                                Subject
                            </span>

                            <h2>
                                {ticket.subject}
                            </h2>

                        </div>


                        {/* Description */}

                        <div className="ticket-description">

                            <span>
                                Client Description
                            </span>

                            <p>
                                {ticket.description}
                            </p>

                        </div>

                    </div>


                    {/* =================================================
                        CLIENT INFORMATION
                    ================================================= */}

                    <div className="detail-section">

                        <div className="section-title">

                            <FaUser />

                            <h2>
                                Client Information
                            </h2>

                        </div>


                        <div className="client-info-grid">


                            {/* Client Name */}

                            <div className="info-item">

                                <FaUser />

                                <div>

                                    <span>
                                        Client Name
                                    </span>

                                    <strong>
                                        {ticket.client}
                                    </strong>

                                </div>

                            </div>


                            {/* Email */}

                            <div className="info-item">

                                <FaEnvelope />

                                <div>

                                    <span>
                                        Email Address
                                    </span>

                                    <strong>
                                        {ticket.email}
                                    </strong>

                                </div>

                            </div>


                            {/* Phone */}

                            <div className="info-item">

                                <FaPhone />

                                <div>

                                    <span>
                                        Phone Number
                                    </span>

                                    <strong>
                                        {ticket.phone}
                                    </strong>

                                </div>

                            </div>


                            {/* Date */}

                            <div className="info-item">

                                <FaCalendarAlt />

                                <div>

                                    <span>
                                        Submitted Date
                                    </span>

                                    <strong>
                                        {ticket.date}
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        ADMIN VERIFICATION NOTE
                    ================================================= */}

                    <div className="verification-note">

                        <FaInfoCircle />

                        <div>

                            <strong>
                                Admin Verification
                            </strong>

                            <p>
                                Verify the client's request before
                                approving it as an official support
                                ticket.
                            </p>

                        </div>

                    </div>

                </section>


                {/* =================================================
                    RIGHT SIDEBAR
                ================================================= */}

                <aside className="ticket-sidebar">


                    {/* =================================================
                        STATUS CARD
                    ================================================= */}

                    <div className="status-card">

                        <div className="section-title">

                            <FaInfoCircle />

                            <h2>
                                Ticket Status
                            </h2>

                        </div>


                        {/* Status */}

                        <div className="status-row">

                            <span>
                                Status
                            </span>

                            <span className="status-badge pending">

                                {ticket.status}

                            </span>

                        </div>


                        {/* Priority */}

                        <div className="status-row">

                            <span>
                                Priority
                            </span>

                            <span
                                className={`priority-badge ${ticket.priority.toLowerCase()}`}
                            >

                                <FaFlag />

                                {ticket.priority}

                            </span>

                        </div>


                        {/* Category */}

                        <div className="status-row">

                            <span>
                                Category
                            </span>

                            <strong>
                                {ticket.category}
                            </strong>

                        </div>


                        {/* Ticket ID */}

                        <div className="status-row">

                            <span>
                                Ticket ID
                            </span>

                            <strong>
                                {ticket.id}
                            </strong>

                        </div>

                    </div>


                    {/* =================================================
                        VERIFICATION ACTION CARD
                    ================================================= */}

                    <div className="verification-card">

                        <div className="section-title">

                            <FaCheckCircle />

                            <h2>
                                Admin Verification
                            </h2>

                        </div>


                        <p className="verification-description">

                            Choose an action after reviewing
                            the client's support request.

                        </p>


                        {/* =================================================
                            APPROVE
                        ================================================= */}

                        <button
                            type="button"
                            className="approve-btn"
                            onClick={handleApprove}
                        >

                            <FaCheckCircle />

                            <span>
                                Approve & Create Ticket
                            </span>

                        </button>


                        {/* =================================================
                            REQUEST INFORMATION
                        ================================================= */}

                        <button
                            type="button"
                            className="info-btn"
                            onClick={handleMoreInformation}
                        >

                            <FaInfoCircle />

                            <span>
                                Request More Information
                            </span>

                        </button>


                        {/* =================================================
                            MORE INFORMATION FORM
                        ================================================= */}

                        {showInfoForm && (

                            <div className="more-information-form">


                                <div className="more-info-header">

                                    <FaEnvelope />

                                    <div>

                                        <h3>
                                            Request More Information
                                        </h3>

                                        <p>
                                            Send a message to {ticket.client}
                                            asking for additional information.
                                        </p>

                                    </div>

                                </div>


                                {/* Ticket / Client */}

                                <div className="message-meta">

                                    <div>

                                        <span>
                                            Ticket
                                        </span>

                                        <strong>
                                            {ticket.id}
                                        </strong>

                                    </div>


                                    <div>

                                        <span>
                                            Client
                                        </span>

                                        <strong>
                                            {ticket.client}
                                        </strong>

                                    </div>

                                </div>


                                {/* Admin Message */}

                                <label htmlFor="adminMessage">

                                    Admin Message

                                </label>


                                <textarea
                                    id="adminMessage"
                                    value={adminMessage}
                                    onChange={(e) => {

                                        setAdminMessage(
                                            e.target.value
                                        );

                                        setMessageSent(false);

                                    }}
                                    placeholder="Enter the information you need from the client..."
                                    rows="5"
                                />


                                {/* Actions */}

                                <div className="message-actions">

                                    <button
                                        type="button"
                                        className="cancel-message-btn"
                                        onClick={
                                            handleCancelMessage
                                        }
                                    >

                                        Cancel

                                    </button>


                                    <button
                                        type="button"
                                        className="send-message-btn"
                                        disabled={
                                            !adminMessage.trim()
                                        }
                                        onClick={
                                            handleSendMessage
                                        }
                                    >

                                        <FaEnvelope />

                                        Send to Client

                                    </button>

                                </div>


                                {/* Success Message */}

                                {messageSent && (

                                    <div className="message-success">

                                        <FaCheckCircle />

                                        <span>

                                            Message sent successfully
                                            to {ticket.client}.

                                        </span>

                                    </div>

                                )}

                            </div>

                        )}


                        {/* =================================================
                            REJECT
                        ================================================= */}

                        <button
                            type="button"
                            className="reject-btn"
                            onClick={handleReject}
                        >

                            <FaTimesCircle />

                            <span>
                                Reject Query
                            </span>

                        </button>

                    </div>

                </aside>

            </div>

        </main>
    );
}