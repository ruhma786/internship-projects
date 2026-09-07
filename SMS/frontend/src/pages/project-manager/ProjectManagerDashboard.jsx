import RoleDashboardShell from '../../components/role/RoleDashboardShell';

const navItems = [
  { label: 'Overview', to: '/project-manager' },
  { label: 'Assignments', to: '/project-manager/assignments' },
  { label: 'Tickets', to: '/project-manager/tickets' },
  { label: 'Queries', to: '/project-manager/queries' },
  { label: 'Consultants', to: '/project-manager/consultants' },
];

function ProjectManagerDashboard() {
  return (
    <RoleDashboardShell title="Project Manager" subtitle="Project manager dashboard" navItems={navItems}>
      <div className="role-grid">
        <div className="role-card">
          <h3>Assigned tickets</h3>
          <p>Current ticket load managed by you.</p>
          <strong>15</strong>
        </div>
        <div className="role-card">
          <h3>Consultants</h3>
          <p>Active consultants under your supervision.</p>
          <strong>06</strong>
        </div>
        <div className="role-card">
          <h3>Urgent issues</h3>
          <p>Priority work requiring immediate routing.</p>
          <strong>03</strong>
        </div>
      </div>
    </RoleDashboardShell>
  );
}

export default ProjectManagerDashboard;
