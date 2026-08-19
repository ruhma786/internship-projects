import React from "react";
import { useNavigate } from "react-router-dom";

import {
    FaTicketAlt,
    FaArrowRight,
    FaClock,
    FaCheckCircle,
    FaSpinner,
} from "react-icons/fa";

import "./RecentTickets.css";


const recentTickets = [
    {
        id: "SUP-1048",
        client: "Sarah Ahmed",
        subject: "Payment page is not working",
        priority: "High",
        status: "Pending Review",
        date: "Aug 10, 2026",
    },

    {
        id: "SUP-1049",
        client: "Ali Raza",
        subject: "Unable to login",
        priority: "Medium",
        status: "Pending Review",
        date: "Aug 10, 2026",
    },

    {
        id: "SUP-1050",
        client: "Hina Malik",
        subject: "Email notifications not working",
        priority: "Medium",
        status: "In Progress",
        date: "Aug 09, 2026",
    },

    {
        id: "SUP-1051",
        client: "Usman Tariq",
        subject: "Dashboard loading issue",
        priority: "Low",
        status: "Pending Review",
        date: "Aug 09, 2026",
    },
];


export default function RecentTickets() {

    const navigate = useNavigate();


    // ============================================
    // OPEN TICKET DETAIL
    // ============================================

    const handleViewTicket = (ticketId) => {

        navigate(`/tickets/${ticketId}`);

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

        <section className="recent-tickets-card">


            {/* =========================================
                HEADER
            ========================================= */}

            <div className="recent-section-header">

                <div className="recent-header-content">

                    <span className="recent-section-label">
                        SUPPORT ACTIVITY
                    </span>

                    <h2>
                        Recent Tickets
                    </h2>

                    <p>
                        Latest support requests received from clients.
                    </p>

                </div>


                <button
                    type="button"
                    className="view-all-btn"
                    onClick={() => navigate("/tickets")}
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

            <div className="recent-tickets-heading">

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

            <div className="recent-tickets-list">

                {recentTickets.map((ticket) => (

                    <div
                        className="recent-ticket-row"
                        key={ticket.id}
                    >


                        {/* =================================
                            TICKET
                        ================================= */}

                        <div className="recent-ticket-id">

                            <div className="ticket-icon-box">
                                <FaTicketAlt />
                            </div>

                            <div>

                                <strong>
                                    #{ticket.id}
                                </strong>

                                <span>
                                    {ticket.client}
                                </span>

                            </div>

                        </div>



                        {/* =================================
                            SUBJECT
                        ================================= */}

                        <div className="recent-ticket-subject">

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
                            className={`ticket-priority ${ticket.priority.toLowerCase()}`}
                        >

                            {ticket.priority}

                        </span>



                        {/* =================================
                            STATUS
                        ================================= */}

                        <span
                            className={`ticket-status ${ticket.status
                                .toLowerCase()
                                .replaceAll(" ", "-")}`}
                        >

                            {getStatusIcon(ticket.status)}

                            {ticket.status}

                        </span>



                        {/* =================================
                            DATE
                        ================================= */}

                        <span className="ticket-date">

                            {ticket.date}

                        </span>



                        {/* =================================
                            VIEW BUTTON
                        ================================= */}

                        <button
                            type="button"
                            className="recent-view-btn"
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