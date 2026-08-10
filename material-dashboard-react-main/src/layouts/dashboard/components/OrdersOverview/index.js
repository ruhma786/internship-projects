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

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";

function OrdersOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Recent updates
        </MDTypography>
        <MDBox mt={0} mb={2}>
          <MDTypography variant="button" color="text" fontWeight="regular">
            <MDTypography display="inline" variant="body2" verticalAlign="middle">
              <Icon sx={{ color: ({ palette: { success } }) => success.main }}>arrow_upward</Icon>
            </MDTypography>
            &nbsp;
            <MDTypography variant="button" color="text" fontWeight="medium">
              18%
            </MDTypography>{" "}
            faster resolution this week
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="#SUP-1042 resolved by Ayesha Khan"
          dateTime="Today, 10:20 AM"
        />
        <TimelineItem
          color="error"
          icon="priority_high"
          title="#SUP-1048 marked urgent by admin"
          dateTime="Today, 9:45 AM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="#SUP-1045 assigned to Project Manager"
          dateTime="Today, 9:15 AM"
        />
        <TimelineItem
          color="warning"
          icon="support_agent"
          title="Consultant added an update to #SUP-1039"
          dateTime="Yesterday, 4:30 PM"
        />
        <TimelineItem
          color="primary"
          icon="person_add"
          title="New client query received: login issue"
          dateTime="Yesterday, 2:10 PM"
          lastItem
        />
      </MDBox>
    </Card>
  );
}

export default OrdersOverview;
