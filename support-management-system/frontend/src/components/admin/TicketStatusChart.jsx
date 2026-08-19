import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const statusData = [
  {
    name: "Pending Review",
    value: 5,
  },
  {
    name: "In Progress",
    value: 8,
  },
  {
    name: "Resolved",
    value: 12,
  },
  {
    name: "Closed",
    value: 10,
  },
];

const COLORS = [
  "#f59e0b",
  "#3b82f6",
  "#16a34a",
  "#64748b",
];

function TicketStatusChart() {
  return (
    <div className="chart-card">

      {/* ================= CHART HEADER ================= */}

      <div className="chart-header">

        <div>
          <h3>Ticket Status</h3>

          <p>
            Current distribution of support tickets
          </p>
        </div>

      </div>


      {/* ================= PIE CHART ================= */}

      <div className="chart-container">

        <ResponsiveContainer width="100%" height={260}>

          <PieChart>

            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="45%"
              outerRadius={85}
              innerRadius={45}
              paddingAngle={3}
              label
            >

              {statusData.map((entry, index) => (

                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />

              ))}

            </Pie>


            {/* Tooltip */}

            <Tooltip />


            {/* Legend */}

            <Legend
              verticalAlign="bottom"
              height={36}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default TicketStatusChart;