import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import "./QueriesPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const overview = [["124", "All Enquiries", "neutral"], ["18", "Awaiting Review", "review"], ["9", "More Information", "info"], ["64", "Approved", "approved"], ["12", "Rejected / Closed", "rejected"], ["30", "Converted", "converted"]];
const detailFor = (enquiry) => ({ ...enquiry, email: `${enquiry.client.toLowerCase().replaceAll(" ", ".")}@${enquiry.company.toLowerCase().replaceAll(" ", "")}.com`, phone: "+92 300 456 7821", description: `Hello Support Team,\n\nI need assistance with ${enquiry.subject.toLowerCase()}. Our team has tried the usual steps but the issue is still affecting our work. Please review the details and advise on the next appropriate action.`, attachment: "enquiry-support-details.pdf", attachmentSize: "248 KB", subcategory: "General request", service: "Support & maintenance", source: "Client portal", suggestion: "Sarah Chen · Project Manager", previousTickets: 8, openTickets: 2 });

function QueriesPage() {
  const queueRef = useRef(null);
  const [records, setRecords] = useState([]);

  const fetchQueries = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/queries`);

      if (Array.isArray(data)) {
        const mapped = data.map((item) => {
          const clientName = item.clientId?.name || "Unknown Client";
          const company = item.clientId?.company || "Unassigned";
          const status = item.status === "New" ? "Awaiting Review" : item.status || "Awaiting Review";
          const priority = item.priority === "Urgent" ? "High" : item.priority || "Medium";

          return {
            id: item.queryNumber || item._id?.slice(-6).toUpperCase() || "ENQ-0000",
            client: clientName,
            company,
            subject: item.title || "Query request",
            category: item.category || "General",
            priority,
            status,
            submitted: item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Recently",
            reviewer: item.projectManagerId?.name || "Admin",
            description: item.description || "Client query",
          };
        });

        setRecords(mapped);
        return;
      }

      setRecords([]);
    } catch (error) {
      console.error("Failed to load queries from backend:", error);
      setRecords([]);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("newest");
  const filtered = useMemo(() => [...records].filter((item) => (!search || [item.id, item.client, item.company, item.subject].some((value) => value.toLowerCase().includes(search.toLowerCase()))) && (status === "All" || item.status === status) && (priority === "All" || item.priority === priority) && (category === "All" || item.category === category)).sort((a, b) => sort === "oldest" ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id)), [records, search, status, priority, category, sort]);
  const open = (enquiry) => { setSelected(detailFor(enquiry)); setTimeout(() => document.getElementById("enquiry-workspace")?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); };
  const update = (changes) => { setRecords((items) => items.map((item) => item.id === selected.id ? { ...item, ...changes } : item)); setSelected((item) => ({ ...item, ...changes })); };
  const exportCsv = () => { const csv = [["Enquiry", "Client", "Subject", "Priority", "Status"], ...filtered.map((item) => [item.id, item.client, item.subject, item.priority, item.status])].map((row) => row.join(",")).join("\n"); const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type: "text/csv" })); link.download = "enquiries.csv"; link.click(); URL.revokeObjectURL(link.href); };
  if (selected) return <EnquiryWorkspace enquiry={selected} onChange={update} onBack={() => { setSelected(null); setTimeout(() => queueRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 0); }} />;
  return <div className="queries-page"><section className="queries-header"><div><p className="queries-eyebrow"><i /> Query review workspace</p><h1>Queries</h1><p className="queries-intro">Review incoming client queries and send complete requests into the support workflow.</p></div><button className="queries-export-button" type="button" onClick={exportCsv}>Export CSV</button></section><section className="queries-overview">{overview.map(([value, label, tone]) => <div className={`queries-overview-item ${tone}`} key={label}><strong>{value}</strong><span>{label}</span></div>)}</section><section className="queries-review-banner"><div className="queries-alert-icon">!</div><div className="queries-review-copy"><span>Needs your review</span><h2>18 client queries are waiting for a decision.</h2><p>Prioritize urgent requests first and keep the support queue moving.</p></div><button className="queries-review-button" type="button" onClick={() => queueRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}>Review Enquiries →</button></section><section className="queries-queue" ref={queueRef}><div className="queries-section-heading"><div><span>Incoming requests</span><h2>Enquiry Queue</h2></div><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></div><div className="queries-filter-row"><label className="queries-search"><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by ID, client, or subject..." /></label><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="All">All status</option>{[...new Set(records.map((item) => item.status))].map((value) => <option key={value}>{value}</option>)}</select><select value={priority} onChange={(event) => setPriority(event.target.value)}><option value="All">Priority</option><option>High</option><option>Medium</option><option>Low</option></select><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="All">Category</option>{[...new Set(records.map((item) => item.category))].map((value) => <option key={value}>{value}</option>)}</select></div><div className="queries-table-card"><div className="queries-table-scroll"><table><thead><tr><th>Enquiry</th><th>Client</th><th>Subject</th><th>Priority</th><th>Submitted</th><th>Status</th><th>Reviewer</th><th>View</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><div className="queries-id"><b>{item.id}</b><span>{item.time}</span></div></td><td>
  <div className="queries-client">
    <div>
      <strong>{item.client}</strong>
      <span>{item.company}</span>
    </div>
  </div>
</td><td><div className="queries-subject"><strong>{item.subject}</strong><span>{item.category}</span></div></td><td><span className={`queries-priority ${item.priority.toLowerCase()}`}><i />{item.priority}</span></td><td className="queries-muted">{item.submitted}</td><td><span className={`queries-status ${item.status.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`}>{item.status}</span></td><td className="queries-muted">{item.reviewer}</td><td><button className="queries-view-link" type="button" onClick={() => open(item)}>View</button></td></tr>)}</tbody></table></div><footer className="queries-table-footer">Showing <strong>{filtered.length}</strong> enquiries</footer></div></section></div>;
}

function EnquiryWorkspace({ enquiry, onChange, onBack }) {
  const noteRef = useRef(null);
  const [note, setNote] = useState("");
  const [requestMode, setRequestMode] = useState(false);
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const [activity, setActivity] = useState([]);
  const addNote = () => { if (!note.trim()) return; setActivity((items) => [...items, `Internal note added: ${note.trim()}`]); setNote(""); setNotice("Internal note saved."); };
  const requestInfo = () => { if (!note.trim()) { setRequestMode(true); noteRef.current?.focus(); return; } onChange({ status: "Waiting for Client", reviewer: "Admin" }); setActivity((items) => [...items, "More information requested from client"]); setNote(""); setRequestMode(false); setNotice("Request sent. The client will receive a notification."); };
  const reject = () => { if (!window.confirm("Reject this enquiry and notify the client?")) return; onChange({ status: "Rejected / Closed", reviewer: "Admin" }); setActivity((items) => [...items, "Enquiry rejected and client notification queued"]); setNotice("Enquiry rejected. Client notification will be sent."); };
  const approve = () => { onChange({ status: "Converted to Ticket", reviewer: "Sarah Chen" }); setActivity((items) => [...items, "Ticket created and assigned to Sarah Chen"]); setNotice("Support ticket created and sent to the Project Manager. Client will be notified."); };
  const download = () => { const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob(["Enquiry attachment preview"], { type: "text/plain" })); link.download = enquiry.attachment; link.click(); URL.revokeObjectURL(link.href); setNotice("Attachment download started."); };
  const moreAction = (action) => { setMenu(false); if (action === "note") { noteRef.current?.focus(); setNotice("You can add an internal note below."); } else if (action === "priority") { const choice = window.prompt("Choose priority: High, Medium, or Low", enquiry.priority); if (["High", "Medium", "Low"].includes(choice)) { onChange({ priority: choice }); setNotice(`Priority changed to ${choice}.`); } } else if (action === "category") { const choice = window.prompt("Choose category: Technical support, Login & authentication, Billing & payments, Account services, or Outside support scope", enquiry.category); if (["Technical support", "Login & authentication", "Billing & payments", "Account services", "Outside support scope"].includes(choice)) { onChange({ category: choice }); setNotice(`Category changed to ${choice}.`); } } else if (action === "reviewer") { const choice = window.prompt("Assign reviewer: Admin, Sarah Chen, Priya Nair", enquiry.reviewer); if (["Admin", "Sarah Chen", "Priya Nair"].includes(choice)) { onChange({ reviewer: choice }); setNotice(`Reviewer assigned to ${choice}.`); } } else if (action === "history") setNotice("Activity history is shown below."); else setNotice("Enquiry archived."); };
  return <div className="enquiry-workspace" id="enquiry-workspace"><button className="enquiry-back" type="button" onClick={onBack}>← Back to Enquiries</button><header className="enquiry-workspace-header"><div><span>Enquiry workspace</span><h1>#{enquiry.id}</h1><p>{enquiry.subject}</p></div><div className="enquiry-header-actions"><span className={`queries-status ${enquiry.status.toLowerCase().replaceAll(" ", "-").replaceAll("/", "")}`}>{enquiry.status}</span><span className={`queries-priority ${enquiry.priority.toLowerCase()}`}><i />{enquiry.priority}</span><div className="enquiry-more"><button type="button" onClick={() => setMenu(!menu)}>More actions</button>{menu && <div>{[["priority", "Change Priority"], ["category", "Change Category"], ["reviewer", "Assign Reviewer"], ["note", "Add Internal Note"], ["history", "View Activity History"], ["archive", "Archive"]].map(([key, label]) => <button type="button" onClick={() => moreAction(key)} key={key}>{label}</button>)}</div>}</div></div></header><div className="enquiry-submitted">Submitted {enquiry.submitted} · Source: {enquiry.source}</div>{notice && <div className="enquiry-notice">{notice}<button type="button" onClick={() => setNotice("")}>×</button></div>}<div className="enquiry-workspace-grid"><main><section className="enquiry-content-section"><div className="enquiry-section-heading"><span>Client enquiry</span><h2>What the client needs</h2></div><h3>{enquiry.subject}</h3><p className="enquiry-description">{enquiry.description}</p><div className="enquiry-attachment"><i>PDF</i><div><b>{enquiry.attachment}</b><span>{enquiry.attachmentSize} · Client attachment</span></div><button type="button" onClick={() => setNotice("Attachment preview is ready.")}>Preview</button><button type="button" onClick={download}>Download</button></div></section><section className="enquiry-content-section"><div className="enquiry-section-heading"><span>Admin review</span><h2>Review intelligence</h2></div><div className="enquiry-review-grid"><div><span>Recommended priority</span><b>{enquiry.priority}</b></div><div><span>Category</span><b>{enquiry.category}</b></div><div><span>Subcategory</span><b>{enquiry.subcategory}</b></div><div><span>Service type</span><b>{enquiry.service}</b></div><div><span>Assignment suggestion</span><b>{enquiry.suggestion}</b></div><div><span>Review status</span><b>{enquiry.status}</b></div></div><div className="enquiry-note-box"><div><button className={requestMode ? "active" : ""} type="button" onClick={() => setRequestMode(true)}>{requestMode ? "Message to client" : "Internal note"}</button><button type="button" onClick={() => setNotice("Attachment option is ready.")}>Attach file</button></div><textarea ref={noteRef} value={note} onChange={(event) => setNote(event.target.value)} placeholder={requestMode ? "Explain what information is required..." : "Enter an internal note for the review team..."} /><footer><span>{requestMode ? "The client will receive a notification" : "Visible only to the review team"}</span><button type="button" onClick={requestMode ? requestInfo : addNote}>{requestMode ? "Request Information" : "Send Note"}</button></footer></div></section><section className="enquiry-decisions"><div><span>Admin decision</span><h2>Choose the next step</h2></div><button className="enquiry-reject" type="button" onClick={reject}>Reject Query</button><button className="enquiry-request" type="button" onClick={() => { setRequestMode(true); noteRef.current?.focus(); }}>Request More Information</button><button className="enquiry-approve" type="button" onClick={approve}>Approve & Create Ticket →</button></section><section className="enquiry-content-section"><div className="enquiry-section-heading"><span>Activity</span><h2>Enquiry timeline</h2></div><ol className="enquiry-timeline"><li>Enquiry submitted by {enquiry.client}<span>{enquiry.submitted}</span></li><li>Admin opened enquiry for review<span>Just now</span></li><li>Priority and category assessed<span>Just now</span></li>{activity.map((item, index) => <li key={index}>{item}<span>Just now</span></li>)}</ol></section></main><aside className="enquiry-side"><section><span>Client information</span><div className="enquiry-client-profile"><i className={enquiry.avatar}>{enquiry.initials}</i><div><h2>{enquiry.client}</h2><p>{enquiry.company}</p></div></div><a href={`mailto:${enquiry.email}`}>{enquiry.email}</a><p>{enquiry.phone}</p><div className="enquiry-ticket-counts"><b>{enquiry.previousTickets}</b><span>Previous tickets</span><b>{enquiry.openTickets}</b><span>Open tickets</span></div><button type="button" onClick={() => setNotice("Client profile is ready to view.")}>View Client Profile</button></section></aside></div></div>;
}

export default QueriesPage;
