import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import "./TicketsPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const flow = [
  ["24", "New", "new"],
  ["18", "Assigned", "assigned"],
  ["32", "In Progress", "in-progress"],
  ["14", "Pending", "pending"],
  ["96", "Resolved", "resolved"],
  ["64", "Closed", "closed"]
];

function TicketsPage() {
  const tableRef = useRef(null);
  const [ticketList, setTicketList] = useState([]);

  const fetchTickets = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/tickets`);

      if (Array.isArray(data)) {
        const mapped = data.map((ticket) => {
          const clientName = ticket.clientId?.name || "Unknown Client";
          const company = ticket.clientId?.company || "Unassigned";
          const manager = ticket.projectManagerId?.name || "Unassigned";
          const consultant = ticket.consultantId?.name || "Unassigned";
          const priority = ticket.priority === "Urgent" ? "High" : ticket.priority || "Medium";
          const status = ticket.status === "Open" ? "Assigned" : ticket.status || "Assigned";

          return {
            id: ticket.ticketNumber || ticket._id?.slice(-6).toUpperCase() || "TKT-0000",
            enquiry: ticket.relatedQueryId ? `ENQ-${ticket.relatedQueryId.toString().slice(-4)}` : "ENQ-0000",
            client: clientName,
            company,
            subject: ticket.title || "Support ticket",
            category: ticket.category || "General",
            priority,
            status,
            manager,
            consultant,
            sla: ticket.slaDueAt ? "Live" : "No SLA",
            slaState: ticket.slaDueAt ? "normal" : "closed",
            updated: ticket.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Just now",
            created: ticket.createdAt ? new Date(ticket.createdAt).toLocaleString() : "Recently",
            email: ticket.clientId?.email || "",
            phone: "+92 300 0000000",
            source: ticket.source || "Client portal",
            openTickets: 0,
          };
        });

        setTicketList(mapped);
        return;
      }

      setTicketList([]);
    } catch (error) {
      console.error("Failed to load tickets from backend:", error);
      setTicketList([]);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [slaAtRisk, setSlaAtRisk] = useState(false);
  const [reply, setReply] = useState("");
  const [sentReply, setSentReply] = useState("");
  const shownTickets = useMemo(() => ticketList.filter((ticket) => (!search || [ticket.id, ticket.client, ticket.company, ticket.subject].some((value) => value.toLowerCase().includes(search.toLowerCase()))) && (status === "All" || ticket.status === status) && (priority === "All" || ticket.priority === priority) && (!slaAtRisk || ["risk", "imminent", "breached"].includes(ticket.slaState))), [ticketList, search, status, priority, slaAtRisk]);
  const viewSlaTickets = () => { setSlaAtRisk(true); tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const openTicket = (ticket) => { setSelectedTicket(ticket); setSentReply(""); setTimeout(() => document.getElementById("ticket-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); };
  const sendReply = () => { if (!reply.trim()) return; setSentReply(reply.trim()); setReply(""); };
  const exportTickets = () => {
    const header = ["Ticket", "Client", "Company", "Subject", "Priority", "Status", "Project Manager", "Consultant", "SLA", "Updated"];
    const rows = shownTickets.map((ticket) => [ticket.id, ticket.client, ticket.company, ticket.subject, ticket.priority, ticket.status, ticket.manager, ticket.consultant, ticket.sla, ticket.updated]);
    const csv = [header, ...rows].map((row) => row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")).join("\n");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    link.download = "support-tickets.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  if (selectedTicket) return <TicketWorkspaceV2 ticket={selectedTicket} reply={reply} sentReply={sentReply} setReply={setReply} onSend={sendReply} onChange={(changes) => { setTicketList((items) => items.map((item) => item.id === selectedTicket.id ? { ...item, ...changes } : item)); setSelectedTicket((item) => ({ ...item, ...changes })); }} onBack={() => { setSelectedTicket(null); setTimeout(() => tableRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); }} />;

  return <div className="tickets-page">
    <section className="tickets-header"><div><p className="tickets-eyebrow"><i /> Support operations</p><h1>Tickets</h1><p>Monitor, manage and track support tickets across your team.</p></div><button className="tickets-export" type="button" onClick={exportTickets}>Export CSV</button></section>
    <section className="tickets-flow">{flow.map(([count, label, tone], index) => <div className="tickets-flow-wrap" key={label}><div className={`tickets-flow-item ${tone}`}><strong>{count}</strong><span>{label}</span></div>{index < flow.length - 1 && <i>›</i>}</div>)}</section>
    <section className="tickets-sla"><div className="tickets-sla-main"><i>!</i><div><span>SLA attention</span><h2>Tickets that need timely action</h2><p>Prioritize tickets approaching their SLA deadline before they become breaches.</p></div></div><div className="tickets-sla-stats"><div><b className="risk">7</b><span>SLA Risk</span></div><div><b className="imminent">3</b><span>Imminent</span></div><div><b className="breached">2</b><span>Breached</span></div></div><button className="tickets-sla-button" type="button" onClick={viewSlaTickets}>View SLA Tickets <span>{"\u2192"}</span></button></section>
    <section className="tickets-queue" ref={tableRef}><div className="tickets-queue-head"><div><span>Ticket queue</span><h2>All Support Tickets</h2></div><em>248 tickets</em></div>
      {slaAtRisk && <div className="tickets-sla-filter"><span>SLA: At Risk</span><button type="button" onClick={() => setSlaAtRisk(false)}>Clear ×</button></div>}
      <div className="tickets-toolbar"><label><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by ticket ID, client or subject..." /></label><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="All">All status</option>{[...new Set(ticketList.map((ticket) => ticket.status))].map((value) => <option key={value}>{value}</option>)}</select><select value={priority} onChange={(event) => setPriority(event.target.value)}><option value="All">All priority</option>{[...new Set(ticketList.map((ticket) => ticket.priority))].map((value) => <option key={value}>{value}</option>)}</select></div>
      <div className="tickets-table-card"><div className="tickets-table-scroll"><table><thead><tr><th>Ticket</th><th>Client</th><th>Subject</th><th>Priority</th><th>Status</th><th>Project Manager</th><th>Consultant</th><th>SLA</th><th>Updated</th><th /></tr></thead><tbody>{shownTickets.map((ticket) => <tr className={ticket.slaState === "imminent" || ticket.slaState === "breached" ? "attention" : ""} key={ticket.id}><td><div className="ticket-id"><b>#{ticket.id}</b><span>From {ticket.enquiry}</span></div></td><td><div className="ticket-client"><i className={ticket.avatar}>{ticket.initials}</i><div><b>{ticket.client}</b><span>{ticket.company}</span></div></div></td><td><div className="ticket-subject"><b>{ticket.subject}</b><span>{ticket.category}</span></div></td><td><span className={`ticket-priority ${ticket.priority.toLowerCase()}`}><i />{ticket.priority}</span></td><td><span className={`ticket-status ${ticket.status.toLowerCase().replaceAll(" ", "-")}`}>{ticket.status}</span></td><td><div className="ticket-assignee"><i className="blue">{ticket.manager.split(" ").map((part) => part[0]).join("")}</i><div><b>{ticket.manager}</b><span>Project Manager</span></div></div></td><td><div className="ticket-assignee"><i className="purple">{ticket.consultant === "Unassigned" ? "—" : ticket.consultant.split(" ").map((part) => part[0]).join("")}</i><div><b>{ticket.consultant}</b><span>Consultant</span></div></div></td><td><span className={`ticket-sla-time ${ticket.slaState}`}>{ticket.sla}</span></td><td className="ticket-updated">{ticket.updated}</td><td><button className="ticket-view" type="button" onClick={() => openTicket(ticket)}>View</button></td></tr>)}{shownTickets.length === 0 && <tr><td className="ticket-empty" colSpan="10">No tickets match these filters.</td></tr>}</tbody></table></div><footer>Showing <b>{shownTickets.length}</b> of <b>248</b> tickets</footer></div>
    </section>
  </div>;
}

function TicketWorkspaceV2({ ticket, reply, sentReply, setReply, onSend, onChange, onBack }) {
  const [editing, setEditing] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [draftStatus, setDraftStatus] = useState(ticket.status);
  const [draftPriority, setDraftPriority] = useState(ticket.priority);
  const [notice, setNotice] = useState("");
  const save = () => { onChange({ status: draftStatus, priority: draftPriority, updated: "Just now" }); setEditing(false); setNotice("Ticket changes saved."); };
  const resolve = () => { onChange({ status: "Resolved", updated: "Just now" }); setMenuOpen(false); setNotice("Ticket marked as resolved."); };
  return <div className="ticket-workspace" id="ticket-workspace"><button className="ticket-back" type="button" onClick={onBack}>Back to Tickets</button><header className="workspace-header"><div><span>Ticket workspace</span><h1>#{ticket.id}</h1><p>{ticket.subject}</p></div><div className="workspace-header-actions"><span className={`ticket-sla-time ${ticket.slaState}`}>{ticket.sla}</span><div className="workspace-more-wrap"><button className="workspace-more" type="button" onClick={() => setMenuOpen(!menuOpen)}>More actions</button>{menuOpen && <div className="workspace-action-menu"><button type="button" onClick={resolve}>Mark as resolved</button><button type="button" onClick={() => { navigator.clipboard?.writeText(ticket.id); setNotice("Ticket ID copied to clipboard."); setMenuOpen(false); }}>Copy ticket ID</button></div>}</div><button className="workspace-update" type="button" onClick={() => editing ? save() : setEditing(true)}>{editing ? "Save Changes" : "Update Ticket"}</button></div></header><div className="workspace-meta"><span className={`ticket-status ${ticket.status.toLowerCase().replaceAll(" ", "-")}`}>{ticket.status}</span><span className={`ticket-priority ${ticket.priority.toLowerCase()}`}><i />{ticket.priority} priority</span><span>{ticket.category}</span></div>{editing && <div className="workspace-edit-row"><label>Status<select value={draftStatus} onChange={(event) => setDraftStatus(event.target.value)}><option>Assigned</option><option>In Progress</option><option>Pending</option><option>Resolved</option></select></label><label>Priority<select value={draftPriority} onChange={(event) => setDraftPriority(event.target.value)}><option>Critical</option><option>High</option><option>Medium</option><option>Low</option></select></label><button type="button" onClick={() => setEditing(false)}>Cancel</button></div>}{notice && <div className="workspace-notice">{notice}<button type="button" onClick={() => setNotice("")}>×</button></div>}<div className="workspace-grid"><main className="workspace-main"><section className="workspace-conversation"><div className="workspace-section-heading"><div><span>Conversation</span><h2>Ticket conversation</h2></div></div><Message author={ticket.client} role="Client" time="Today, 10:42 AM" avatar={ticket.avatar} initials={ticket.initials}>We are unable to complete the website integration. The connection fails when we try to verify the API credentials.</Message><Message author={ticket.manager} role="Project Manager" time="Today, 10:51 AM" initials="PM" avatar="blue">Thanks for reporting this. I have assigned the request to the appropriate consultant and will keep you updated.</Message><Message author={ticket.consultant} role="Consultant" time="Today, 11:06 AM" initials="CO" avatar="purple">I have reproduced the issue and am checking the authentication configuration now.</Message>{sentReply && <Message author="Admin" role="Internal update" time="Just now" initials="AD" avatar="red">{sentReply}</Message>}<div className="workspace-system">Status changed from Assigned to <b>{ticket.status}</b> · {ticket.updated}</div><div className="workspace-composer"><div><button type="button" className="composer-type">Internal note</button><button type="button" className="composer-attachment" onClick={() => setNotice("Attachment option is ready. Choose a file in the next step.")}>Attach file</button></div><textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write an internal note or update..." /><footer><span>Visible to your support team</span><button type="button" onClick={() => { onSend(); if (reply.trim()) setNotice("Update sent to the support team."); }}>Send Update</button></footer></div></section><section className="workspace-timeline"><div className="workspace-section-heading"><div><span>Activity</span><h2>Ticket timeline</h2></div></div><ol><li><i className="red" />Ticket moved to {ticket.status}<span>{ticket.updated}</span></li><li><i className="blue" />Consultant assigned to ticket<span>20 min ago</span></li><li><i className="green" />Ticket created from {ticket.enquiry}<span>32 min ago</span></li></ol></section></main><aside className="workspace-side"><section><span>Client</span><div className="workspace-client"><i className={ticket.avatar}>{ticket.initials}</i><div><h2>{ticket.client}</h2><p>{ticket.company}</p></div></div><a href={`mailto:${ticket.email}`}>{ticket.email}</a><p>{ticket.phone}</p><div className="workspace-count"><b>{ticket.openTickets}</b><span>Open tickets</span><b>8</b><span>Previous tickets</span></div></section><section><span>Ticket information</span><dl><div><dt>Project Manager</dt><dd>{ticket.manager}</dd></div><div><dt>Consultant</dt><dd>{ticket.consultant}</dd></div><div><dt>Category</dt><dd>{ticket.category}</dd></div><div><dt>Source</dt><dd>{ticket.source}</dd></div><div><dt>Created</dt><dd>{ticket.created}</dd></div><div><dt>Last updated</dt><dd>{ticket.updated}</dd></div></dl></section></aside></div></div>;
}

function TicketWorkspace({ ticket, reply, sentReply, setReply, onSend, onBack }) {
  return <div className="ticket-workspace" id="ticket-workspace"><button className="ticket-back" type="button" onClick={onBack}>← Back to Tickets</button><header className="workspace-header"><div><span>Ticket workspace</span><h1>#{ticket.id}</h1><p>{ticket.subject}</p></div><div className="workspace-header-actions"><span className={`ticket-sla-time ${ticket.slaState}`}>{ticket.sla}</span><button className="workspace-more" type="button">More actions</button><button className="workspace-update" type="button">Update Ticket</button></div></header><div className="workspace-meta"><span className={`ticket-status ${ticket.status.toLowerCase().replaceAll(" ", "-")}`}>{ticket.status}</span><span className={`ticket-priority ${ticket.priority.toLowerCase()}`}><i />{ticket.priority} priority</span><span>{ticket.category}</span></div><div className="workspace-grid"><main className="workspace-main"><section className="workspace-conversation"><div className="workspace-section-heading"><div><span>Conversation</span><h2>Ticket conversation</h2></div><button type="button">Activity</button></div><Message author={ticket.client} role="Client" time="Today, 10:42 AM" avatar={ticket.avatar} initials={ticket.initials}>We are unable to complete the website integration. The connection fails when we try to verify the API credentials.</Message><Message author={ticket.manager} role="Project Manager" time="Today, 10:51 AM" initials="SC" avatar="blue">Thanks for reporting this. I have assigned Marcus to investigate the API connection and will keep you updated.</Message><Message author={ticket.consultant} role="Consultant" time="Today, 11:06 AM" initials="MW" avatar="purple">I&apos;ve reproduced the issue and am checking the authentication configuration now.</Message>{sentReply && <Message author="Admin" role="Internal update" time="Just now" initials="AD" avatar="red">{sentReply}</Message>}<div className="workspace-system">Status changed from <b>Assigned</b> to <b>In Progress</b> · 12 minutes ago</div><div className="workspace-composer"><div><button type="button" className="composer-type">Internal note</button><button type="button" className="composer-attachment">Attach file</button></div><textarea value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write an internal note or update..." /><footer><span>Visible to your support team</span><button type="button" onClick={onSend}>Send Update</button></footer></div></section><section className="workspace-timeline"><div className="workspace-section-heading"><div><span>Activity</span><h2>Ticket timeline</h2></div></div><ol><li><i className="red" />Ticket moved to In Progress <span>12 min ago</span></li><li><i className="blue" />Consultant assigned to ticket <span>20 min ago</span></li><li><i className="green" />Ticket created from {ticket.enquiry} <span>32 min ago</span></li></ol></section></main><aside className="workspace-side"><section><span>Client</span><div className="workspace-client"><i className={ticket.avatar}>{ticket.initials}</i><div><h2>{ticket.client}</h2><p>{ticket.company}</p></div></div><a href={`mailto:${ticket.email}`}>{ticket.email}</a><p>{ticket.phone}</p><div className="workspace-count"><b>{ticket.openTickets}</b><span>Open tickets</span><b>8</b><span>Previous tickets</span></div></section><section><span>Ticket information</span><dl><div><dt>Project Manager</dt><dd>{ticket.manager}</dd></div><div><dt>Consultant</dt><dd>{ticket.consultant}</dd></div><div><dt>Category</dt><dd>{ticket.category}</dd></div><div><dt>Source</dt><dd>{ticket.source}</dd></div><div><dt>Created</dt><dd>{ticket.created}</dd></div><div><dt>Last updated</dt><dd>{ticket.updated}</dd></div></dl></section></aside></div></div>;
}

function Message({ author, role, time, children }) { return <article className="workspace-message"><div><header><b>{author}</b><span>{role} · {time}</span></header><p>{children}</p></div></article>; }
export default TicketsPage;
