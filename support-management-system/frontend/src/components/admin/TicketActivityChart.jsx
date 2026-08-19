import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ticketData = [
  { day: "Mon", tickets: 8 },
  { day: "Tue", tickets: 12 },
  { day: "Wed", tickets: 6 },
  { day: "Thu", tickets: 14 },
  { day: "Fri", tickets: 10 },
  { day: "Sat", tickets: 7 },
  { day: "Sun", tickets: 11 },
];

function TicketActivityChart() {
  return (
    <div className="chart-card">

      {/* Heading */}
      <div className="chart-header">
        <div>
          <h3>Ticket Activity</h3>

          <p>
            Support tickets received during the last week
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="chart-container">

        <ResponsiveContainer width="100%" height={260}>

          <BarChart
            data={ticketData}
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
              dataKey="day"
              tick={{ fontSize: 12 }}
            />

            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 12 }}
            />

            <Tooltip />

            <Bar
              dataKey="tickets"
              name="Tickets"
              fill="#c9141b"
              radius={[6, 6, 0, 0]}
              barSize={35}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default TicketActivityChart;