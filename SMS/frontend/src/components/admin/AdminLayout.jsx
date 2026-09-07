
// 🔴 UPDATED: useLocation import kiya
import { Outlet, useLocation } from "react-router-dom";

import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import "../../pages/admin/AdminDashboard.css";

function AdminLayout() {

  // 🔴 UPDATED: current route/path get karne ke liye
  const location = useLocation();

  // =========================================================
  // 🔴🔴 TOPBAR HIDE PAGES
  // =========================================================
  // Yahan jis route ko add karogi, us page par Topbar hide ho jayega.
  //
  // Example:
  // "/admin/clients"
  // "/admin/tickets"
  //
  // Client Workspace bhi /clients/ ke andar hai,
  // isliye "/admin/clients" se automatically cover ho jayega.
  // =========================================================

  const hideTopbarRoutes = [
    
    "/admin/tickets",
  ];

  // 🔴 UPDATED:
  // Check karega current page hide list mein hai ya nahi.
  const hideTopbar = hideTopbarRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="admin-dashboard">

      <AdminSidebar />

      <div className="admin-main">

        {/* =====================================================
            🔴 UPDATED: TOPBAR CONDITIONAL
            ===================================================== */}

        {!hideTopbar && <AdminTopbar />}

        <main className="admin-dashboard-content">
          <Outlet />
        </main>

      </div>
    </div>
  );
}

export default AdminLayout;

