/**
=========================================================
* Material Dashboard 2 React - Settings Page
=========================================================

This page implements account settings per user request: notification preferences, privacy, security, and account deletion.
*/

import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Switch from "@mui/material/Switch";

// Layout
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);

  const handleSave = () => {
    // In a real app, persist settings to server. For now just show console message.
    // eslint-disable-next-line no-console
    console.log("Saved settings:", { emailNotifications, smsNotifications });
  };

  const handleLogout = () => {
    // Navigate to login page by replacing location (keeps it simple without adding router dependency here)
    window.location.href = "/authentication/sign-in";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <MDBox p={3} display="flex" justifyContent="space-between" alignItems="center">
                <MDBox>
                  <MDTypography variant="h4" fontWeight="medium">
                    Settings
                  </MDTypography>
                  <MDTypography variant="button" color="text" fontWeight="regular">
                    Account preferences and notification settings
                  </MDTypography>
                </MDBox>
                <MDBox display="flex" gap={1}>
                  <MDButton
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      setEmailNotifications(true);
                      setSmsNotifications(false);
                    }}
                  >
                    Reset
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Notification Preferences
                </MDTypography>
                <MDBox mt={2} display="flex" alignItems="center" justifyContent="space-between">
                  <MDBox>
                    <MDTypography variant="button" fontWeight="regular">
                      Email Notifications
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      Receive notifications about ticket updates via email.
                    </MDTypography>
                  </MDBox>
                  <Switch
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications((s) => !s)}
                  />
                </MDBox>
                <MDBox mt={2} display="flex" alignItems="center" justifyContent="space-between">
                  <MDBox>
                    <MDTypography variant="button" fontWeight="regular">
                      SMS Notifications
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      Receive critical alerts via SMS.
                    </MDTypography>
                  </MDBox>
                  <Switch
                    checked={smsNotifications}
                    onChange={() => setSmsNotifications((s) => !s)}
                  />
                </MDBox>

                <MDBox display="flex" justifyContent="flex-end" gap={1} mt={3}>
                  <MDButton
                    variant="outlined"
                    color="dark"
                    onClick={() => {
                      setEmailNotifications(true);
                      setSmsNotifications(false);
                    }}
                  >
                    Cancel
                  </MDButton>
                  <MDButton variant="gradient" color="success" onClick={handleSave}>
                    Save Settings
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>

            <Card sx={{ mt: 3 }}>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Security
                </MDTypography>
                <MDBox mt={2}>
                  <MDTypography variant="button" fontWeight="regular">
                    Change password and security preferences.
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Privacy
                </MDTypography>
                <MDBox mt={2}>
                  <MDTypography variant="button" fontWeight="regular">
                    Manage your data sharing and visibility settings.
                  </MDTypography>
                </MDBox>
              </MDBox>
            </Card>

            <Card sx={{ mt: 3 }}>
              <MDBox p={3}>
                <MDTypography variant="h6" fontWeight="medium">
                  Delete Account
                </MDTypography>
                <MDBox mt={2} display="flex" justifyContent="space-between" alignItems="center">
                  <MDBox>
                    <MDTypography variant="button" fontWeight="regular">
                      Permanently delete your account and data.
                    </MDTypography>
                    <MDTypography variant="caption" color="text">
                      This action cannot be undone.
                    </MDTypography>
                  </MDBox>
                  <MDButton variant="outlined" color="error">
                    Delete Account
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>

            <Card sx={{ mt: 3 }}>
              <MDBox p={3} display="flex" justifyContent="space-between" alignItems="center">
                <MDTypography variant="button" fontWeight="regular">
                  Logout
                </MDTypography>
                <MDButton variant="gradient" color="dark" onClick={handleLogout}>
                  Logout
                </MDButton>
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Settings;
