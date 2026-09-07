import "./RecentActivity.css";

function RecentActivity() {
  const activities = [
    {
      id: 1,
      color: "green",
      text: (
        <>
          Ticket <strong>#4821</strong> approved by Admin
        </>
      ),
      time: "2m ago",
    },
    {
      id: 2,
      color: "blue",
      text: (
        <>
          Ticket <strong>#4819</strong> assigned to Marcus Webb
        </>
      ),
      time: "11m ago",
    },
    {
      id: 3,
      color: "amber",
      text: (
        <>
          Status changed to <strong>"In Progress"</strong> —{" "}
          <strong>#4812</strong>
        </>
      ),
      time: "34m ago",
    },
    {
      id: 4,
      color: "purple",
      text: (
        <>
          New comment added on Ticket <strong>#4807</strong>
        </>
      ),
      time: "1h ago",
    },
    {
      id: 5,
      color: "red",
      text: (
        <>
          SLA breach risk escalated — Ticket <strong>#4801</strong>
        </>
      ),
      time: "2h ago",
    },
    {
      id: 6,
      color: "gray",
      text: (
        <>
          Ticket <strong>#4796</strong> closed by Sarah Chen
        </>
      ),
      time: "3h ago",
    },
    {
      id: 7,
      color: "green",
      text: (
        <>
          Ticket <strong>#4790</strong> resolved and approved
        </>
      ),
      time: "5h ago",
    },
  ];

  return (
    <section className="recent-activity">
      <h2 className="recent-activity-title">
        Recent Activity
      </h2>

      <div className="activity-timeline">
        {activities.map((activity) => (
          <div className="recent-activity-item" key={activity.id}>
            
            <div className={`activity-dot ${activity.color}`}></div>

            <div className="activity-text">
              {activity.text}
            </div>

            <div className="activity-time">
              {activity.time}
            </div>

          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentActivity;