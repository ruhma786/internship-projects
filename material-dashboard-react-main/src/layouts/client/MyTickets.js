import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import tickets from "layouts/client/ticketData";

const pageSize = 4;
const statusColor = { "Pending Review": "warning", "In Progress": "primary", Resolved: "success" };
const priorityColor = { High: "error", Medium: "warning", Low: "success" };

function MyTickets() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);

  const filteredTickets = useMemo(() => {
    const matchingTickets = tickets.filter(
      (ticket) =>
        (ticket.subject.toLowerCase().includes(search.toLowerCase()) ||
          ticket.id.toLowerCase().includes(search.toLowerCase())) &&
        (status === "all" || ticket.status === status) &&
        (priority === "all" || ticket.priority === priority)
    );

    return [...matchingTickets].sort((a, b) =>
      sort === "oldest" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)
    );
  }, [search, status, priority, sort]);

  const pageCount = Math.max(1, Math.ceil(filteredTickets.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const pageTickets = filteredTickets.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateFilter = (setter) => (event) => {
    setter(event.target.value);
    setPage(1);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Card>
          <MDBox p={3} pb={2} display="flex" justifyContent="space-between" alignItems="center">
            <MDBox>
              <MDTypography variant="h4" fontWeight="medium">
                My Tickets
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Monitor every support request in one place.
              </MDTypography>
            </MDBox>
            <MDButton component={Link} to="/create-ticket" variant="gradient" color="primary">
              <Icon>add</Icon>&nbsp; Create Ticket
            </MDButton>
          </MDBox>

          <MDBox px={3} pb={3}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={6}>
                <MDInput
                  label="Search by ticket ID or subject"
                  value={search}
                  onChange={updateFilter(setSearch)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <MDInput
                  select
                  label="Status"
                  value={status}
                  onChange={updateFilter(setStatus)}
                  fullWidth
                >
                  <MenuItem value="all">All statuses</MenuItem>
                  <MenuItem value="Pending Review">Pending Review</MenuItem>
                  <MenuItem value="In Progress">In Progress</MenuItem>
                  <MenuItem value="Resolved">Resolved</MenuItem>
                </MDInput>
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <MDInput
                  select
                  label="Priority"
                  value={priority}
                  onChange={updateFilter(setPriority)}
                  fullWidth
                >
                  <MenuItem value="all">All priorities</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </MDInput>
              </Grid>
              <Grid item xs={12} sm={4} md={2}>
                <MDInput
                  select
                  label="Sort"
                  value={sort}
                  onChange={updateFilter(setSort)}
                  fullWidth
                >
                  <MenuItem value="newest">Newest first</MenuItem>
                  <MenuItem value="oldest">Oldest first</MenuItem>
                </MDInput>
              </Grid>
            </Grid>
          </MDBox>

          <TableContainer>
            <Table sx={{ minWidth: 850, tableLayout: "fixed" }}>
              <TableHead sx={{ display: "table-header-group", p: 0 }}>
                <TableRow>
                  <TableCell sx={{ width: "44%" }}>Ticket</TableCell>
                  <TableCell align="center" sx={{ width: "13%" }}>
                    Priority
                  </TableCell>
                  <TableCell align="center" sx={{ width: "16%" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ width: "15%" }}>Created Date</TableCell>
                  <TableCell align="right" sx={{ width: "12%" }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {pageTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell sx={{ overflow: "hidden" }}>
                      <MDTypography variant="button" fontWeight="medium" display="block">
                        {ticket.id}
                      </MDTypography>
                      <MDTypography variant="caption" color="text">
                        {ticket.subject}
                      </MDTypography>
                    </TableCell>
                    <TableCell align="center">
                      <MDBadge
                        badgeContent={ticket.priority}
                        color={priorityColor[ticket.priority]}
                        size="xs"
                        container
                      />
                    </TableCell>
                    <TableCell align="center">
                      <MDBadge
                        badgeContent={ticket.status}
                        color={statusColor[ticket.status]}
                        variant="gradient"
                        size="xs"
                        container
                      />
                    </TableCell>
                    <TableCell>
                      <MDTypography variant="caption" color="text">
                        {ticket.createdDate}
                      </MDTypography>
                    </TableCell>
                    <TableCell align="right">
                      <MDButton
                        component={Link}
                        to={`/my-tickets/${ticket.id}`}
                        variant="text"
                        color="primary"
                        size="small"
                      >
                        View <Icon>arrow_forward</Icon>
                      </MDButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {pageTickets.length === 0 && (
            <MDBox p={4} textAlign="center">
              <Icon color="primary" fontSize="large">
                search_off
              </Icon>
              <MDTypography variant="button" display="block" color="text" mt={1}>
                No tickets match your search or filters.
              </MDTypography>
            </MDBox>
          )}

          <MDBox p={3} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="caption" color="text">
              Showing {pageTickets.length} of {filteredTickets.length} tickets
            </MDTypography>
            <MDBox display="flex" gap={1}>
              <MDButton
                variant="outlined"
                color="primary"
                size="small"
                disabled={currentPage === 1}
                onClick={() => setPage(currentPage - 1)}
              >
                Previous
              </MDButton>
              <MDTypography variant="button" px={1} alignSelf="center">
                {currentPage} / {pageCount}
              </MDTypography>
              <MDButton
                variant="outlined"
                color="primary"
                size="small"
                disabled={currentPage === pageCount}
                onClick={() => setPage(currentPage + 1)}
              >
                Next
              </MDButton>
            </MDBox>
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MyTickets;
