/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useMemo, useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDBadge from "components/MDBadge";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const initialNotifications = [
  {
    id: "notif-1",
    category: "Ticket replied",
    title: "Consultant Ayesha replied to your ticket",
    description: "You have a new message on ticket SUP-1045.",
    time: "2 mins ago",
    unread: true,
    color: "info",
  },
  {
    id: "notif-2",
    category: "Ticket closed",
    title: "Ticket SUP-1036 was resolved",
    description: "Your issue has been successfully closed by support.",
    time: "1 hour ago",
    unread: true,
    color: "success",
  },
  {
    id: "notif-3",
    category: "Ticket updated",
    title: "Status changed to In Progress",
    description: "Your ticket SUP-1039 is now being investigated.",
    time: "3 hours ago",
    unread: false,
    color: "warning",
  },
  {
    id: "notif-4",
    category: "Ticket created",
    title: "New ticket SUP-1051 created",
    description: "Your support request has been received successfully.",
    time: "Yesterday",
    unread: false,
    color: "primary",
  },
  {
    id: "notif-5",
    category: "Future",
    title: "Reminder: follow-up due tomorrow",
    description: "A consultant will review your ticket again tomorrow.",
    time: "Tomorrow",
    unread: true,
    color: "secondary",
  },
];

function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [viewFilter, setViewFilter] = useState("all");

  const categoryCounts = useMemo(
    () => ({
      unread: notifications.filter((item) => item.unread).length,
      replied: notifications.filter((item) => item.category === "Ticket replied").length,
      closed: notifications.filter((item) => item.category === "Ticket closed").length,
      updated: notifications.filter((item) => item.category === "Ticket updated").length,
      created: notifications.filter((item) => item.category === "Ticket created").length,
      future: notifications.filter((item) => item.category === "Future").length,
    }),
    [notifications]
  );

  const filteredNotifications = useMemo(
    () =>
      notifications.filter((notification) => {
        if (viewFilter === "unread") return notification.unread;
        if (viewFilter === "future") return notification.category === "Future";
        return true;
      }),
    [notifications, viewFilter]
  );

  const handleMarkRead = (id) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id ? { ...notification, unread: false } : notification
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications((current) => current.filter((notification) => notification.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({ ...notification, unread: false }))
    );
  };

  const handleDeleteRead = () => {
    setNotifications((current) => current.filter((notification) => notification.unread));
  };

  const summaryCards = [
    { label: "Unread", value: categoryCounts.unread, color: "info", icon: "mark_email_unread" },
    { label: "Replied", value: categoryCounts.replied, color: "success", icon: "reply" },
    { label: "Closed", value: categoryCounts.closed, color: "error", icon: "check_circle" },
    { label: "Updated", value: categoryCounts.updated, color: "warning", icon: "update" },
    { label: "Created", value: categoryCounts.created, color: "primary", icon: "assignment" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                p={3}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="flex-start"
                gap={2}
              >
                <MDBox>
                  <MDTypography variant="h4" fontWeight="medium">
                    Notifications
                  </MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    Keep clients informed on ticket replies, status updates, creations, and
                    closures.
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" flexWrap="wrap" gap={1}>
                  <MDButton
                    variant="gradient"
                    color="info"
                    size="small"
                    onClick={handleMarkAllRead}
                  >
                    Mark all read
                  </MDButton>
                  <MDButton
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleDeleteRead}
                  >
                    Delete read
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          {summaryCards.map((card) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={card.label}>
              <Card>
                <MDBox p={2} display="flex" alignItems="center" gap={2}>
                  <MDBox
                    width="3rem"
                    height="3rem"
                    display="grid"
                    placeItems="center"
                    borderRadius="xl"
                    bgColor={card.color}
                    color="white"
                  >
                    <Icon>{card.icon}</Icon>
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="h5" fontWeight="medium">
                      {card.value}
                    </MDTypography>
                    <MDTypography variant="button" color="text" fontWeight="regular">
                      {card.label}
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </Card>
            </Grid>
          ))}

          <Grid item xs={12}>
            <Card>
              <MDBox
                p={3}
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                gap={2}
              >
                <MDBox>
                  <MDTypography variant="h6" fontWeight="medium">
                    Latest updates
                  </MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    View the most relevant ticket activities in one place.
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" flexWrap="wrap" gap={1}>
                  <MDButton
                    size="small"
                    variant={viewFilter === "all" ? "gradient" : "outlined"}
                    color="dark"
                    onClick={() => setViewFilter("all")}
                  >
                    All
                  </MDButton>
                  <MDButton
                    size="small"
                    variant={viewFilter === "unread" ? "gradient" : "outlined"}
                    color="info"
                    onClick={() => setViewFilter("unread")}
                  >
                    Unread
                  </MDButton>
                  <MDButton
                    size="small"
                    variant={viewFilter === "future" ? "gradient" : "outlined"}
                    color="secondary"
                    onClick={() => setViewFilter("future")}
                  >
                    Future
                  </MDButton>
                </MDBox>
              </MDBox>

              <MDBox p={3}>
                {filteredNotifications.length === 0 ? (
                  <MDBox textAlign="center" py={6}>
                    <Icon color="disabled" fontSize="large">
                      notifications_off
                    </Icon>
                    <MDTypography variant="button" color="text" display="block" mt={2}>
                      No notifications found for this filter.
                    </MDTypography>
                  </MDBox>
                ) : (
                  filteredNotifications.map((notification) => (
                    <MDBox
                      key={notification.id}
                      mb={2}
                      p={3}
                      borderRadius="xl"
                      sx={{
                        border: "1px solid",
                        borderColor: notification.unread ? "info.main" : "divider",
                        backgroundColor: notification.unread
                          ? "rgba(16, 185, 129, 0.05)"
                          : "transparent",
                      }}
                    >
                      <MDBox
                        display="flex"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        flexWrap="wrap"
                        gap={2}
                      >
                        <MDBox minWidth={0}>
                          <MDBadge
                            badgeContent={notification.category}
                            color={notification.color}
                            variant="gradient"
                            size="xs"
                            container
                          />
                          <MDTypography variant="h6" fontWeight="medium" mt={1}>
                            {notification.title}
                          </MDTypography>
                          <MDTypography variant="body2" color="text" mt={1}>
                            {notification.description}
                          </MDTypography>
                        </MDBox>

                        <MDBox textAlign="right">
                          <MDTypography variant="caption" color="text">
                            {notification.time}
                          </MDTypography>
                          {notification.unread && (
                            <MDBadge
                              badgeContent="New"
                              color="error"
                              size="xs"
                              container
                              sx={{ ml: 1 }}
                            />
                          )}
                        </MDBox>
                      </MDBox>

                      <MDBox
                        display="flex"
                        justifyContent="flex-end"
                        flexWrap="wrap"
                        gap={1}
                        mt={3}
                      >
                        <MDButton
                          size="small"
                          color="dark"
                          variant="outlined"
                          onClick={() => handleMarkRead(notification.id)}
                        >
                          Mark as read
                        </MDButton>
                        <MDButton
                          size="small"
                          color="error"
                          variant="outlined"
                          onClick={() => handleDelete(notification.id)}
                        >
                          Delete
                        </MDButton>
                      </MDBox>
                    </MDBox>
                  ))
                )}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
