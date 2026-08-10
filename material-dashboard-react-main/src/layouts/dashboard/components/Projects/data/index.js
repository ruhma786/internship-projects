import MDBox from "components/MDBox";
import MDBadge from "components/MDBadge";
import MDProgress from "components/MDProgress";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

const Status = ({ color, children }) => (
  <MDBadge badgeContent={children} color={color} variant="gradient" size="sm" container />
);

const Progress = ({ value, color = "info" }) => (
  <MDBox width="8rem" textAlign="left">
    <MDProgress value={value} color={color} variant="gradient" label={false} />
  </MDBox>
);

const Text = ({ children }) => (
  <MDTypography variant="caption" color="text" fontWeight="medium">
    {children}
  </MDTypography>
);

Status.propTypes = {
  color: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

Progress.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

Text.propTypes = {
  children: PropTypes.node.isRequired,
};

export default function data() {
  return {
    columns: [
      { Header: "ticket", accessor: "ticket", width: "35%", align: "left" },
      { Header: "client", accessor: "client", align: "left" },
      { Header: "assigned to", accessor: "assignee", align: "left" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "progress", accessor: "progress", align: "center" },
    ],
    rows: [
      {
        ticket: <Text>#SUP-1048 — Unable to access dashboard</Text>,
        client: <Text>Sarah Ahmed</Text>,
        assignee: <Text>Admin review</Text>,
        status: <Status color="warning">Pending review</Status>,
        progress: <Progress value={10} color="warning" />,
      },
      {
        ticket: <Text>#SUP-1045 — Payment page error</Text>,
        client: <Text>Ali Raza</Text>,
        assignee: <Text>Hassan Ali (PM)</Text>,
        status: <Status color="info">With project manager</Status>,
        progress: <Progress value={35} />,
      },
      {
        ticket: <Text>#SUP-1039 — Report export is failing</Text>,
        client: <Text>BlueTech Ltd.</Text>,
        assignee: <Text>Ayesha Khan (Consultant)</Text>,
        status: <Status color="primary">In progress</Status>,
        progress: <Progress value={70} color="primary" />,
      },
      {
        ticket: <Text>#SUP-1036 — User permission update</Text>,
        client: <Text>Fahad Iqbal</Text>,
        assignee: <Text>Umair Shah (Consultant)</Text>,
        status: <Status color="success">Resolved</Status>,
        progress: <Progress value={100} color="success" />,
      },
    ],
  };
}
