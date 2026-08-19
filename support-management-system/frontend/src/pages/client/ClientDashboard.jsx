import ClientSidebar from "../../components/Client/ClientSidebar";
import ClientTopNavbar from "../../components/Client/ClientTopNavbar";
import ClientStatsCards from "../../components/Client/ClientStatsCards";
import ClientRecentTickets from "../../components/Client/ClientRecentTickets";

import "./ClientDashboard.css";


function ClientDashboard() {
  return (
    <div className="client-dashboard">

      {/* Sidebar */}
      <ClientSidebar />

      {/* Main Content */}
      <div className="client-main">

        {/* Top Navbar */}
        <ClientTopNavbar />

        {/* Dashboard Content */}
        <main className="client-content">

          {/* Page Heading */}
          <div className="dashboard-heading">
            <h1>Client Dashboard</h1>
          </div>

          {/* Statistics */}
          <ClientStatsCards />

          {/* Recent Tickets */}
          <ClientRecentTickets />

        </main>

      </div>

    </div>
  );
}


export default ClientDashboard;