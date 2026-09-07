import "./AdminSidebar.css";
import { NavLink } from "react-router-dom";

const navItemClass = ({ isActive }) =>
  `admin-sidebar-item${isActive ? " active" : ""}`;

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">

      {/* Logo */}
      <div className="admin-logo">
        <span>⚡</span>
      </div>

      {/* Navigation */}
      <nav className="admin-sidebar-nav">

        {/* Dashboard */}
        <NavLink
          to="/admin"
          end
          className={navItemClass}
          title="Dashboard"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        </NavLink>

        {/* Queries */}
        <NavLink
          to="/admin/queries"
          className={navItemClass}
          title="Queries"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12h4l2 3h6l2-3h4" />
            <path d="M5 12 3.5 6.5A2 2 0 0 1 5.4 4h13.2a2 2 0 0 1 1.9 2.5L19 12" />
            <path d="M3 12v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6" />
          </svg>

          <span className="notification-dot"></span>
        </NavLink>

        {/* Tickets */}
        <NavLink
          to="/admin/tickets"
          className={navItemClass}
          title="Tickets"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3Z" />
            <path d="M10 7v10" strokeDasharray="2 2" />
          </svg>

          <span className="notification-dot"></span>
        </NavLink>

        {/* Clients / Users */}
        <NavLink
          to="/admin/clients"
          className={navItemClass}
          title="Clients"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="8" r="3.2" />
            <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
            <circle cx="17.5" cy="9" r="2.4" />
            <path d="M15.7 14a5 5 0 0 1 5.3 5" />
          </svg>
        </NavLink>

        {/* Project Managers */}
        <NavLink
          to="/admin/project-managers"
          className={navItemClass}
          title="Project Managers"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
            <path d="M18 4v4" />
            <path d="M16 6h4" />
          </svg>
        </NavLink>

        {/* Consultants */}
        <NavLink
          to="/admin/consultants"
          className={navItemClass}
          title="Consultants"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="8" r="3" />
            <path d="M5 20c0-3.9 3.1-7 7-7s7 3.1 7 7" />
            <path d="M19 5l2 2-4 4-2-2z" />
          </svg>
        </NavLink>

        {/* Reports */}
        <NavLink
          to="/admin/reports"
          className={navItemClass}
          title="Reports"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 20V10" />
            <path d="M12 20V4" />
            <path d="M20 20v-7" />
          </svg>
        </NavLink>

        {/* Notifications */}
        <NavLink
          to="/admin/notifications"
          className={navItemClass}
          title="Notifications"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>

          <span className="notification-badge">5</span>
        </NavLink>

        {/* Audit Logs */}
        <NavLink
          to="/admin/audit-logs"
          className={navItemClass}
          title="Audit Logs"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="5" y="3" width="14" height="18" rx="2" />
            <path d="M9 8h6" />
            <path d="M9 12h6" />
            <path d="M9 16h3" />
          </svg>
        </NavLink>

        {/* Settings */}
        <NavLink
          to="/admin/settings"
          className={navItemClass}
          title="Settings"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 13.5a1.65 1.65 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.65 1.65 0 0 0-1.8-.3 1.65 1.65 0 0 0-1 1.5V19a2 2 0 1 1-4 0v-.1a1.65 1.65 0 0 0-1-1.5 1.65 1.65 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.65 1.65 0 0 0 .3-1.8 1.65 1.65 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.65 1.65 0 0 0 1.5-1 1.65 1.65 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.65 1.65 0 0 0 1.8.3H9a1.65 1.65 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a2 2 0 0 0 1 1.5 1.65 1.65 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.65 1.65 0 0 0-.3 1.8V9a1.65 1.65 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.65 1.65 0 0 0-1.5 1Z" />
          </svg>
        </NavLink>

      </nav>

      {/* Admin Avatar */}
      <div className="admin-avatar" title="Admin Profile">
        AD
      </div>

    </aside>
  );
}

export default AdminSidebar;
