import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";


// ================= CLIENT =================
import ClientDashboard from "../pages/client/ClientDashboard";

import ProjectManagerDashboard from "../pages/ProjectManager/ProjectManagerDashboard";
// ================= ADMIN =================
import AdminDashboard from "../pages/admin/AdminDashboard";
import TicketManagement from "../pages/admin/TicketManagement";
import TicketDetails from "../pages/admin/TicketDetails";
import ProjectManagerAssignment from "../pages/admin/ProjectManagerAssignment";


function AppRoutes() {

    return (

        <Routes>

            {/* =================================================
                GENERAL ROUTES
            ================================================= */}

            <Route
                path="/"
                element={<Home />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* =================================================
                ADMIN DASHBOARD
            ================================================= */}

            <Route
                path="/admin-dashboard"
                element={<AdminDashboard />}
            />


            {/* =================================================
                ADMIN TICKET MANAGEMENT
            ================================================= */}

            <Route
                path="/tickets"
                element={<TicketManagement />}
            />


            {/* =================================================
                TICKET DETAILS
            ================================================= */}

            <Route
                path="/tickets/:ticketId"
                element={<TicketDetails />}
            />


            {/* =================================================
                PROJECT MANAGER ASSIGNMENT
            ================================================= */}

            <Route
                path="/assign-project-manager/:ticketId"
                element={<ProjectManagerAssignment />}
            />


            {/* =================================================
                CLIENT DASHBOARD
            ================================================= */}

            <Route
                path="/client-dashboard"
                element={<ClientDashboard />}
            />

        

         {/* Project Manager */}
        <Route
          path="/project-manager-dashboard"
          element={<ProjectManagerDashboard />}
        />
        </Routes>
    );

}


export default AppRoutes;