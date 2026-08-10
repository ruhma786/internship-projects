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

const months = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function monthAbbrev(date) {
  return date.toLocaleString("en-US", { month: "short" });
}

const salesData = months.map(
  (m) =>
    tickets.filter((t) => {
      const d = new Date(t.createdDate);
      return (
        !isNaN(d) && monthAbbrev(d) === m && t.status && t.status.toLowerCase().includes("resolved")
      );
    }).length
);

const tasksData = months.map(
  (m) =>
    tickets.filter((t) => {
      const d = new Date(t.createdDate);
      if (isNaN(d)) return false;
      const isResolved = t.status && t.status.toLowerCase().includes("resolved");
      return monthAbbrev(d) === m && !isResolved;
    }).length
);

export default {
  sales: {
    labels: months,
    datasets: { label: "Resolved tickets", data: salesData },
  },
  tasks: {
    labels: months,
    datasets: { label: "Open assignments", data: tasksData },
  },
};
