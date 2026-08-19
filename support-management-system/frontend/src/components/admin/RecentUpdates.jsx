import React from "react";

import {
    FaCheckCircle,
    FaUserTie,
    FaTicketAlt,
    FaInfoCircle,
    FaClock,
    FaArrowRight,
} from "react-icons/fa";

import "./RecentUpdate.css";


const updates = [
    {
        id: 1,
        icon: <FaTicketAlt />,
        title: "New ticket received",
        description:
            "Ticket SUP-1048 was submitted by Sarah Ahmed.",
        time: "10 minutes ago",
        type: "ticket",
    },

    {
        id: 2,
        icon: <FaCheckCircle />,
        title: "Ticket resolved",
        description:
            "Ticket SUP-1045 has been marked as resolved.",
        time: "35 minutes ago",
        type: "success",
    },

    {
        id: 3,
        icon: <FaUserTie />,
        title: "Project Manager assigned",
        description:
            "SUP-1046 was assigned to Ahmed Khan.",
        time: "1 hour ago",
        type: "manager",
    },

    {
        id: 4,
        icon: <FaInfoCircle />,
        title: "More information requested",
        description:
            "Additional information was requested for SUP-1047.",
        time: "2 hours ago",
        type: "info",
    },

    {
        id: 5,
        icon: <FaClock />,
        title: "Ticket pending review",
        description:
            "SUP-1051 is waiting for admin verification.",
        time: "3 hours ago",
        type: "pending",
    },
];


export default function RecentUpdates() {

    return (

        <section className="recent-updates-card">


            {/* =================================================
                HEADER
            ================================================= */}

            <div className="updates-section-header">

                <div className="updates-header-content">

                    <span className="updates-section-label">
                        SYSTEM ACTIVITY
                    </span>

                    <h2>
                        Recent Updates
                    </h2>

                    <p>
                        Latest activities and workflow changes in the
                        support management system.
                    </p>

                </div>


                <div className="updates-live-status">

                    <span className="live-dot"></span>

                    Live Activity

                </div>

            </div>



            {/* =================================================
                ACTIVITY TIMELINE
            ================================================= */}

            <div className="updates-timeline">

                {updates.map((update, index) => (

                    <div
                        className="update-item"
                        key={update.id}
                    >


                        {/* =================================================
                            TIMELINE LINE
                        ================================================= */}

                        {index !== updates.length - 1 && (
                            <div className="timeline-line"></div>
                        )}



                        {/* =================================================
                            ICON
                        ================================================= */}

                        <div
                            className={`update-icon ${update.type}`}
                        >

                            {update.icon}

                        </div>



                        {/* =================================================
                            CONTENT
                        ================================================= */}

                        <div className="update-content">


                            <div className="update-top-row">

                                <strong>
                                    {update.title}
                                </strong>

                                <span className="update-time">
                                    {update.time}
                                </span>

                            </div>


                            <p>
                                {update.description}
                            </p>


                            <span
                                className={`update-type-label ${update.type}`}
                            >

                                {update.type === "ticket" &&
                                    "Ticket Activity"
                                }

                                {update.type === "success" &&
                                    "Completed"
                                }

                                {update.type === "manager" &&
                                    "Assignment"
                                }

                                {update.type === "info" &&
                                    "Information Request"
                                }

                                {update.type === "pending" &&
                                    "Pending Review"
                                }

                            </span>


                        </div>


                        {/* =================================================
                            ARROW
                        ================================================= */}

                        <div className="update-arrow">

                            <FaArrowRight />

                        </div>


                    </div>

                ))}

            </div>



            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="updates-footer">

                <span>
                    Showing latest 5 system activities
                </span>

                <button
                    type="button"
                    className="updates-view-btn"
                >

                    View Activity History

                    <FaArrowRight />

                </button>

            </div>


        </section>

    );
}