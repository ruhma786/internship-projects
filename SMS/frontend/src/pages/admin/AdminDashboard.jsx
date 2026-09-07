import Dashboard from "../../components/admin/Dashboard";
import RecentActivity from "../../components/admin/RecentActivity";
import TeamWorkload from "../../components/admin/TeamWorkload";

import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <>
      <Dashboard />
      <div className="admin-activity-workload-row">
        <RecentActivity />
        <TeamWorkload />
      </div>
    </>
  );
}

export default AdminDashboard;
