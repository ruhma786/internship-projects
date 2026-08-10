import React from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Icon from "@mui/material/Icon";
import { useNavigate } from "react-router-dom";

import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

const recentNotifications = [
  {
    title: "Consultant replied",
    subtitle: "Ayesha Khan replied to ticket SUP-1045",
    icon: "reply",
    color: "info",
    time: "2 mins ago",
  },
  {
    title: "Ticket updated",
    subtitle: "SUP-1039 status changed to In Progress",
    icon: "update",
    color: "warning",
    time: "1 hour ago",
  },
  {
    title: "Ticket closed",
    subtitle: "SUP-1036 has been resolved",
    icon: "check_circle",
    color: "success",
    time: "Yesterday",
  },
];
// Data
import ticketData from "layouts/client/ticketData";

function Dashboard() {
  const navigate = useNavigate();

  const totalTickets = ticketData.length;
  const openTickets = ticketData.filter((t) => t.status !== "Resolved").length;
  const inProgressTickets = ticketData.filter(
    (t) => t.status.toLowerCase() === "in progress"
  ).length;
  const closedTickets = ticketData.filter((t) => t.status.toLowerCase() === "resolved").length;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <MDTypography variant="h4" fontWeight="bold">
            Client Dashboard
          </MDTypography>
        </MDBox>

        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <MDBox mb={1.5} sx={{ cursor: "pointer" }} onClick={() => navigate("/my-tickets")}>
              <ComplexStatisticsCard
                color="info"
                icon="confirmation_number"
                title="Total Tickets"
                count={totalTickets}
                percentage={{ color: "success", amount: "", label: "all requests" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <MDBox mb={1.5} sx={{ cursor: "pointer" }} onClick={() => navigate("/my-tickets")}>
              <ComplexStatisticsCard
                color="info"
                icon="pending_actions"
                title="Open"
                count={openTickets}
                percentage={{ color: "warning", amount: "", label: "awaiting response" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <MDBox mb={1.5} sx={{ cursor: "pointer" }} onClick={() => navigate("/my-tickets")}>
              <ComplexStatisticsCard
                color="info"
                icon="autorenew"
                title="In Progress"
                count={inProgressTickets}
                percentage={{ color: "success", amount: "", label: "being worked on" }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <MDBox mb={1.5} sx={{ cursor: "pointer" }} onClick={() => navigate("/my-tickets")}>
              <ComplexStatisticsCard
                color="info"
                icon="task_alt"
                title="Closed"
                count={closedTickets}
                percentage={{ color: "success", amount: "", label: "resolved tickets" }}
              />
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <MDBox mt={4.5}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Card>
                        <MDBox
                          p={3}
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <MDTypography variant="h6" fontWeight="bold">
                            Recent Tickets
                          </MDTypography>
                          <MDButton
                            color="info"
                            variant="outlined"
                            size="small"
                            onClick={() => navigate("/my-tickets")}
                          >
                            View all
                          </MDButton>
                        </MDBox>

                        <TableContainer>
                          <Table sx={{ minWidth: 850, tableLayout: "fixed" }}>
                            <TableHead>
                              <TableRow>
                                <TableCell sx={{ width: "40%", fontWeight: "bold" }}>
                                  <MDTypography variant="button" fontWeight="bold">
                                    Ticket
                                  </MDTypography>
                                </TableCell>
                                <TableCell align="center" sx={{ width: "15%", fontWeight: "bold" }}>
                                  <MDTypography variant="button" fontWeight="bold">
                                    Priority
                                  </MDTypography>
                                </TableCell>
                                <TableCell align="center" sx={{ width: "15%", fontWeight: "bold" }}>
                                  <MDTypography variant="button" fontWeight="bold">
                                    Status
                                  </MDTypography>
                                </TableCell>
                                <TableCell align="center" sx={{ width: "15%", fontWeight: "bold" }}>
                                  <MDTypography variant="button" fontWeight="bold">
                                    Date
                                  </MDTypography>
                                </TableCell>
                                <TableCell align="center" sx={{ width: "15%", fontWeight: "bold" }}>
                                  <MDTypography variant="button" fontWeight="bold">
                                    Action
                                  </MDTypography>
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {ticketData.map((ticket) => (
                                <TableRow key={ticket.id} hover>
                                  <TableCell>
                                    <MDTypography
                                      variant="button"
                                      fontWeight="bold"
                                      display="block"
                                    >
                                      {ticket.id}
                                    </MDTypography>
                                    <MDTypography variant="caption" color="text">
                                      {ticket.subject}
                                    </MDTypography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <MDTypography variant="button">{ticket.priority}</MDTypography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <MDTypography variant="button">{ticket.status}</MDTypography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <MDTypography variant="caption">
                                      {ticket.createdDate}
                                    </MDTypography>
                                  </TableCell>
                                  <TableCell align="center">
                                    <MDButton
                                      color="info"
                                      variant="gradient"
                                      size="small"
                                      onClick={() => navigate(`/my-tickets/${ticket.id}`)}
                                    >
                                      View
                                    </MDButton>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Card>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
