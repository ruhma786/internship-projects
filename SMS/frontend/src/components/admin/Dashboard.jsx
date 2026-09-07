import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-content">

      {/* =====================================
          TOP ROW
      ===================================== */}
      <div className="dashboard-top-row">

        {/* LEFT SIDE */}
        <div className="dashboard-summary">

          {/* Big Metric */}
          <div className="metric-big">

            <div className="metric-number">
              360
            </div>

            <div className="metric-meta">

              <div className="metric-tag">
                ACTIVE TICKETS
              </div>

              <div className="greeting">
                Good morning, Admin 👋
              </div>

              <div className="metric-sub">
                Here's what needs your attention today.
              </div>

            </div>

          </div>

          {/* Indicators */}
          <div className="dashboard-indicators">

            <div className="dashboard-indicator indicator-blue">
              <div className="indicator-number">18</div>
              <div className="indicator-label">Queries</div>
            </div>

            <div className="dashboard-indicator indicator-purple">
              <div className="indicator-number">12</div>
              <div className="indicator-label">Unassigned</div>
            </div>

            <div className="dashboard-indicator indicator-red">
              <div className="indicator-number">7</div>
              <div className="indicator-label">SLA Risks</div>
            </div>

            <div className="dashboard-indicator indicator-amber">
              <div className="indicator-number">24</div>
              <div className="indicator-label">In Progress</div>
            </div>

          </div>

        </div>

        {/* =====================================
            NEEDS ATTENTION
        ===================================== */}
        <div className="needs-attention">

          <h2 className="attention-title">
            Needs Attention
          </h2>

          {/* Queries */}
          <div
            className="attention-item attention-blue"
            onClick={() => navigate("/admin/queries")}
            role="button"
            tabIndex={0}
          >

            <div className="attention-number">
              18
            </div>

            <div className="attention-text">

              <div className="attention-main">
                Queries awaiting review
              </div>

              <div className="attention-sub">
                3 urgent · 15 standard
              </div>

            </div>

            <div className="attention-arrow">
              →
            </div>

          </div>

          {/* Critical Tickets */}
          <div
            className="attention-item attention-red"
            onClick={() => navigate("/admin/tickets")}
            role="button"
            tabIndex={0}
          >

            <div className="attention-number">
              4
            </div>

            <div className="attention-text">

              <div className="attention-main">
                Critical tickets open
              </div>

              <div className="attention-sub">
                Immediate action needed
              </div>

            </div>

            <div className="attention-arrow">
              →
            </div>

          </div>

          {/* SLA */}
          <div
            className="attention-item attention-amber"
            onClick={() => navigate("/admin/tickets")}
            role="button"
            tabIndex={0}
          >

            <div className="attention-number">
              7
            </div>

            <div className="attention-text">

              <div className="attention-main">
                SLA breaches imminent
              </div>

              <div className="attention-sub">
                Less than 2 hours remaining
              </div>

            </div>

            <div className="attention-arrow">
              →
            </div>

          </div>

          {/* Unassigned */}
          <div
            className="attention-item attention-purple"
            onClick={() => navigate("/admin/tickets")}
            role="button"
            tabIndex={0}
          >

            <div className="attention-number">
              12
            </div>

            <div className="attention-text">

              <div className="attention-main">
                Unassigned tickets
              </div>

              <div className="attention-sub">
                Awaiting team assignment
              </div>

            </div>

            <div className="attention-arrow">
              →
            </div>

          </div>

        </div>

      </div>

      {/* =====================================
          BOTTOM ROW
      ===================================== */}
      <div className="dashboard-bottom-row">

        {/* LIVE PIPELINE */}
        <div className="pipeline-compact">

          <div className="pipeline-head">

            <div>

              <div className="pipeline-eyebrow">
                LIVE PIPELINE
              </div>

              <h2>
                Ticket Flow Status
                <span> · 328 active</span>
              </h2>

            </div>

            <button
              className="view-all-btn"
              onClick={() => navigate("/admin/tickets")}
            >
              View all →
            </button>

          </div>

          <div className="flow-rail">

            {/* New */}
            <div className="flow-stage">

              <div className="flow-number flow-blue">
                18
              </div>

              <div
                className="flow-bar bg-blue"
                style={{ height: "55px" }}
              ></div>

              <div className="flow-label">
                New
              </div>

              <div className="flow-chevron">
                ›
              </div>

            </div>

            {/* Assigned */}
            <div className="flow-stage">

              <div className="flow-number flow-purple">
                34
              </div>

              <div
                className="flow-bar bg-purple"
                style={{ height: "72px" }}
              ></div>

              <div className="flow-label">
                Assigned
              </div>

              <div className="flow-chevron">
                ›
              </div>

            </div>

            {/* In Progress */}
            <div className="flow-stage">

              <div className="flow-number flow-amber">
                47
              </div>

              <div
                className="flow-bar bg-amber"
                style={{ height: "88px" }}
              ></div>

              <div className="flow-label">
                In Progress
              </div>

              <div className="flow-chevron">
                ›
              </div>

            </div>

            {/* Pending */}
            <div className="flow-stage">

              <div className="flow-number flow-light-purple">
                29
              </div>

              <div
                className="flow-bar bg-light-purple"
                style={{ height: "68px" }}
              ></div>

              <div className="flow-label">
                Pending
              </div>

              <div className="flow-chevron">
                ›
              </div>

            </div>

            {/* Resolved */}
            <div className="flow-stage">

              <div className="flow-number flow-green">
                138
              </div>

              <div
                className="flow-bar bg-green"
                style={{ height: "150px" }}
              ></div>

              <div className="flow-label">
                Resolved
              </div>

              <div className="flow-chevron">
                ›
              </div>

            </div>

            {/* Closed */}
            <div className="flow-stage">

              <div className="flow-number flow-gray">
                62
              </div>

              <div
                className="flow-bar bg-gray"
                style={{ height: "92px" }}
              ></div>

              <div className="flow-label">
                Closed
              </div>

            </div>

          </div>

        </div>

        {/* HEALTH DISTRIBUTION */}
        <div className="health-section">

          <div className="health-title">
            Health Distribution
          </div>

          <div className="health-wrap">

            {/* Donut */}
            <div className="health-donut">

              <div className="donut-center">

                <div className="donut-number">
                  360
                </div>

                <div className="donut-label">
                  TOTAL
                </div>

              </div>

            </div>

            {/* Legend */}
            <div className="health-legend">

              <div className="health-item">
                <span className="health-dot dot-blue"></span>
                <span>Open</span>
                <strong>84</strong>
              </div>

              <div className="health-item">
                <span className="health-dot dot-amber"></span>
                <span>In Progress</span>
                <strong>47</strong>
              </div>

              <div className="health-item">
                <span className="health-dot dot-purple"></span>
                <span>Pending</span>
                <strong>29</strong>
              </div>

              <div className="health-item">
                <span className="health-dot dot-green"></span>
                <span>Resolved</span>
                <strong>138</strong>
              </div>

              <div className="health-item">
                <span className="health-dot dot-gray"></span>
                <span>Closed</span>
                <strong>62</strong>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;