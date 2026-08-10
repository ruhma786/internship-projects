import { useMemo, useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

const conversations = [
  {
    id: "SUP-1045",
    consultant: "Ayesha Khan",
    initials: "AK",
    subject: "Payment page error",
    preview: "I have started reviewing the payment logs.",
    time: "10:15 AM",
    status: "In Progress",
  },
  {
    id: "SUP-1039",
    consultant: "Umair Shah",
    initials: "US",
    subject: "Report export is failing",
    preview: "Could you please share the report format?",
    time: "Yesterday",
    status: "In Progress",
  },
  {
    id: "SUP-1036",
    consultant: "Ayesha Khan",
    initials: "AK",
    subject: "User permission update",
    preview: "Your request has been resolved.",
    time: "Jul 30",
    status: "Resolved",
  },
];

const initialMessages = {
  "SUP-1045": [
    {
      author: "consultant",
      text: "Hello, I am Ayesha and I will be assisting you with this ticket.",
      time: "9:45 AM",
    },
    {
      author: "client",
      text: "Thank you. The error occurs after I click the Pay Now button.",
      time: "9:52 AM",
    },
    {
      author: "consultant",
      text: "I have started reviewing the payment logs. I will update you shortly.",
      time: "10:15 AM",
    },
  ],
  "SUP-1039": [
    {
      author: "consultant",
      text: "Could you please share the report format you are trying to export?",
      time: "Yesterday",
    },
  ],
  "SUP-1036": [
    {
      author: "consultant",
      text: "The requested user permissions have been updated successfully.",
      time: "Jul 30",
    },
  ],
};

function Messages() {
  const [selectedId, setSelectedId] = useState("SUP-1045");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId);
  const selectedMessages = useMemo(() => messages[selectedId] || [], [messages, selectedId]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages((current) => ({
      ...current,
      [selectedId]: [
        ...(current[selectedId] || []),
        { author: "client", text: message.trim(), time: "Just now" },
      ],
    }));
    setMessage("");
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={4}>
            <Card sx={{ height: "100%" }}>
              <MDBox p={3} pb={2}>
                <MDTypography variant="h5" fontWeight="medium">
                  Messages
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Chat with your support consultants.
                </MDTypography>
              </MDBox>
              <MDBox px={2} pb={2}>
                {conversations.map((conversation) => {
                  const active = conversation.id === selectedId;
                  return (
                    <MDBox
                      key={conversation.id}
                      display="flex"
                      alignItems="center"
                      p={1.5}
                      mb={1}
                      borderRadius="lg"
                      onClick={() => setSelectedId(conversation.id)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: active ? "#fff3f3" : "transparent",
                        border: active ? "1px solid #f1c7c8" : "1px solid transparent",
                      }}
                    >
                      <MDAvatar bgColor="primary" size="sm">
                        {conversation.initials}
                      </MDAvatar>
                      <MDBox ml={1.5} minWidth={0} flexGrow={1}>
                        <MDBox display="flex" justifyContent="space-between" alignItems="center">
                          <MDTypography variant="button" fontWeight="medium">
                            {conversation.consultant}
                          </MDTypography>
                          <MDTypography variant="caption" color="text">
                            {conversation.time}
                          </MDTypography>
                        </MDBox>
                        <MDTypography
                          variant="caption"
                          color="primary"
                          fontWeight="medium"
                          display="block"
                        >
                          {conversation.id} · {conversation.subject}
                        </MDTypography>
                        <MDTypography variant="caption" color="text" display="block" noWrap>
                          {conversation.preview}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  );
                })}
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={8}>
            <Card sx={{ minHeight: 590, display: "flex", flexDirection: "column" }}>
              <MDBox
                p={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                sx={{ borderBottom: "1px solid #eeeeee" }}
              >
                <MDBox display="flex" alignItems="center">
                  <MDAvatar bgColor="primary" size="sm">
                    {selectedConversation.initials}
                  </MDAvatar>
                  <MDBox ml={1.5}>
                    <MDTypography variant="h6" fontWeight="medium">
                      {selectedConversation.consultant}
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      Consultant · {selectedConversation.id}
                    </MDTypography>
                  </MDBox>
                </MDBox>
                <MDBadge
                  badgeContent={selectedConversation.status}
                  color={selectedConversation.status === "Resolved" ? "success" : "primary"}
                  variant="gradient"
                  container
                />
              </MDBox>

              <MDBox px={3} py={2} bgColor="light">
                <MDTypography variant="caption" color="text">
                  Ticket: {selectedConversation.subject}
                </MDTypography>
              </MDBox>

              <MDBox
                p={3}
                flexGrow={1}
                display="flex"
                flexDirection="column"
                justifyContent="flex-end"
              >
                {selectedMessages.map((item, index) => {
                  const clientMessage = item.author === "client";
                  return (
                    <MDBox
                      key={`${item.time}-${index}`}
                      display="flex"
                      justifyContent={clientMessage ? "flex-end" : "flex-start"}
                      mb={2}
                    >
                      <MDBox
                        p={1.5}
                        borderRadius="lg"
                        maxWidth="75%"
                        bgColor={clientMessage ? "primary" : "light"}
                      >
                        <MDTypography
                          variant="button"
                          color={clientMessage ? "white" : "dark"}
                          fontWeight="regular"
                        >
                          {item.text}
                        </MDTypography>
                        <MDTypography
                          display="block"
                          variant="caption"
                          color={clientMessage ? "white" : "text"}
                          opacity={clientMessage ? 0.75 : 1}
                          mt={0.5}
                        >
                          {item.time}
                        </MDTypography>
                      </MDBox>
                    </MDBox>
                  );
                })}
              </MDBox>

              <MDBox p={2} sx={{ borderTop: "1px solid #eeeeee" }}>
                <MDBox display="flex" alignItems="center" gap={1}>
                  <MDButton
                    variant="text"
                    color="primary"
                    iconOnly
                    circular
                    title="Attachments available soon"
                  >
                    <Icon>attach_file</Icon>
                  </MDButton>
                  <MDInput
                    label="Write a message"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") sendMessage();
                    }}
                    fullWidth
                  />
                  <MDButton variant="gradient" color="primary" onClick={sendMessage}>
                    Send
                  </MDButton>
                </MDBox>
                <MDTypography variant="caption" color="text" display="block" mt={1} ml={5}>
                  Real-time updates, typing status, emoji and attachments will be available soon.
                </MDTypography>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Messages;
