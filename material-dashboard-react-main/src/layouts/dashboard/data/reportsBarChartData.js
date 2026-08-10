/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import tickets from "layouts/client/ticketData";

const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const counts = [0, 0, 0, 0, 0, 0, 0];
const now = new Date();
const sevenDaysAgo = new Date(now);
sevenDaysAgo.setDate(now.getDate() - 6);

tickets.forEach((t) => {
  const d = new Date(t.createdDate);
  if (isNaN(d) || d < sevenDaysAgo || d > now) return;
  const idx = (d.getDay() + 6) % 7;
  counts[idx] += 1;
});

export default {
  labels,
  datasets: { label: "New support requests", data: counts },
};
