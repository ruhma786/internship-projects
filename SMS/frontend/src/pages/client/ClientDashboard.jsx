import RoleDashboardShell from '../../components/role/RoleDashboardShell';

const navItems = [
  { label: 'Overview', to: '/client' },
  { label: 'Tickets', to: '/client/tickets' },
  { label: 'Queries', to: '/client/queries' },
  { label: 'Messages', to: '/client/messages' },
  { label: 'Notifications', to: '/client/notifications' },
];

function ClientDashboard() {
  return (
    <RoleDashboardShell title="Client" subtitle="Client dashboard" navItems={navItems}>
      <div className="role-grid">
        <div className="role-card">
          <h3>Open tickets</h3>
          <p>Active service requests assigned to your team.</p>
          <strong>08</strong>
        </div>
        <div className="role-card">
          <h3>Pending queries</h3>
          <p>Issues awaiting manager or consultant review.</p>
          <strong>05</strong>
        </div>
        <div className="role-card">
          <h3>Unread notifications</h3>
          <p>Recent updates from the support team.</p>
          <strong>12</strong>
        </div>
      </div>
    </RoleDashboardShell>
  );
}

export default ClientDashboard;
