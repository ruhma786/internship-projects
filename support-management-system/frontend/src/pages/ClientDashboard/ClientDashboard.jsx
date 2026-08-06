import "./ClientDashboard.css";

import Sidebar from "../../components/Sidebar/Sidebar";

import TopNavbar from "../../components/TopNavbar/TopNavbar";

import DashboardCards from "../../components/DashboardCards/DashboardCards";

import QuickActions from "../../components/QuickActions/QuickActions";

import RecentTickets from "../../components/RecentTickets/RecentTickets";

import Notifications from "../../components/Notifications/Notifications";

import ProfileSummary from "../../components/ProfileSummary/ProfileSummary";


function ClientDashboard() {

    return (

        <div className="dashboard">

            <Sidebar />

            <div className="dashboard-content">

                <TopNavbar />

                         <h1>Welcome Client 👋</h1>

                <p>
                 Manage your support tickets from here.
                </p>

                <DashboardCards />

                <QuickActions />

                <RecentTickets />

                <div className="bottom-section">

                <Notifications />

                <ProfileSummary />

                </div>


            </div>

        </div>

    );

}

export default ClientDashboard;