import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminTopNavbar from "../../components/admin/AdminTopNavbar";
import TicketActivityChart from "../../components/admin/TicketActivityChart";
import TicketStatusChart from "../../components/admin/TicketStatusChart";
import ResolutionChart from "../../components/admin/ResolutionChart";
import RecentTickets from "../../components/admin/RecentTickets";
import RecentUpdates from "../../components/admin/RecentUpdates";
import AdminStatsCards from "../../components/admin/AdminStatsCards";
import "./AdminDashboard.css";
function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="admin-main">

        {/* Top Navbar */}
        <AdminTopNavbar />

        {/* Dashboard Content */}
        <main className="admin-content">

          {/* Page Heading */}
          <div className="dashboard-heading">
         { /*  <p>Home / Dashboard</p>*/}
            <h1>Admin Dashboard</h1>
          </div>

          {/* Statistics */}
         {/* <AdminStats />*/}
          <AdminStatsCards />

          {/* Charts */}
          <div className="charts-row">

            <TicketActivityChart />

            <TicketStatusChart />

            <ResolutionChart />

          </div>

          {/* Bottom Section */}
          <div>

            <RecentTickets />

          </div>
          <div>
             <RecentUpdates />
          </div>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;