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
import MDInput from "components/MDInput";
import MDAvatar from "components/MDAvatar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";

// Overview page components
import Header from "layouts/profile/components/Header";

// Images
import profileImage from "assets/images/bruce-mars.jpg";

function Overview() {
  const [profile, setProfile] = useState({
    image: profileImage,
    fullName: "Richard Davis",
    email: "richard.davis@mail.com",
    phone: "+1 (555) 123-4567",
    totalTickets: 18,
    openTickets: 4,
    company: "SupportPro",
    role: "Client",
    location: "New York, USA",
  });
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: profile.fullName,
    email: profile.email,
    phone: profile.phone,
    location: profile.location,
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfile((current) => ({
        ...current,
        image: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveImage = () => {
    setProfile((current) => ({ ...current, image: "" }));
  };

  const handleEditToggle = () => {
    setEditing((current) => !current);
    setFormData({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
    });
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSaveProfile = () => {
    setProfile((current) => ({
      ...current,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      location: formData.location,
    }));
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
    setFormData({
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      location: profile.location,
    });
  };

  const stats = useMemo(
    () => [
      {
        label: "Total Tickets",
        value: profile.totalTickets,
        color: "primary",
        icon: "receipt_long",
      },
      { label: "Open Tickets", value: profile.openTickets, color: "info", icon: "support_agent" },
      { label: "Company", value: profile.company, color: "success", icon: "business" },
    ],
    [profile]
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header profileImage={profile.image} name={profile.fullName} role={profile.role}>
        <MDBox mt={5} mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={5} xl={4}>
              <Card sx={{ height: "100%" }}>
                <MDBox
                  p={3}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  textAlign="center"
                >
                  <MDAvatar src={profile.image} alt="profile-image" size="xxl" shadow="sm" />
                  <MDBox width="100%" mt={3} display="grid" gap={1}>
                    <MDButton component="label" variant="gradient" color="info" fullWidth>
                      Choose Image
                      <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                    </MDButton>
                    <MDButton variant="outlined" color="dark" fullWidth onClick={handleRemoveImage}>
                      Remove Image
                    </MDButton>
                  </MDBox>
                </MDBox>
                <MDBox px={3} pb={3}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Card
                        sx={{
                          p: 2,
                          textAlign: "center",
                          boxShadow: "none",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <MDTypography variant="h6" fontWeight="medium">
                          {profile.totalTickets}
                        </MDTypography>
                        <MDTypography variant="button" color="text">
                          Total Tickets
                        </MDTypography>
                      </Card>
                    </Grid>
                    <Grid item xs={6}>
                      <Card
                        sx={{
                          p: 2,
                          textAlign: "center",
                          boxShadow: "none",
                          border: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <MDTypography variant="h6" fontWeight="medium">
                          {profile.openTickets}
                        </MDTypography>
                        <MDTypography variant="button" color="text">
                          Open Tickets
                        </MDTypography>
                      </Card>
                    </Grid>
                  </Grid>
                </MDBox>
              </Card>
            </Grid>
            <Grid item xs={12} md={7} xl={8}>
              <ProfileInfoCard
                title="Profile information"
                description="Update your personal details and keep your profile current for better support service."
                info={{
                  fullName: profile.fullName,
                  email: profile.email,
                  phone: profile.phone,
                  totalTickets: `${profile.totalTickets}`,
                  company: profile.company,
                  location: profile.location,
                }}
                social={[]}
                shadow={false}
              />
              <MDBox display="flex" justifyContent="flex-end" flexWrap="wrap" gap={1} mt={2}>
                <MDButton variant="gradient" color="dark" onClick={handleEditToggle}>
                  {editing ? "Cancel" : "Edit Profile"}
                </MDButton>
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {editing && (
          <MDBox pt={2} px={2} lineHeight={1.25}>
            <Card sx={{ p: 2, mb: 2 }}>
              <MDBox mb={2}>
                <MDTypography variant="h6" fontWeight="medium">
                  Update Profile
                </MDTypography>
                <MDTypography variant="button" color="text">
                  Edit your name, email, phone, and location directly.
                </MDTypography>
              </MDBox>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleFormChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <MDInput
                    label="Location"
                    name="location"
                    value={formData.location}
                    onChange={handleFormChange}
                    fullWidth
                  />
                </Grid>
              </Grid>
              <MDBox display="flex" justifyContent="flex-end" flexWrap="wrap" gap={1} mt={3}>
                <MDButton variant="outlined" color="dark" onClick={handleCancelEdit}>
                  Cancel
                </MDButton>
                <MDButton variant="gradient" color="success" onClick={handleSaveProfile}>
                  Save Changes
                </MDButton>
              </MDBox>
            </Card>
          </MDBox>
        )}

        <MDBox p={2}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, height: "100%" }}>
                <MDTypography variant="h6" fontWeight="medium">
                  Change Password
                </MDTypography>
                <MDTypography
                  variant="button"
                  color="text"
                  fontWeight="regular"
                  display="block"
                  mt={1}
                >
                  Secure your account with a new password whenever you like.
                </MDTypography>
                <MDButton variant="outlined" color="info" fullWidth sx={{ mt: 3 }}>
                  Update password
                </MDButton>
              </Card>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
