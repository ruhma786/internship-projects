import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function CreateTicket() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
                mx={2}
                mt={-3}
                p={3}
              >
                <MDBox display="flex" alignItems="center">
                  <MDBox
                    display="grid"
                    placeItems="center"
                    width="3rem"
                    height="3rem"
                    borderRadius="lg"
                    bgColor="white"
                    color="primary"
                    mr={2}
                  >
                    <Icon fontSize="medium">confirmation_number</Icon>
                  </MDBox>
                  <MDBox>
                    <MDTypography variant="h4" color="white" fontWeight="medium">
                      Create Ticket
                    </MDTypography>
                    <MDTypography variant="button" color="white" opacity={0.8}>
                      Submit your issue and we will take care of it.
                    </MDTypography>
                  </MDBox>
                </MDBox>
              </MDBox>

              <MDBox p={3} pt={4} component="form" onSubmit={handleSubmit}>
                <MDTypography variant="h6" fontWeight="medium" mb={0.5}>
                  Tell us about the issue
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  Your request is sent to the administrator for verification before assignment.
                </MDTypography>

                <MDBox mt={3}>
                  <MDInput label="Ticket Subject" required fullWidth />
                </MDBox>
                <Grid container spacing={2} mt={0.5}>
                  <Grid item xs={12} md={6}>
                    <MDInput select label="Issue Category" defaultValue="" required fullWidth>
                      <MenuItem value="" disabled>
                        Select a category
                      </MenuItem>
                      <MenuItem value="technical">Technical issue</MenuItem>
                      <MenuItem value="account">Account & access</MenuItem>
                      <MenuItem value="billing">Billing & payment</MenuItem>
                      <MenuItem value="feature">Feature request</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </MDInput>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <MDInput select label="Priority" defaultValue="medium" required fullWidth>
                      <MenuItem value="low">Low — general question</MenuItem>
                      <MenuItem value="medium">Medium — work is affected</MenuItem>
                      <MenuItem value="high">High — urgent issue</MenuItem>
                    </MDInput>
                  </Grid>
                </Grid>
                <MDBox mt={2}>
                  <MDInput
                    label="Description"
                    placeholder="Please include the issue details, any error message, and the steps you took before it happened."
                    multiline
                    rows={6}
                    required
                    fullWidth
                  />
                </MDBox>

                <MDBox
                  mt={2}
                  p={2}
                  borderRadius="lg"
                  sx={{ border: "1px dashed #C1282A", backgroundColor: "#fff7f7" }}
                >
                  <MDBox display="flex" alignItems="center">
                    <Icon color="primary">attach_file</Icon>
                    <MDBox ml={1.5}>
                      <MDTypography variant="button" fontWeight="medium">
                        Attachment
                      </MDTypography>
                      <MDTypography display="block" variant="caption" color="text">
                        File uploads will be available soon.
                      </MDTypography>
                    </MDBox>
                  </MDBox>
                </MDBox>

                {submitted && (
                  <MDBox mt={2} p={1.5} borderRadius="lg" bgColor="light">
                    <MDTypography variant="button" color="primary" fontWeight="medium">
                      Your ticket has been submitted for administrator review.
                    </MDTypography>
                  </MDBox>
                )}
                <MDBox mt={3} display="flex" justifyContent="flex-end">
                  <MDButton type="submit" variant="gradient" color="primary">
                    Submit Ticket
                  </MDButton>
                </MDBox>
              </MDBox>
            </Card>
          </Grid>

          <Grid item xs={12} lg={3}>
            <Card sx={{ height: "100%" }}>
              <MDBox p={3}>
                <MDBox display="flex" alignItems="center" mb={2}>
                  <Icon color="primary">account_tree</Icon>
                  <MDTypography variant="h6" fontWeight="medium" ml={1}>
                    What happens next?
                  </MDTypography>
                </MDBox>
                <MDTypography variant="button" color="text" display="block" mb={2}>
                  1. Admin verifies your support request.
                </MDTypography>
                <MDTypography variant="button" color="text" display="block" mb={2}>
                  2. A project manager assigns it to the right consultant.
                </MDTypography>
                <MDTypography variant="button" color="text" display="block">
                  3. You receive updates until the issue is resolved.
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

export default CreateTicket;
