import './RoleDashboardShell.css';
import { clearAuthSession, getRoleRedirect, getAuthSession } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

function RoleDashboardShell({ title, subtitle, navItems, children }) {
  const navigate = useNavigate();
  const session = getAuthSession();

  const handleLogout = () => {
    clearAuthSession();
    navigate('/login');
  };

  return (
    <div className="role-dashboard-shell">
      <aside className="role-sidebar">
        <div className="role-brand">
          <span className="brand-dot" />
          SMS Portal
        </div>

        <div className="user-badge">
          <strong>{session?.user?.name || 'User'}</strong>
          <span>{session?.user?.role || 'Role'}</span>
        </div>

        <nav className="role-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="nav-button"
              onClick={() => navigate(item.to)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button type="button" className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="role-content">
        <header className="role-header">
          <div>
            <p className="eyebrow">{title}</p>
            <h1>{subtitle}</h1>
          </div>
          <button
            type="button"
            className="link-button"
            onClick={() => navigate(getRoleRedirect(session?.user?.role))}
          >
            Go to dashboard
          </button>
        </header>

        <div className="role-main-panel">{children}</div>
      </main>
    </div>
  );
}

export default RoleDashboardShell;
