import RoleDashboardShell from '../../components/role/RoleDashboardShell';

const navItems = [
  { label: 'Overview', to: '/consultant' },
  { label: 'Assigned tickets', to: '/consultant/tickets' },
  { label: 'My queries', to: '/consultant/queries' },
  { label: 'Messages', to: '/consultant/messages' },
  { label: 'Notes', to: '/consultant/notes' },
];

function ConsultantDashboard() {
  return (
    <RoleDashboardShell title="Consultant" subtitle="Consultant dashboard" navItems={navItems}>
      <div className="role-grid">
        <div className="role-card">
          <h3>Open tasks</h3>
          <p>Active issues assigned to your queue.</p>
          <strong>09</strong>
        </div>
        <div className="role-card">
          <h3>Resolved</h3>
          <p>Successfully resolved service requests.</p>
          <strong>27</strong>
        </div>
        <div className="role-card">
          <h3>Pending review</h3>
          <p>Tickets awaiting your response.</p>
          <strong>04</strong>
        </div>
      </div>
    </RoleDashboardShell>
  );
}

export default ConsultantDashboard;
