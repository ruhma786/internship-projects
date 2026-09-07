import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AuditLogsPage from "./pages/admin/AuditLogsPage";
import ClientsPage from "./pages/admin/ClientsPage";
import ConsultantsPage from "./pages/admin/ConsultantsPage";
import NotificationsPage from "./pages/admin/NotificationsPage";
import ProjectManagersPage from "./pages/admin/ProjectManagersPage";
import QueriesPage from "./pages/admin/QueriesPage";
import ReportsPage from "./pages/admin/ReportsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import TicketsPage from "./pages/admin/TicketsPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import "./pages/auth/Auth.css";
import ClientDashboard from "./pages/client/ClientDashboard";
import ProjectManagerDashboard from "./pages/project-manager/ProjectManagerDashboard";
import ConsultantDashboard from "./pages/consultant/ConsultantDashboard";
import { getAuthSession } from "./utils/auth";

function ProtectedRoute({ children, allowedRoles }) {
  const session = getAuthSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(session.user.role)) {
    const redirectMap = {
      admin: '/admin',
      projectManager: '/project-manager',
      consultant: '/consultant',
      client: '/client',
    };

    return <Navigate to={redirectMap[session.user.role] || '/login'} replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="queries" element={<QueriesPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="clients" element={<ClientsPage />} />
          <Route path="project-managers" element={<ProjectManagersPage />} />
          <Route path="consultants" element={<ConsultantsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="audit-logs" element={<AuditLogsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        <Route path="/client" element={<ProtectedRoute allowedRoles={['client']}><ClientDashboard /></ProtectedRoute>} />
        <Route path="/project-manager" element={<ProtectedRoute allowedRoles={['projectManager']}><ProjectManagerDashboard /></ProtectedRoute>} />
        <Route path="/consultant" element={<ProtectedRoute allowedRoles={['consultant']}><ConsultantDashboard /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
