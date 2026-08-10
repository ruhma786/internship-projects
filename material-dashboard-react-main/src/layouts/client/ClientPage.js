import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function ClientPage({ title, description, actionLabel, children }) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={9}>
            <Card>
              <MDBox p={3}>
                <MDTypography variant="h4" fontWeight="medium">
                  {title}
                </MDTypography>
                <MDTypography variant="body2" color="text" mt={1}>
                  {description}
                </MDTypography>
                {children && <MDBox mt={3}>{children}</MDBox>}
                {actionLabel && (
                  <MDBox mt={3}>
                    <MDButton variant="gradient" color="primary">
                      {actionLabel}
                    </MDButton>
                  </MDBox>
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

ClientPage.defaultProps = {
  actionLabel: "",
  children: null,
};

ClientPage.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  children: PropTypes.node,
};

export default ClientPage;
