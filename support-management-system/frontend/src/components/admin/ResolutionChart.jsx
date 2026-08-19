import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const resolutionData = [
  {
    month: "Jan",
    resolved: 18,
  },
  {
    month: "Feb",
    resolved: 22,
  },
  {
    month: "Mar",
    resolved: 20,
  },
  {
    month: "Apr",
    resolved: 28,
  },
  {
    month: "May",
    resolved: 32,
  },
  {
    month: "Jun",
    resolved: 35,
  },
  {
    month: "Jul",
    resolved: 41,
  },
  {
    month: "Aug",
    resolved: 45,
  },
];

function ResolutionChart() {
  return (
    <div className="chart-card">

      {/* ================= CHART HEADER ================= */}

      <div className="chart-header">

        <div>
          <h3>Resolution Progress</h3>

          <p>
            Tickets resolved over time
          </p>
        </div>

      </div>


      {/* ================= LINE CHART ================= */}

      <div className="chart-container">

        <ResponsiveContainer width="100%" height={260}>

          <LineChart
            data={resolutionData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 5,
            }}
          >

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="month"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="resolved"
              name="Resolved Tickets"
              stroke="#16a34a"
              strokeWidth={3}
              dot={{
                r: 4,
              }}
              activeDot={{
                r: 6,
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default ResolutionChart;