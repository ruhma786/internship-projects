import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import tickets from "layouts/client/ticketData";

const statusColor = {
  "Pending Review": "warning",
  "In Progress": "primary",
  Resolved: "success",
};

const priorityColor = {
  High: "error",
  Medium: "warning",
  Low: "success",
};

function TicketDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();
  const fileInput = useRef(null);
  const ticket = tickets.find((item) => item.id === ticketId) || tickets[0];
  const [attachments, setAttachments] = useState([]);
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([
    {
      author: "You",
      text: "I submitted this issue for support review.",
      time: ticket.createdDate,
    },
    {
      author: "Support Team",
      text: "Your ticket has been received and is being reviewed by the administrator.",
      time: "Today, 10:15 AM",
    },
  ]);

  const addAttachment = (event) => {
    const files = Array.from(event.target.files || []);
    setAttachments((current) => [...current, ...files.map((file) => file.name)]);
    event.target.value = "";
  };

  const sendMessage = () => {
    if (!message.trim()) {
      return;
    }

    setConversation((current) => [
      ...current,
      {
        author: "You",
        text: message.trim(),
        time: "Just now",
      },
    ]);
    setMessage("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDButton variant="text" color="primary" onClick={() => navigate("/my-tickets")}>
          <Icon>arrow_back</Icon>&nbsp; Back to My Tickets
        </MDButton>
        <Grid container spacing={3} mt={0}>
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={3}>
                <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                  <MDBox>
                    <MDTypography variant="caption" color="primary" fontWeight="bold">
                      TICKET #{ticket.id}
                    </MDTypography>
                    <MDTypography variant="h4" fontWeight="medium" mt={0.5}>
                      {ticket.subject}
                    </MDTypography>
                  </MDBox>
                  <MDBadge
                    badgeContent={ticket.status}
                    color={statusColor[ticket.status]}
                    variant="gradient"
                    container
                  />
                </MDBox>
                <MDTypography variant="body2" color="text" lineHeight={1.8}>
                  {ticket.description}
                </MDTypography>

                <Grid container spacing={2} mt={1}>
                  <Grid item xs={12} sm={6}>
                    <MDBox p={2} borderRadius="lg" bgColor="light">
                      <MDTypography variant="caption" color="text" display="block">
                        Priority
                      </MDTypography>
                      <MDBadge
                        badgeContent={ticket.priority}
                        color={priorityColor[ticket.priority]}
                        size="xs"
                        container
                      />
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox p={2} borderRadius="lg" bgColor="light">
                      <MDTypography variant="caption" color="text" display="block">
                        Created Date
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="medium">
                        {ticket.createdDate}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox p={2} borderRadius="lg" bgColor="light">
                      <MDTypography variant="caption" color="text" display="block">
                        Issue Category
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="medium">
                        {ticket.category}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <MDBox p={2} borderRadius="lg" bgColor="light">
                      <MDTypography variant="caption" color="text" display="block">
                        Assigned Consultant
                      </MDTypography>
                      <MDTypography variant="button" fontWeight="medium">
                        {ticket.consultant}
                      </MDTypography>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            </Card>

            <Card sx={{ mt: 3 }}>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Conversation
                </MDTypography>
                <MDBox mt={2}>
                  {conversation.map((item, index) => (
                    <MDBox
                      key={`${item.time}-${index}`}
                      mb={2}
                      p={2}
                      borderRadius="lg"
                      bgColor={item.author === "You" ? "light" : "white"}
                      sx={{
                        border: item.author === "You" ? "none" : "1px solid #eeeeee",
                      }}
                    >
                      <MDBox display="flex" justifyContent="space-between" mb={0.5}>
                        <MDTypography
                          variant="button"
                          fontWeight="medium"
                          color={item.author === "You" ? "primary" : "dark"}
                        >
                          {item.author}
                        </MDTypography>
                        <MDTypography variant="caption" color="text">
                          {item.time}
                        </MDTypography>
                      </MDBox>
                      <MDTypography variant="button" color="text" fontWeight="regular">
                        {item.text}
                      </MDTypography>
                    </MDBox>
                  ))}
                </MDBox>
                <MDBox display="flex" gap={1} mt={2}>
                  <MDInput
                    label="Write a message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    fullWidth
                  />
                  <MDButton variant="gradient" color="primary" onClick={sendMessage}>
                    Send
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={4}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Ticket Timeline
                </MDTypography>
                <MDBox mt={3}>
                  <MDBox display="flex" mb={2}>
                    <Icon color="primary">task_alt</Icon>
                    <MDBox ml={1.5}>
                      <MDTypography variant="button" fontWeight="medium" display="block">
                        Ticket created
                      </MDTypography>
                      <MDTypography variant="caption" color="text">
                        {ticket.createdDate}
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex" mb={2}>
                    <Icon color="primary">manage_search</Icon>
                    <MDBox ml={1.5}>
                      <MDTypography variant="button" fontWeight="medium" display="block">
                        Admin review
                      </MDTypography>
                      <MDTypography variant="caption" color="text">
                        Support team will verify your request
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                  <MDBox display="flex">
                    <Icon color="disabled">engineering</Icon>
                    <MDBox ml={1.5}>
                      <MDTypography variant="button" fontWeight="medium" display="block">
                        Consultant assignment
                      </MDTypography>
                      <MDTypography variant="caption" color="text">
                        The next update will appear here
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>

            <Card sx={{ mt: 3 }}>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Attachments
                </MDTypography>
                <MDTypography variant="caption" color="text" display="block" mt={0.5} mb={2}>
                  Add screenshots or files to help the support team.
                </MDTypography>
                <input ref={fileInput} type="file" multiple hidden onChange={addAttachment} />
                <MDButton
                  variant="outlined"
                  color="primary"
                  fullWidth
                  onClick={() => fileInput.current?.click()}
                >
                  <Icon>attach_file</Icon>&nbsp; Add attachment
                </MDButton>
                {attachments.map((file) => (
                  <MDBox
                    key={file}
                    display="flex"
                    alignItems="center"
                    mt={1.5}
                    p={1}
                    borderRadius="md"
                    bgColor="light"
                  >
                    <Icon color="primary" fontSize="small">
                      description
                    </Icon>
                    <MDTypography variant="caption" ml={1} sx={{ overflowWrap: "anywhere" }}>
                      {file}
                    </MDTypography>
                  </MDBox>
                ))}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default TicketDetails;
