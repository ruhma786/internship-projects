import "./TeamWorkload.css";

const teamMembers = [
  { initials: "SC", name: "Sarah Chen", open: 8, active: 12, load: 74, role: "PM", tone: "blue" },
  { initials: "MW", name: "Marcus Webb", open: 5, active: 9, load: 58, role: "Consultant", tone: "purple" },
  { initials: "PN", name: "Priya Nair", open: 11, active: 7, load: 82, role: "PM", tone: "red" },
  { initials: "JO", name: "James Okafor", open: 3, active: 14, load: 63, role: "Consultant", tone: "amber" },
  { initials: "LH", name: "Leila Hassan", open: 6, active: 5, load: 41, role: "PM", tone: "green" },
];

function TeamWorkload() {
  return (
    <section className="team-workload" aria-labelledby="team-workload-title">
      <h2 id="team-workload-title" className="team-workload-title">Team Workload</h2>

      <div className="team-workload-list">
        {teamMembers.map((member) => (
          <article className="team-member" key={member.name}>
            <div className={`team-avatar ${member.tone}`} aria-hidden="true">
              {member.initials}
            </div>

            <div className="team-member-details">
              <h3>{member.name}</h3>
              <p>{member.open} open <span>·</span> {member.active} active</p>
              <div
                className="workload-track"
                role="progressbar"
                aria-label={`${member.name}'s workload`}
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow={member.load}
              >
                <span className={`workload-fill ${member.tone}`} style={{ width: `${member.load}%` }} />
              </div>
            </div>

            <div className={`team-member-load ${member.tone}`}>
              <strong>{member.load}%</strong>
              <span>{member.role}</span>
            </div>
          </article>
        ))}
      </div>

     <footer className="team-workload-summary">
  <div>
    <strong className="summary-load-amber">64%</strong>
    <span>Avg Load</span>
  </div>

  <div>
    <strong className="summary-load-blue">33</strong>
    <span>Open</span>
  </div>

  <div>
    <strong className="summary-load-green">47</strong>
    <span>Active</span>
  </div>
</footer>
    </section>
  );
}

export default TeamWorkload;
