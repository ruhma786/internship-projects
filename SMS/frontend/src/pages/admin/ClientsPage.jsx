import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import "./ClientsPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

function ClientsPage() {
  const tableRef = useRef(null);

  const [records, setRecords] = useState([]);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [company, setCompany] = useState("All");
  const [toast, setToast] = useState("");

  const fetchClients = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users`, {
        params: { role: "client" },
      });

      if (Array.isArray(data)) {
        const mapped = data.map((user) => ({
          id: user._id || user.id,
          name: user.name,
          initials: user.name
            .split(" ")
            .slice(0, 2)
            .map((part) => part[0])
            .join("")
            .toUpperCase(),
          tone: "red",
          type: "Enterprise",
          company: user.company || "Client Company",
          email: user.email,
          phone: user.phone || "+92 300 0000000",
          open: 0,
          activity: "Just now",
          activityLabel: "Account synced",
          status: user.status || "Active",
          tickets: 0,
          enquiries: 0,
          registered: user.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "Recently",
          manager: "Unassigned",
          consultant: "Unassigned",
        }));

        setRecords(mapped);
        return;
      }

      setRecords([]);
    } catch (error) {
      console.error("Failed to load clients from backend:", error);
      setRecords([]);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  /* =========================================================
     FILTERED CLIENTS
  ========================================================== */

  const visible = useMemo(() => {
    return records.filter((client) => {
      const matchesSearch =
        !search ||
        [
          client.name,
          client.email,
          client.company,
          client.id,
        ].some((value) =>
          value.toLowerCase().includes(search.toLowerCase())
        );

      const accountStatus =
        client.status === "Inactive"
          ? "Inactive"
          : "Active";

      const matchesStatus =
        status === "All" ||
        accountStatus === status;

      const matchesCompany =
        company === "All" ||
        client.company === company;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesCompany
      );
    });
  }, [records, search, status, company]);

  /* =========================================================
     EXPORT CSV
  ========================================================== */

  const exportCsv = () => {
    const rows = [
      [
        "Client ID",
        "Client",
        "Company",
        "Email",
        "Phone",
        "Open Tickets",
        "Status",
      ],

      ...visible.map((client) => [
        client.id,
        client.name,
        client.company,
        client.email,
        client.phone,
        client.open,
        client.status === "Inactive"
          ? "Inactive"
          : "Active",
      ]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) =>
            `"${String(value).replaceAll('"', '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const link = document.createElement("a");

    link.href = URL.createObjectURL(
      new Blob([csv], {
        type: "text/csv;charset=utf-8;",
      })
    );

    link.download = "clients.csv";
    link.click();

    URL.revokeObjectURL(link.href);
  };

  /* =========================================================
     SHOW TOAST NOTIFICATION
  ========================================================== */

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 3000);
  };

  /* =========================================================
     DELETE CLIENT
  ========================================================== */

  const handleDeleteClient = async (clientId) => {
    if (!window.confirm("Are you sure you want to delete this client? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/users/${clientId}`);
      setRecords((items) => items.filter((item) => item.id !== clientId));
      showToast("Client deleted successfully");
    } catch (error) {
      console.error("Failed to delete client:", error);
      showToast("Failed to delete client");
    }
  };

  /* =========================================================
     UPDATE CLIENT
  ========================================================== */

  const update = (changes) => {
    if (!selected) return;

    setRecords((items) =>
      items.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              ...changes,
            }
          : item
      )
    );

    setSelected((item) => ({
      ...item,
      ...changes,
    }));
  };

  /* =========================================================
     BACK TO CLIENT DIRECTORY
  ========================================================== */

  const handleBack = () => {
    setSelected(null);

    setTimeout(() => {
      tableRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 0);
  };

  /* =========================================================
     CLIENT WORKSPACE
  ========================================================== */

  if (selected) {
    return (
      <ClientWorkspace
        client={selected}
        onChange={update}
        onBack={handleBack}
      />
    );
  }

  /* =========================================================
     CLIENT DIRECTORY
  ========================================================== */

  return (
    <div className="clients-page">

      {/* =====================================================
          PAGE HEADER
      ====================================================== */}

      <header className="clients-header">

        <div>

          <p>
            <i />
            Client management
          </p>

          <h1>
            Clients
          </h1>

          <span>
            View client accounts, support activity, tickets and
            account access status.
          </span>

        </div>

        <button
          type="button"
          onClick={exportCsv}
        >
          Export CSV
        </button>

      </header>


      {/* =====================================================
          CLIENT OVERVIEW
      ====================================================== */}

      <section className="clients-overview">

        <div>
          <b>
            {records.length}
          </b>

          <span>
            Total Clients
          </span>

          <em>
            +8.4%
          </em>
        </div>


        <div>

          <b>
            {
              records.filter(
                (client) =>
                  client.status !== "Inactive"
              ).length
            }
          </b>

          <span>
            Active Clients
          </span>

          <em>
            Active
          </em>

        </div>


        <div>

          <b>
            {
              records.filter(
                (client) =>
                  client.open > 0
              ).length
            }
          </b>

          <span>
            With Open Tickets
          </span>

          <em className="amber">
            Support
          </em>

        </div>


        <div>

          <b>
            {
              records.filter(
                (client) =>
                  client.status ===
                  "Awaiting Response"
              ).length
            }
          </b>

          <span>
            Awaiting Response
          </span>

          <em className="purple">
            Attention
          </em>

        </div>


        <div>

          <b>
            {
              records.filter(
                (client) =>
                  client.status === "Inactive"
              ).length
            }
          </b>

          <span>
            Inactive
          </span>

          <em>
            Access
          </em>

        </div>

      </section>


      {/* =====================================================
          CLIENT DIRECTORY
      ====================================================== */}

      <section
        className="clients-directory"
        ref={tableRef}
      >

        {/* ===================================================
            DIRECTORY HEADER
        ==================================================== */}

        <div className="clients-directory-head">

          <div>

            <span>
              Client directory
            </span>

            <h2>
              Support relationships
            </h2>

            <p>
              Browse registered clients and monitor their
              support relationship.
            </p>

          </div>

          <b>
            {visible.length} clients
          </b>

        </div>


        {/* ===================================================
            TOOLBAR
        ==================================================== */}

        <div className="clients-toolbar">

          <label>

            <span>
              Search
            </span>

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, email, company or ID..."
            />

          </label>


          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
          >

            <option value="All">
              All account status
            </option>

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>


          <select
            value={company}
            onChange={(event) =>
              setCompany(event.target.value)
            }
          >

            <option value="All">
              All companies
            </option>

            {[
              ...new Set(
                records.map(
                  (client) => client.company
                )
              ),
            ].map((value) => (

              <option
                key={value}
                value={value}
              >
                {value}
              </option>

            ))}

          </select>

        </div>


        {/* ===================================================
            ACTIVE FILTER
        ==================================================== */}

        {(status !== "All" ||
          company !== "All") && (

          <div className="clients-active-filter">

            Active filters

            <button
              type="button"
              onClick={() => {
                setStatus("All");
                setCompany("All");
              }}
            >
              Clear all
            </button>

          </div>

        )}


        {/* ===================================================
            CLIENT TABLE
        ==================================================== */}

        <div className="clients-table-card">

          <div className="clients-scroll">

            <table>

              <thead>

                <tr>

                  {/* CHECKBOX COLUMN REMOVED */}

                  <th>
                    Client
                  </th>

                  <th>
                    Client ID
                  </th>

                  <th>
                    Company
                  </th>

                  <th>
                    Contact
                  </th>

                  <th>
                    Open Tickets
                  </th>

                  <th>
                    Last Activity
                  </th>

                  <th>
                    Account Status
                  </th>

                  <th>
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {visible.map((client) => {

                  const accountStatus =
                    client.status === "Inactive"
                      ? "Inactive"
                      : "Active";

                  return (

                    <tr
                      key={client.id}
                    >

                      {/* =================================================
                          CLIENT
                      ================================================== */}

                      <td>

                        <div className="client-person">

                          <div>

                            <b>
                              {client.name}
                            </b>

                            <span>
                              {client.type} Client
                            </span>

                          </div>

                        </div>

                      </td>


                      {/* =================================================
                          CLIENT ID
                      ================================================== */}

                      <td>

                        <b className="client-id">
                          {client.id}
                        </b>

                      </td>


                      {/* =================================================
                          COMPANY
                      ================================================== */}

                      <td>
                        {client.company}
                      </td>


                      {/* =================================================
                          CONTACT
                      ================================================== */}

                      <td>

                        <div className="client-contact">

                          <b>
                            {client.email}
                          </b>

                          <span>
                            {client.phone}
                          </span>

                        </div>

                      </td>


                      {/* =================================================
                          OPEN TICKETS
                      ================================================== */}

                      <td>

                        <span
                          className={`client-open ${
                            client.open > 2
                              ? "high"
                              : ""
                          }`}
                        >
                          {client.open}
                        </span>

                      </td>


                      {/* =================================================
                          LAST ACTIVITY
                      ================================================== */}

                      <td>

                        <div className="client-contact">

                          <b>
                            {client.activity}
                          </b>

                          <span>
                            {client.activityLabel}
                          </span>

                        </div>

                      </td>


                      {/* =================================================
                          ACCOUNT STATUS
                      ================================================== */}

                      <td>

                        <span
                          className={`client-status ${
                            accountStatus.toLowerCase()
                          }`}
                        >
                          {accountStatus}
                        </span>

                      </td>


                      {/* =================================================
                          ACTION
                      ================================================== */}

                      <td>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            className="client-view"
                            type="button"
                            onClick={() =>
                              setSelected(client)
                            }
                          >
                            View
                          </button>
                          <button
                            className="client-delete"
                            type="button"
                            onClick={() =>
                              handleDeleteClient(client.id)
                            }
                            style={{
                              background: "#ef4444",
                              color: "white",
                              padding: "6px 12px",
                              border: "none",
                              borderRadius: "6px",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                            }}
                          >
                            Delete
                          </button>
                        </div>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>


          {/* =================================================
              TABLE FOOTER
          ================================================== */}

          <footer>

            Showing{" "}
            <b>
              {visible.length}
            </b>{" "}
            of{" "}
            <b>
              {records.length}
            </b>{" "}
            clients

          </footer>

        </div>

      </section>

      {/* ===================================================
          TOAST NOTIFICATION
      ==================================================== */}

      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            background: "#10b981",
            color: "white",
            padding: "12px 20px",
            borderRadius: "6px",
            zIndex: 1000,
          }}
        >
          {toast}
        </div>
      )}

    </div>
  );
}


/* =========================================================
   PART 2 STARTS HERE

   ClientWorkspace component
   + workspace design structure
   + status modal
   + export default

========================================================= */
/* =========================================================
   CLIENT PROFILE WORKSPACE
========================================================= */

function ClientWorkspace({
  client,
  onChange,
  onBack,
}) {

  const [note, setNote] = useState("");

  const [notes, setNotes] = useState([
    "Client prefers technical updates through email. High-priority issues should be escalated to the Project Manager.",
  ]);

  const [notice, setNotice] = useState("");

  const [view, setView] = useState("all");

  const [showMore, setShowMore] = useState(false);

  const [showStatusModal, setShowStatusModal] =
    useState(false);


  const isInactive =
    client.status === "Inactive";


  const accountStatus =
    isInactive ? "Inactive" : "Active";


  /* =====================================================
     STATUS ACTION
  ===================================================== */

  const requestStatusChange = () => {
    setShowStatusModal(true);
    setShowMore(false);
  };


  const confirmStatusChange = () => {

    const nextStatus =
      isInactive
        ? "Active"
        : "Inactive";

    onChange({
      status: nextStatus,
    });

    setNotice(
      nextStatus === "Inactive"
        ? "Client account deactivated. No client data, tickets, enquiries or history were deleted."
        : "Client account activated. The client can access the support system again."
    );

    setShowStatusModal(false);
  };


  /* =====================================================
     INTERNAL NOTE
  ===================================================== */

  const addNote = () => {

    if (!note.trim()) return;

    setNotes((items) => [
      ...items,
      note.trim(),
    ]);

    setNote("");

    setNotice(
      "Internal note added successfully."
    );
  };


  /* =====================================================
     SUPPORT ACTIVITY
  ===================================================== */

  const activityItems = [

    {
      type: "ticket",
      id: "#TKT-4821",
      text: "Website integration issue",
      state: "In Progress",
    },

    {
      type: "ticket",
      id: "#TKT-4798",
      text: "Email notification configuration",
      state: "Resolved",
    },

    {
      type: "enquiry",
      id: "#ENQ-10482",
      text: "API integration support",
      state: "Converted to Ticket",
    },

    {
      type: "enquiry",
      id: "#ENQ-10451",
      text: "Service availability enquiry",
      state: "Approved",
    },

    {
      type: "history",
      id: "ACCOUNT",
      text: "Client account reviewed by Admin",
      state: "4 days ago",
    },

    {
      type: "history",
      id: "HISTORY",
      text: "Contact information viewed",
      state: "1 week ago",
    },

  ];


  const items =
    activityItems.filter(
      (item) =>
        view === "all" ||
        item.type === view
    );


  return (

    /*
      =====================================================
      IMPORTANT:
      CSS mein `.client-workspace-shell` ko use karke
      background blur + centered workspace banaya jayega.

      Workspace ki SIZE CSS mein highlighted hai:

      --client-workspace-width
      --client-workspace-height

      Baad mein agar workspace bara/chhota karna ho
      to sirf in variables ki values change karna.
      =====================================================
    */

    <div className="client-workspace-shell">

      <div className="client-workspace">


        {/* =================================================
            BACK BUTTON
        ================================================= */}

        <button
          className="client-back"
          type="button"
          onClick={onBack}
        >
          ← Back to Clients
        </button>


        {/* =================================================
            WORKSPACE HEADER
        ================================================= */}

        <header>

          <div className="client-workspace-heading">

            <div>

              <span>
                Client workspace
              </span>

              <h1>
                {client.name}
              </h1>

              <p>
                {client.company} · {client.id}
              </p>

            </div>

          </div>


          <div className="client-workspace-actions">

            <span
              className={`client-status ${accountStatus.toLowerCase()}`}
            >
              {accountStatus}
            </span>


            <button
              className="client-status-action"
              type="button"
              onClick={requestStatusChange}
            >
              {isInactive
                ? "Activate Client"
                : "Deactivate Client"}
            </button>


            {/* =================================================
                MORE ACTIONS
            ================================================= */}

            <div className="client-more-wrapper">

              <button
                className="client-more-button"
                type="button"
                onClick={() =>
                  setShowMore((value) => !value)
                }
                aria-label="More actions"
              >
                ⋮
              </button>


              {showMore && (

                <div className="client-more-menu">

                  <button
                    type="button"
                    onClick={() => {
                      setView("ticket");
                      setShowMore(false);
                    }}
                  >
                    View Tickets
                  </button>


                  <button
                    type="button"
                    onClick={() => {
                      setView("enquiry");
                      setShowMore(false);
                    }}
                  >
                    View Enquiries
                  </button>


                  <button
                    type="button"
                    onClick={() => {
                      setView("history");
                      setShowMore(false);
                    }}
                  >
                    View History
                  </button>


                  <button
                    type="button"
                    onClick={requestStatusChange}
                  >
                    {isInactive
                      ? "Activate Client"
                      : "Deactivate Client"}
                  </button>

                </div>

              )}

            </div>

          </div>

        </header>


        {/* =================================================
            NOTICE
        ================================================== */}

        {notice && (

          <div className="client-notice">

            <span>
              ✓ {notice}
            </span>

            <button
              type="button"
              onClick={() => setNotice("")}
            >
              ×
            </button>

          </div>

        )}


        {/* =================================================
            READ ONLY NOTICE
        ================================================== */}

        <div className="client-read-only">

          <span className="client-read-only-icon">
            ✓
          </span>

          <div>

            <strong>
              Read-only client profile
            </strong>

            <span>
              Admin can view client information and manage
              account access. Profile information cannot be
              edited.
            </span>

          </div>

        </div>


        {/* =================================================
            MAIN WORKSPACE
        ================================================= */}

        <div className="client-workspace-grid">


          {/* =================================================
              MAIN CONTENT
          ================================================= */}

          <main>


            {/* =================================================
                PROFILE
            ================================================= */}

            <section className="client-panel">

              <div className="client-panel-heading">

                <span>
                  Profile
                </span>

                <h2>
                  Client account information
                </h2>

              </div>


              <div className="client-form-grid">

                {[
                  ["Name", client.name],
                  ["Company", client.company],
                  ["Email", client.email],
                  ["Phone", client.phone],
                  ["Account type", client.type],
                  ["Client ID", client.id],
                  ["Registration date", client.registered],
                ].map(
                  ([label, value]) => (

                    <div
                      className="client-readonly-field"
                      key={label}
                    >

                      <span>
                        {label}
                      </span>

                      <b>
                        {value}
                      </b>

                    </div>

                  )
                )}

              </div>

            </section>


            {/* =================================================
                SUPPORT OVERVIEW
            ================================================= */}

            <section className="client-panel">

              <div className="client-panel-heading">

                <span>
                  Support overview
                </span>

                <h2>
                  Client support snapshot
                </h2>

              </div>


              <div className="client-support-overview">

                <div>
                  <strong>
                    {client.enquiries}
                  </strong>

                  <span>
                    Total enquiries
                  </span>
                </div>


                <div>
                  <strong>
                    {client.tickets}
                  </strong>

                  <span>
                    Total tickets
                  </span>
                </div>


                <div>
                  <strong>
                    {client.open}
                  </strong>

                  <span>
                    Open tickets
                  </span>
                </div>


                <div>
                  <strong>
                    {Math.max(
                      client.tickets - client.open,
                      0
                    )}
                  </strong>

                  <span>
                    Resolved
                  </span>
                </div>

              </div>

            </section>


            {/* =================================================
                SUPPORT ACTIVITY
            ================================================= */}

            <section className="client-panel">

              <div className="client-panel-heading">

                <span>
                  Support activity
                </span>

                <h2>
                  Tickets, enquiries & history
                </h2>

              </div>


              <div className="client-activity-tabs">

                <button
                  className={
                    view === "all"
                      ? "active"
                      : ""
                  }
                  type="button"
                  onClick={() => setView("all")}
                >
                  All activity
                </button>


                <button
                  className={
                    view === "ticket"
                      ? "active"
                      : ""
                  }
                  type="button"
                  onClick={() => setView("ticket")}
                >
                  Tickets
                </button>


                <button
                  className={
                    view === "enquiry"
                      ? "active"
                      : ""
                  }
                  type="button"
                  onClick={() => setView("enquiry")}
                >
                  Enquiries
                </button>


                <button
                  className={
                    view === "history"
                      ? "active"
                      : ""
                  }
                  type="button"
                  onClick={() => setView("history")}
                >
                  History
                </button>

              </div>


              <div className="client-activity-list">

                {items.length > 0 ? (

                  items.map((item) => (

                    <div
                      className="client-activity"
                      key={item.id}
                    >

                      <b>
                        {item.id}
                      </b>

                      <span>
                        {item.text}
                      </span>

                      <em>
                        {item.state}
                      </em>

                    </div>

                  ))

                ) : (

                  <div className="client-empty-state">
                    No activity found.
                  </div>

                )}

              </div>

            </section>


            {/* =================================================
                INTERNAL NOTES
            ================================================= */}

            <section className="client-panel">

              <div className="client-panel-heading">

                <span>
                  Internal notes
                </span>

                <h2>
                  Admin notes
                </h2>

              </div>


              {notes.map(
                (item, index) => (

                  <article
                    className="client-note"
                    key={index}
                  >

                    <i>
                      AD
                    </i>

                    <div>

                      <b>
                        Admin
                      </b>

                      <p>
                        {item}
                      </p>

                    </div>

                  </article>

                )
              )}


              <div className="client-note-composer">

                <textarea
                  value={note}
                  onChange={(event) =>
                    setNote(event.target.value)
                  }
                  placeholder="Add an internal note..."
                />

                <footer>

                  <span>
                    Visible only to authorized team members.
                  </span>

                  <button
                    type="button"
                    onClick={addNote}
                  >
                    Add Note
                  </button>

                </footer>

              </div>

            </section>

          </main>


          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside>


            {/* =================================================
                ACCOUNT STATUS
            ================================================= */}

            <section className="client-panel client-health">

              <span>
                Account status
              </span>

              <h2>
                {isInactive
                  ? "Inactive account"
                  : "Active account"}
              </h2>

              <p>
                {isInactive
                  ? "This client currently cannot access the support system. Existing tickets, enquiries and history remain preserved."
                  : "This client currently has access to the support system and can continue using support services."
                }
              </p>


              <div className="client-status-summary">

                <span
                  className={`client-status-dot ${
                    isInactive
                      ? "inactive"
                      : "active"
                  }`}
                />

                <strong>
                  {accountStatus}
                </strong>

              </div>


              <button
                className="client-status-inline"
                type="button"
                onClick={requestStatusChange}
              >
                {isInactive
                  ? "Activate account"
                  : "Deactivate account"}
              </button>

            </section>


            {/* =================================================
                SNAPSHOT
            ================================================= */}

            <section className="client-panel">

              <div className="client-panel-heading">

                <span>
                  At a glance
                </span>

                <h2>
                  Client snapshot
                </h2>

              </div>


              <dl>

                <div>
                  <dt>
                    Registration
                  </dt>

                  <dd>
                    {client.registered}
                  </dd>
                </div>


                <div>
                  <dt>
                    Total tickets
                  </dt>

                  <dd>
                    {client.tickets}
                  </dd>
                </div>


                <div>
                  <dt>
                    Open tickets
                  </dt>

                  <dd>
                    {client.open}
                  </dd>
                </div>


                <div>
                  <dt>
                    Total enquiries
                  </dt>

                  <dd>
                    {client.enquiries}
                  </dd>
                </div>

              </dl>

            </section>


            {/* =================================================
                SUPPORT TEAM
            ================================================= */}

            <section className="client-panel">

              <div className="client-panel-heading">

                <span>
                  Support team
                </span>

                <h2>
                  Assigned contacts
                </h2>

              </div>


              <div className="client-team">

                <i className="purple">
                  PM
                </i>

                <div>

                  <b>
                    {client.manager}
                  </b>

                  <span>
                    Project Manager
                  </span>

                </div>

                <a
                  href={`mailto:${client.manager
                    .toLowerCase()
                    .replaceAll(" ", ".")}@support.com`}
                >
                  Email
                </a>

              </div>


              <div className="client-team">

                <i className="blue">
                  CO
                </i>

                <div>

                  <b>
                    {client.consultant}
                  </b>

                  <span>
                    Consultant
                  </span>

                </div>


                {client.consultant !== "Unassigned" ? (

                  <a
                    href={`mailto:${client.consultant
                      .toLowerCase()
                      .replaceAll(" ", ".")}@support.com`}
                  >
                    Email
                  </a>

                ) : (

                  <span className="client-unassigned">
                    Unassigned
                  </span>

                )}

              </div>

            </section>


            {/* =================================================
                PERMISSIONS
            ================================================= */}

            <section className="client-panel client-permissions">

              <div className="client-panel-heading">

                <span>
                  Admin permissions
                </span>

                <h2>
                  Access scope
                </h2>

              </div>


              <div className="permission-item">
                <span>View profile</span>
                <b>Allowed</b>
              </div>


              <div className="permission-item">
                <span>View tickets</span>
                <b>Allowed</b>
              </div>


              <div className="permission-item">
                <span>View enquiries</span>
                <b>Allowed</b>
              </div>


              <div className="permission-item">
                <span>Manage account status</span>
                <b>Allowed</b>
              </div>


              <div className="permission-item disabled">
                <span>Edit profile</span>
                <b>Restricted</b>
              </div>

            </section>

          </aside>

        </div>


        {/* =================================================
            STATUS CONFIRMATION MODAL
        ================================================= */}

        {showStatusModal && (

          <div
            className="client-modal-overlay"
            onClick={() =>
              setShowStatusModal(false)
            }
          >

            <div
              className="client-status-modal"
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="client-modal-icon">
                {isInactive ? "✓" : "!"}
              </div>


              <div>

                <span className="client-modal-label">
                  Account access
                </span>

                <h2>
                  {isInactive
                    ? "Activate Client?"
                    : "Deactivate Client?"}
                </h2>

                <p>
                  {isInactive
                    ? `${client.name} will regain access to the support system.`
                    : `${client.name} will no longer be able to access the support system.`
                  }
                </p>

                <small>
                  Existing tickets, enquiries, profile information
                  and activity history will remain preserved and
                  will not be deleted.
                </small>

              </div>


              <div className="client-modal-actions">

                <button
                  type="button"
                  className="client-modal-cancel"
                  onClick={() =>
                    setShowStatusModal(false)
                  }
                >
                  Cancel
                </button>


                <button
                  type="button"
                  className={
                    isInactive
                      ? "client-modal-confirm activate"
                      : "client-modal-confirm deactivate"
                  }
                  onClick={confirmStatusChange}
                >
                  {isInactive
                    ? "Activate Client"
                    : "Deactivate Client"}
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}


export default ClientsPage;