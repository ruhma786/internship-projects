import React from "react";

import {
    FaTicketAlt,
    FaCheckCircle,
    FaUserTie,
    FaInfoCircle,
    FaSpinner,
    FaClock,
} from "react-icons/fa";

import "./ClientRecentUpdates.css";


/* =====================================================
   SAMPLE CLIENT UPDATES

   Later these updates will come from backend/API.
===================================================== */

const updates = [
    {
        id: 1,
        icon: <FaTicketAlt />,
        title: "Ticket submitted",
        description:
            "Your support ticket SUP-1048 has been successfully submitted.",
        time: "10 minutes ago",
        type: "ticket",
    },

    {
        id: 2,
        icon: <FaCheckCircle />,
        title: "Ticket approved",
        description:
            "Your ticket SUP-1047 has been approved by the Admin.",
        time: "35 minutes ago",
        type: "success",
    },

    {
        id: 3,
        icon: <FaUserTie />,
        title: "Project Manager assigned",
        description:
            "Ahmed Khan has been assigned to coordinate your support request.",
        time: "1 hour ago",
        type: "manager",
    },

    {
        id: 4,
        icon: <FaSpinner />,
        title: "Ticket in progress",
        description:
            "Your ticket SUP-1049 is currently being worked on by the support team.",
        time: "2 hours ago",
        type: "progress",
    },

    {
        id: 5,
        icon: <FaInfoCircle />,
        title: "More information requested",
        description:
            "Additional information is required for ticket SUP-1050.",
        time: "3 hours ago",
        type: "info",
    },

    {
        id: 6,
        icon: <FaCheckCircle />,
        title: "Ticket resolved",
        description:
            "Your ticket SUP-1045 has been successfully resolved.",
        time: "Yesterday",
        type: "resolved",
    },
];


/* =====================================================
   COMPONENT
===================================================== */

function ClientRecentUpdates() {

    return (

        <section className="client-recent-updates">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="client-updates-header">

                <div>

                    <span className="client-section-label">
                        ACTIVITY TIMELINE
                    </span>

                    <h2>
                        Recent Updates
                    </h2>

                    <p>
                        Stay informed about the latest activity
                        on your support requests.
                    </p>

                </div>

            </div>


            {/* =================================================
                TIMELINE
            ================================================= */}

            <div className="client-updates-list">

                {updates.map((update) => (

                    <div
                        className="client-update-item"
                        key={update.id}
                    >


                        {/* =================================================
                            ICON
                        ================================================= */}

                        <div
                            className={`client-update-icon ${update.type}`}
                        >

                            {update.icon}

                        </div>


                        {/* =================================================
                            CONTENT
                        ================================================= */}

                        <div className="client-update-content">

                            <div className="client-update-title-row">

                                <strong>
                                    {update.title}
                                </strong>

                                <span>
                                    {update.time}
                                </span>

                            </div>


                            <p>
                                {update.description}
                            </p>

                        </div>


                    </div>

                ))}

            </div>


            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="client-updates-footer">

                <FaClock />

                <span>
                    Updates are shown according to the latest
                    ticket activity.
                </span>

            </div>


        </section>

    );

}


export default ClientRecentUpdates;