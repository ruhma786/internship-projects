import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ClientDashboard from "../pages/ClientDashboard/ClientDashboard";
import CreateTicket from "../pages/CreateTicket/CreateTicket";
import MyTickets from "../pages/MyTickets/MyTickets";
import Messages from "../pages/Messages/Messages";
import Profile from "../pages/Profile/Profile";
import Notifications from "../pages/Notifications/Notifications";
import Settings from "../pages/Settings/Settings";
import TicketDetails from "../pages/TicketDetails/TicketDetails";

function AppRoutes() {

  return (

    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/client-dashboard"
        element={<ClientDashboard />}
      />

      <Route
        path="/create-ticket"
        element={<CreateTicket />}
      />

      <Route
        path="/my-tickets"
        element={<MyTickets />}
      />

      <Route
        path="/ticket-details/:ticketId"
        element={<TicketDetails />}
      />

      <Route
        path="/messages"
        element={<Messages />}
      />

      <Route
        path="/notifications"
        element={<Notifications />}
      />

      <Route
        path="/profile"
        element={<Profile />}
      />

      <Route
        path="/settings"
        element={<Settings />}
      />

    </Routes>

  );

}

export default AppRoutes;