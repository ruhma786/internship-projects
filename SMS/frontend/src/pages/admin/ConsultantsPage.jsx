import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import "./ConsultantsPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

/* =========================================================
   INITIAL CONSULTANT DATA
========================================================= */

const initialConsultants = [
  {
    id: "CON-1001",
    name: "Marcus Webb",
    email: "marcus@supporthub.com",
    phone: "+92 300 4567890",
    tone: "purple",
    expertise: "Backend",
    tags: ["Backend", "API"],
    skills: ["Node.js", "Express", "MongoDB", "REST API", "Authentication"],
    manager: "Sarah Chen",
    openTickets: 8,
    inProgress: 4,
    pending: 2,
    resolved: 42,
    workload: 82,
    status: "Active",
    lastActivity: "12 min ago",
    activityLabel: "Ticket updated",
    experience: "5+ years",
    specialization: "Backend & API Specialist",
    joined: "12 Jan 2026",
    lastLogin: "Today, 10:42 AM",
    recentTickets: [
      { id: "TKT-2084", title: "API Authentication Issue", client: "Acme Solutions", time: "12 min ago", status: "In Progress", tone: "red" },
      { id: "TKT-2079", title: "Database Connection", client: "Vertex Group", time: "1 hour ago", status: "Pending", tone: "amber" },
      { id: "TKT-2068", title: "Server Configuration", client: "Nova Technologies", time: "Yesterday", status: "Resolved", tone: "green" },
    ],
    activities: [
      { title: "Ticket status changed", detail: "TKT-2084 moved to In Progress", time: "12 minutes ago", tone: "red" },
      { title: "Ticket assigned", detail: "TKT-2079 assigned by Sarah Chen", time: "1 hour ago", tone: "blue" },
      { title: "Ticket resolved", detail: "TKT-2068 successfully resolved", time: "Yesterday", tone: "green" },
    ],
    notes: [
      { text: "Strong backend performer. Currently handling high-priority API tickets.", meta: "Added by Admin · 2 days ago" },
      { text: "Monitor workload before assigning additional critical tickets.", meta: "Added by Admin · 5 days ago" },
    ],
  },
  {
    id: "CON-1002",
    name: "James Okafor",
    email: "james@supporthub.com",
    phone: "+92 301 3456789",
    tone: "blue",
    expertise: "Frontend",
    tags: ["Frontend", "React"],
    skills: ["React", "JavaScript", "CSS", "Vite", "Redux"],
    manager: "Leila Hassan",
    openTickets: 5,
    inProgress: 3,
    pending: 1,
    resolved: 37,
    workload: 64,
    status: "Active",
    lastActivity: "28 min ago",
    activityLabel: "Ticket assigned",
    experience: "3 - 5 years",
    specialization: "Frontend Development",
    joined: "22 Feb 2026",
    lastLogin: "Today, 09:15 AM",
    recentTickets: [
      { id: "TKT-2081", title: "Dashboard UI Bug", client: "Nova Technologies", time: "28 min ago", status: "In Progress", tone: "red" },
      { id: "TKT-2075", title: "Login Page Styling", client: "Acme Solutions", time: "2 hours ago", status: "Pending", tone: "amber" },
      { id: "TKT-2061", title: "React Table Filter", client: "Vertex Group", time: "Yesterday", status: "Resolved", tone: "green" },
    ],
    activities: [
      { title: "Ticket assigned", detail: "TKT-2081 assigned by Leila Hassan", time: "28 minutes ago", tone: "blue" },
      { title: "Comment added", detail: "Shared fix update on TKT-2075", time: "2 hours ago", tone: "green" },
      { title: "Ticket resolved", detail: "TKT-2061 successfully resolved", time: "Yesterday", tone: "green" },
    ],
    notes: [
      { text: "Reliable frontend resource. Strong React skills.", meta: "Added by Admin · 3 days ago" },
    ],
  },
  {
    id: "CON-1003",
    name: "Ayesha Malik",
    email: "ayesha@supporthub.com",
    phone: "+92 305 9876543",
    tone: "green",
    expertise: "Database",
    tags: ["Database", "MongoDB"],
    skills: ["MongoDB", "MySQL", "Redis", "Query Optimization"],
    manager: "Sarah Chen",
    openTickets: 3,
    inProgress: 2,
    pending: 1,
    resolved: 31,
    workload: 48,
    status: "Active",
    lastActivity: "1 hour ago",
    activityLabel: "Comment added",
    experience: "3 - 5 years",
    specialization: "Database Administration",
    joined: "08 Mar 2026",
    lastLogin: "Today, 08:50 AM",
    recentTickets: [
      { id: "TKT-2077", title: "Slow Query Investigation", client: "Vertex Group", time: "1 hour ago", status: "In Progress", tone: "red" },
      { id: "TKT-2070", title: "Backup Configuration", client: "Nova Technologies", time: "3 hours ago", status: "Pending", tone: "amber" },
      { id: "TKT-2055", title: "Index Optimization", client: "Acme Solutions", time: "2 days ago", status: "Resolved", tone: "green" },
    ],
    activities: [
      { title: "Comment added", detail: "Shared findings on TKT-2077", time: "1 hour ago", tone: "green" },
      { title: "Ticket assigned", detail: "TKT-2070 assigned by Sarah Chen", time: "3 hours ago", tone: "blue" },
      { title: "Ticket resolved", detail: "TKT-2055 successfully resolved", time: "2 days ago", tone: "green" },
    ],
    notes: [
      { text: "Excellent database knowledge. Available for more assignments.", meta: "Added by Admin · 1 week ago" },
    ],
  },
  {
    id: "CON-1004",
    name: "Omar Raza",
    email: "omar@supporthub.com",
    phone: "+92 321 7654321",
    tone: "amber",
    expertise: "DevOps",
    tags: ["DevOps", "Cloud"],
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Linux"],
    manager: "Priya Nair",
    openTickets: 10,
    inProgress: 6,
    pending: 3,
    resolved: 55,
    workload: 91,
    status: "Active",
    lastActivity: "2 hours ago",
    activityLabel: "Ticket created",
    experience: "5+ years",
    specialization: "Cloud & DevOps Engineering",
    joined: "17 Jan 2026",
    lastLogin: "Today, 11:05 AM",
    recentTickets: [
      { id: "TKT-2085", title: "Production Server Down", client: "Acme Solutions", time: "2 hours ago", status: "In Progress", tone: "red" },
      { id: "TKT-2082", title: "CI Pipeline Failure", client: "Vertex Group", time: "4 hours ago", status: "Pending", tone: "amber" },
      { id: "TKT-2072", title: "Docker Setup", client: "Nova Technologies", time: "Yesterday", status: "Resolved", tone: "green" },
    ],
    activities: [
      { title: "Ticket created", detail: "TKT-2085 escalated to critical", time: "2 hours ago", tone: "red" },
      { title: "Ticket assigned", detail: "TKT-2082 assigned by Priya Nair", time: "4 hours ago", tone: "blue" },
      { title: "Ticket resolved", detail: "TKT-2072 successfully resolved", time: "Yesterday", tone: "green" },
    ],
    notes: [
      { text: "Critical workload — do not assign more tickets this week.", meta: "Added by Admin · 1 day ago" },
    ],
  },
  {
    id: "CON-1005",
    name: "Hina Shah",
    email: "hina@supporthub.com",
    phone: "+92 333 4561237",
    tone: "red",
    expertise: "Frontend",
    tags: ["Frontend", "UI/UX"],
    skills: ["Figma", "UI Design", "HTML", "CSS"],
    manager: "Marcus Webb",
    openTickets: 0,
    inProgress: 0,
    pending: 0,
    resolved: 24,
    workload: 0,
    status: "Inactive",
    lastActivity: "2 days ago",
    activityLabel: "Account inactive",
    experience: "1 - 2 years",
    specialization: "UI/UX Design",
    joined: "02 May 2026",
    lastLogin: "2 days ago",
    recentTickets: [
      { id: "TKT-2040", title: "Landing Page Redesign", client: "Nova Technologies", time: "3 days ago", status: "Resolved", tone: "green" },
    ],
    activities: [
      { title: "Account deactivated", detail: "Deactivated by Admin", time: "2 days ago", tone: "red" },
      { title: "Ticket resolved", detail: "TKT-2040 successfully resolved", time: "3 days ago", tone: "green" },
    ],
    notes: [
      { text: "On leave. Reactivate when back.", meta: "Added by Admin · 2 days ago" },
    ],
  },
];

/* =========================================================
   CONSTANTS & HELPERS
========================================================= */

const avatarTones = ["purple", "blue", "green", "amber", "red"];

const expertiseOptions = ["Frontend", "Backend", "Database", "DevOps", "UI/UX", "Cloud"];

const experienceOptions = ["Less than 1 year", "1 - 2 years", "3 - 5 years", "5+ years"];

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  joiningDate: "",
  experience: "",
  expertise: "",
  manager: "",
  skills: "",
  username: "",
  password: "",
  status: "Active",
  notes: "",
};

const pageSize = 5;

function getInitials(name) {
  return name
    .trim()
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getWorkloadInfo(workload, status) {
  if (status === "Inactive" || workload === 0) {
    return { label: "Unavailable", level: "none" };
  }
  if (workload >= 90) return { label: "Critical", level: "critical" };
  if (workload >= 80) return { label: "High", level: "high" };
  if (workload >= 50) return { label: "Normal", level: "normal" };
  return { label: "Healthy", level: "healthy" };
}

function normalizeConsultant(user) {
  const metadata = user.metadata || {};
  const skills = Array.isArray(user.skills) ? user.skills : Array.isArray(metadata.skills) ? metadata.skills : [];
  const tags = Array.isArray(user.tags) ? user.tags : Array.isArray(metadata.tags) ? metadata.tags : [];

  return {
    ...user,
    id: user._id || user.id,
    name: user.name || "Consultant",
    email: user.email || "",
    phone: user.phone || "",
    tone: avatarTones[(user.name || "").length % avatarTones.length],
    expertise: user.expertise || metadata.expertise || "Frontend",
    tags: tags.length ? tags : [user.expertise || metadata.expertise || "Frontend"],
    skills: skills.length ? skills : ["General"],
    manager: user.manager || "Unassigned",
    openTickets: Number(user.openTickets || 0),
    inProgress: Number(user.inProgress || 0),
    pending: Number(user.pending || 0),
    resolved: Number(user.resolved || 0),
    workload: Number(user.workload || 0),
    status: user.status || "Active",
    lastActivity: user.lastActivity || "Just now",
    activityLabel: user.activityLabel || "Account synced",
    experience: user.experience || metadata.experience || "Not specified",
    specialization: user.specialization || user.specialty || "Consultant",
    joined: user.joined || (user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : ""),
    lastLogin: user.lastLogin ? new Date(user.lastLogin).toLocaleString() : "Never",
    recentTickets: Array.isArray(user.recentTickets) ? user.recentTickets : [],
    activities: Array.isArray(user.activities) ? user.activities : [],
    notes: Array.isArray(user.notes) ? user.notes : [],
  };
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ConsultantsPage() {
  const [consultants, setConsultants] = useState([]);
  const [projectManagers, setProjectManagers] = useState([]);

  /* Filters */
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [expertiseFilter, setExpertiseFilter] = useState("all");

  /* Selection (bulk actions) */
  const [selectedIds, setSelectedIds] = useState([]);

  /* Pagination */
  const [page, setPage] = useState(1);

  /* Modals / overlays */
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [noteTargetId, setNoteTargetId] = useState(null);
  const [workspaceId, setWorkspaceId] = useState(null);

  /* Row action menu */
  const [openMenuId, setOpenMenuId] = useState(null);

  /* Delete consultant */
  const handleDeleteConsultant = async (consultantId) => {
    if (!window.confirm("Are you sure you want to delete this Consultant? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/users/${consultantId}`);
      setConsultants((items) =>
        items.filter((item) => (item._id || item.id) !== consultantId)
      );
      setToast({ show: true, message: "Consultant deleted successfully" });
      setTimeout(() => setToast({ show: false, message: "" }), 2500);
    } catch (error) {
      console.error("Failed to delete Consultant:", error);
      setToast({ show: true, message: "Failed to delete Consultant" });
      setTimeout(() => setToast({ show: false, message: "" }), 2500);
    }
  };

  /* Form + note */
  const [formData, setFormData] = useState(emptyForm);
  const [noteText, setNoteText] = useState("");

  /* Toast */
  const [toast, setToast] = useState({ show: false, message: "" });
  const toastTimer = useRef(null);

  const fetchConsultants = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users`, {
        params: { role: 'consultant' },
      });

      if (Array.isArray(data)) {
        setConsultants(data.map(normalizeConsultant));
        return;
      }

      setConsultants([]);
    } catch (error) {
      console.error("Failed to load consultants from backend:", error);
      setConsultants([]);
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  /* =========================================================
     FILTERED LIST
  ========================================================= */

  const filteredConsultants = useMemo(() => {
    const query = search.toLowerCase().trim();

    return consultants.filter((consultant) => {
      const matchesSearch =
        !query ||
        consultant.name.toLowerCase().includes(query) ||
        consultant.id.toLowerCase().includes(query) ||
        consultant.email.toLowerCase().includes(query) ||
        consultant.expertise.toLowerCase().includes(query) ||
        consultant.manager.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "all" || consultant.status === statusFilter;

      const matchesExpertise =
        expertiseFilter === "all" || consultant.expertise === expertiseFilter;

      return matchesSearch && matchesStatus && matchesExpertise;
    });
  }, [consultants, search, statusFilter, expertiseFilter]);

  /* Filters change → page 1 */
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, expertiseFilter]);

  useEffect(() => {
    fetchConsultants();
    axios.get(`${API_URL}/users`, { params: { role: "projectManager" } })
      .then(({ data }) => setProjectManagers(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error("Failed to load project managers:", error);
        setProjectManagers([]);
      });
  }, []);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const totalPages = Math.max(1, Math.ceil(filteredConsultants.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const pagedConsultants = filteredConsultants.slice(
    (safePage - 1) * pageSize,
    safePage * pageSize
  );

  /* =========================================================
     OVERVIEW STATS
  ========================================================= */

  const totalConsultants = consultants.length;
  const activeCount = consultants.filter((c) => c.status === "Active").length;
  const assignedTickets = consultants.reduce((total, c) => total + c.openTickets, 0);
  const avgWorkload = totalConsultants
    ? Math.round(consultants.reduce((total, c) => total + c.workload, 0) / totalConsultants)
    : 0;
  const highWorkloadCount = consultants.filter(
    (c) => c.status === "Active" && c.workload >= 80
  ).length;
  const activePercent = totalConsultants
    ? Math.round((activeCount / totalConsultants) * 100)
    : 0;

  /* =========================================================
     GLOBAL EFFECTS (Escape / outside click / scroll lock)
  ========================================================= */

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setShowCreateModal(false);
        setEditingId(null);
        setNoteTargetId(null);
        setWorkspaceId(null);
        setOpenMenuId(null);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (!openMenuId) return undefined;

    const handleClick = (e) => {
      if (!e.target.closest(".action-buttons")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [openMenuId]);

  const anyOverlayOpen =
    showCreateModal || Boolean(editingId) || Boolean(noteTargetId) || Boolean(workspaceId);

  useEffect(() => {
    document.body.style.overflow = anyOverlayOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [anyOverlayOpen]);

  /* =========================================================
     FORM HANDLERS
  ========================================================= */

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const openCreateModal = () => {
    setFormData(emptyForm);
    setShowCreateModal(true);
  };

  const openEditModal = (consultant) => {
    setFormData({
      name: consultant.name,
      email: consultant.email,
      phone: consultant.phone,
      joiningDate: consultant.joiningDate || "",
      experience: consultant.experience,
      expertise: consultant.expertise,
      manager: consultant.manager,
      skills: consultant.skills.join(", "),
      username: consultant.username || "",
      password: "",
      status: consultant.status,
      notes: "",
    });
    setEditingId(consultant.id);
    setOpenMenuId(null);
  };

  const closeFormModal = () => {
    setShowCreateModal(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      showToast("Please fill all required fields.");
      return;
    }

    const skillsArray = formData.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    /* ---------- EDIT ---------- */
    if (editingId) {
      const updatedPayload = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        joiningDate: formData.joiningDate,
        experience: formData.experience || "Not specified",
        expertise: formData.expertise || "Frontend",
        manager: formData.manager || "Unassigned",
        skills: skillsArray.length ? skillsArray : ["General"],
        tags: [formData.expertise || "Frontend", skillsArray[0]].filter(Boolean),
        status: formData.status,
        specialization: `${formData.expertise || "Frontend"} Specialist`,
        lastActivity: "Just now",
        activityLabel: "Profile updated",
      };

      try {
        const { data } = await axios.put(`${API_URL}/users/${editingId}`, updatedPayload);
        setConsultants((previous) =>
          previous.map((consultant) => (consultant.id === editingId ? normalizeConsultant(data) : consultant))
        );
        closeFormModal();
        showToast("Consultant profile updated successfully.");
      } catch (error) {
        console.error("Failed to update consultant:", error);
        showToast("Failed to update consultant in backend.");
      }
      return;
    }

    /* ---------- CREATE ---------- */
    const nextNumber =
      consultants.reduce((max, consultant) => {
        const number = Number(consultant.id.replace("CON-", ""));
        return Number.isNaN(number) ? max : Math.max(max, number);
      }, 1000) + 1;

    const newConsultant = {
      id: `CON-${nextNumber}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      tone: avatarTones[consultants.length % avatarTones.length],
      expertise: formData.expertise || "Frontend",
      tags: [formData.expertise || "Frontend", skillsArray[0]].filter(Boolean),
      skills: skillsArray.length ? skillsArray : ["General"],
      manager: formData.manager || "Unassigned",
      openTickets: 0,
      inProgress: 0,
      pending: 0,
      resolved: 0,
      workload: 0,
      status: formData.status,
      lastActivity: "Just now",
      activityLabel: "Account created",
      experience: formData.experience || "Not specified",
      specialization: `${formData.expertise || "Frontend"} Specialist`,
      joined:
        formData.joiningDate ||
        new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      joiningDate: formData.joiningDate,
      username: formData.username,
      lastLogin: "Never",
      recentTickets: [],
      activities: [
        {
          title: "Account created",
          detail: `${formData.name.trim()} joined as Consultant`,
          time: "Just now",
          tone: "green",
        },
      ],
      notes: formData.notes.trim()
        ? [{ text: formData.notes.trim(), meta: "Added by Admin · Just now" }]
        : [],
    };

    try {
      const payload = {
        name: newConsultant.name,
        email: newConsultant.email,
        password: formData.password || 'consultant123',
        phone: newConsultant.phone,
        company: '',
        role: 'consultant',
        specialty: newConsultant.specialization,
        expertise: newConsultant.expertise,
        status: newConsultant.status,
        metadata: {
          skills: newConsultant.skills,
          tags: newConsultant.tags,
          experience: newConsultant.experience,
        },
      };

      const { data } = await axios.post(`${API_URL}/users`, payload);
      setConsultants((previous) => [normalizeConsultant({ ...data, lastActivity: 'Just now', activityLabel: 'Account created' }), ...previous]);
      closeFormModal();
      showToast(`${data.name} consultant account created successfully.`);
    } catch (error) {
      console.error("Failed to create consultant:", error);
      showToast(error.response?.data?.message || "Failed to create consultant in backend.");
    }
  };

  /* =========================================================
     NOTE
  ========================================================= */

  const openNoteModal = (consultant) => {
    setNoteTargetId(consultant.id);
    setNoteText("");
    setOpenMenuId(null);
  };

  const handleSendNote = async (e) => {
    e.preventDefault();

    if (!noteText.trim()) {
      showToast("Please write a note first.");
      return;
    }

    const targetConsultant = consultants.find((consultant) => consultant.id === noteTargetId);

    if (!targetConsultant) {
      setNoteTargetId(null);
      setNoteText("");
      return;
    }

    const updatedConsultant = {
      ...targetConsultant,
      notes: [
        { text: noteText.trim(), meta: "Added by Admin · Just now" },
        ...targetConsultant.notes,
      ],
    };

    try {
      const { data } = await axios.put(`${API_URL}/users/${noteTargetId}`, updatedConsultant);
      setConsultants((previous) =>
        previous.map((consultant) => (consultant.id === noteTargetId ? normalizeConsultant(data) : consultant))
      );
      setNoteTargetId(null);
      setNoteText("");
      showToast("Internal note added successfully.");
    } catch (error) {
      console.error("Failed to add note:", error);
      showToast("Failed to save note in backend.");
    }
  };

  /* =========================================================
     STATUS TOGGLE
  ========================================================= */

  const toggleStatus = async (consultant) => {
    const newStatus = consultant.status === "Active" ? "Inactive" : "Active";
    const updatedConsultant = {
      ...consultant,
      status: newStatus,
      workload: newStatus === "Inactive" ? 0 : consultant.workload,
      lastActivity: "Just now",
      activityLabel:
        newStatus === "Active" ? "Account activated" : "Account deactivated",
    };

    try {
      const { data } = await axios.put(`${API_URL}/users/${consultant.id}`, updatedConsultant);
      setConsultants((previous) =>
        previous.map((item) => (item.id === consultant.id ? normalizeConsultant(data) : item))
      );
      setOpenMenuId(null);
      showToast(
        `${consultant.name} has been ${newStatus === "Active" ? "activated" : "deactivated"}.`
      );
    } catch (error) {
      console.error("Failed to toggle consultant status:", error);
      showToast("Status update failed in backend.");
    }
  };

  /* =========================================================
     SELECTION / BULK ACTIONS
  ========================================================= */

  const pagedIds = pagedConsultants.map((c) => c.id);
  const allPagedSelected =
    pagedIds.length > 0 && pagedIds.every((id) => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (allPagedSelected) {
      setSelectedIds((previous) => previous.filter((id) => !pagedIds.includes(id)));
    } else {
      setSelectedIds((previous) => [...new Set([...previous, ...pagedIds])]);
    }
  };

  const toggleSelect = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id]
    );
  };

  const bulkAction = async (action) => {
    const selected = consultants.filter((c) => selectedIds.includes(c.id));

    if (!selected.length) return;

    if (action === "export") {
      downloadCsv(selected, "consultants-selected.csv");
      showToast(`${selected.length} consultant(s) exported.`);
      return;
    }

    const newStatus = action === "activate" ? "Active" : "Inactive";

    try {
      await Promise.all(
        selected.map((consultant) =>
          axios.put(`${API_URL}/users/${consultant.id}`, {
            ...consultant,
            status: newStatus,
            workload: newStatus === "Inactive" ? 0 : consultant.workload,
            lastActivity: "Just now",
            activityLabel:
              newStatus === "Active" ? "Account activated" : "Account deactivated",
          })
        )
      );

      setConsultants((previous) =>
        previous.map((consultant) =>
          selectedIds.includes(consultant.id)
            ? {
                ...consultant,
                status: newStatus,
                workload: newStatus === "Inactive" ? 0 : consultant.workload,
                lastActivity: "Just now",
                activityLabel:
                  newStatus === "Active" ? "Account activated" : "Account deactivated",
              }
            : consultant
        )
      );

      setSelectedIds([]);
      showToast(`${selected.length} consultant(s) ${newStatus === "Active" ? "activated" : "deactivated"}.`);
    } catch (error) {
      console.error("Failed to bulk update consultants:", error);
      showToast("Bulk update failed in backend.");
    }
  };

  /* =========================================================
     EXPORT CSV
  ========================================================= */

  const downloadCsv = (rows, filename) => {
    let csv = "Consultant ID,Name,Email,Status,Expertise\n";

    rows.forEach((consultant) => {
      csv += `"${consultant.id}","${consultant.name}","${consultant.email}","${consultant.status}","${consultant.expertise}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const exportConsultants = () => {
    if (!filteredConsultants.length) {
      showToast("There are no consultants to export.");
      return;
    }

    downloadCsv(filteredConsultants, "consultants.csv");
    showToast("Consultants exported successfully.");
  };

  /* =========================================================
     RESET FILTERS
  ========================================================= */

  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setExpertiseFilter("all");
  };

  const filtersActive =
    search.trim() !== "" || statusFilter !== "all" || expertiseFilter !== "all";

  /* =========================================================
     WORKSPACE
  ========================================================= */

  const workspaceConsultant = consultants.find((c) => c.id === workspaceId);
  const noteTarget = consultants.find((c) => c.id === noteTargetId);
  const editingConsultant = consultants.find((c) => c.id === editingId);

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="consultants-page">

      {/* ================= PAGE HEADER ================= */}

      <div className="page-header">
        <div>
          <div className="eyebrow">
            <span></span>
            USER MANAGEMENT
          </div>

          <h1>Consultants</h1>

          <p>
            Manage consultant accounts, workload, assignments and professional
            information.
          </p>
        </div>

        <button className="primary-btn" onClick={openCreateModal}>
          <i className="fa-solid fa-plus"></i>
          Create Consultant
        </button>
      </div>

      {/* ================= SMART OVERVIEW ================= */}

      <div className="overview-strip">
        <div className="overview-item">
          <div className="overview-icon red">
            <i className="fa-solid fa-user-group"></i>
          </div>
          <div>
            <span>Total Consultants</span>
            <strong>{totalConsultants}</strong>
          </div>
          <small>Team members</small>
        </div>

        <div className="overview-item">
          <div className="overview-icon green">
            <i className="fa-solid fa-circle-check"></i>
          </div>
          <div>
            <span>Active</span>
            <strong>{activeCount}</strong>
          </div>
          <small className="green-text">{activePercent}% active</small>
        </div>

        <div className="overview-item">
          <div className="overview-icon amber">
            <i className="fa-solid fa-layer-group"></i>
          </div>
          <div>
            <span>Assigned Tickets</span>
            <strong>{assignedTickets}</strong>
          </div>
          <small>Open right now</small>
        </div>

        <div className="overview-item">
          <div className="overview-icon purple">
            <i className="fa-solid fa-gauge-high"></i>
          </div>
          <div>
            <span>Avg. Workload</span>
            <strong>{avgWorkload}%</strong>
          </div>
          <small>{avgWorkload >= 80 ? "Overloaded" : "Healthy"}</small>
        </div>

        <div className="overview-item">
          <div className="overview-icon blue">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>
          <div>
            <span>High Workload</span>
            <strong>{highWorkloadCount}</strong>
          </div>
          <small className="danger-text">
            {highWorkloadCount > 0 ? "Needs attention" : "All good"}
          </small>
        </div>
      </div>

      {/* ================= DIRECTORY ================= */}

      <section className="directory-card">

        <div className="directory-header">
          <div>
            <span className="section-label">CONSULTANT DIRECTORY</span>
            <h2>Consultant Team</h2>
            <p>View and manage all consultants working on support tickets.</p>
          </div>

          <div className="directory-count">
            <strong>{filteredConsultants.length}</strong>
            <span>Showing consultants</span>
          </div>
        </div>

        {/* TOOLBAR */}

        <div className="toolbar">
          <div className="search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              placeholder="Search by name, ID or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={expertiseFilter}
            onChange={(e) => setExpertiseFilter(e.target.value)}
          >
            <option value="all">All Expertise</option>
            {expertiseOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button className="filter-btn" onClick={resetFilters}>
            <i className="fa-solid fa-rotate-left"></i>
            Reset
          </button>

          <button className="export-btn" onClick={exportConsultants}>
            <i className="fa-solid fa-file-export"></i>
            Export
          </button>
        </div>

        {/* FILTER MESSAGE */}

        <div className={`filter-message ${filtersActive ? "filtered" : ""}`}>
          <i
            className={`fa-solid ${
              filtersActive ? "fa-filter" : "fa-circle-info"
            }`}
          ></i>
          {filtersActive
            ? `${filteredConsultants.length} consultant(s) match your filters`
            : "Showing all consultants"}
        </div>

        {/* TABLE */}

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                
                <th>CONSULTANT</th>
                <th>EXPERTISE</th>
                <th>PROJECT MANAGER</th>
                <th>OPEN TICKETS</th>
                <th>WORKLOAD</th>
                <th>STATUS</th>
                <th>LAST ACTIVITY</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {pagedConsultants.length === 0 ? (
                <tr>
                  <td colSpan="9" className="empty-table">
                    <i className="fa-regular fa-folder-open"></i>
                    No consultants found.
                  </td>
                </tr>
              ) : (
                pagedConsultants.map((consultant) => {
                  const workloadInfo = getWorkloadInfo(
                    consultant.workload,
                    consultant.status
                  );

                  return (
                    <tr key={consultant.id}>
                     
                      {/* CONSULTANT */}
                      <td>
                        <div className="consultant-person">
                          <div>
                            <strong>{consultant.name}</strong>
                            <span>{consultant.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* EXPERTISE */}
                      <td>
                        <div className="expertise-tags">
                          {consultant.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                          ))}
                        </div>
                      </td>

                      {/* MANAGER */}
                      <td>
                        <div className="manager-info">
                          <strong>{consultant.manager}</strong>
                          <span>Project Manager</span>
                        </div>
                      </td>

                      {/* OPEN TICKETS */}
                      <td>
                        <span
                          className={`ticket-number ${
                            consultant.openTickets >= 10 ? "high" : ""
                          }`}
                        >
                          {consultant.openTickets}
                        </span>
                      </td>

                      {/* WORKLOAD */}
                      <td>
                        <div className="workload-cell">
                          <div className="workload-top">
                            <span>{consultant.workload}%</span>
                            <small
                              className={
                                workloadInfo.level === "critical" ||
                                workloadInfo.level === "high"
                                  ? "high-text"
                                  : ""
                              }
                            >
                              {workloadInfo.label}
                            </small>
                          </div>
                          <div
                            className={`progress ${
                              workloadInfo.level === "critical" ||
                              workloadInfo.level === "high"
                                ? "danger"
                                : ""
                            }`}
                          >
                            <span
                              style={{ width: `${consultant.workload}%` }}
                            ></span>
                          </div>
                        </div>
                      </td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={`status ${
                            consultant.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          {consultant.status}
                        </span>
                      </td>

                      {/* LAST ACTIVITY */}
                      <td>
                        <div className="activity-info">
                          <strong>{consultant.lastActivity}</strong>
                          <span>{consultant.activityLabel}</span>
                        </div>
                      </td>

                      {/* ACTIONS */}
                      <td>
                        <div className="action-buttons">
                          <button
                            className="view-btn"
                            onClick={() => setWorkspaceId(consultant.id)}
                          >
                            <i className="fa-regular fa-eye"></i>
                            View
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteConsultant(consultant.id)
                            }
                            style={{
                              background: "#ef4444",
                              color: "white",
                              padding: "6px 12px",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.875rem",
                            }}
                            title="Delete this Consultant"
                          >
                            Delete
                          </button>

                          <button
                            className="more-btn"
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === consultant.id
                                  ? null
                                  : consultant.id
                              )
                            }
                          >
                            <i className="fa-solid fa-ellipsis"></i>
                          </button>

                          {openMenuId === consultant.id && (
                            <div className="action-menu show">
                              <button onClick={() => openEditModal(consultant)}>
                                <i className="fa-solid fa-pen"></i>
                                Edit
                              </button>

                              <button onClick={() => openNoteModal(consultant)}>
                                <i className="fa-regular fa-note-sticky"></i>
                                Send Note
                              </button>

                              <button onClick={() => toggleStatus(consultant)}>
                                <i className="fa-solid fa-power-off"></i>
                                {consultant.status === "Active"
                                  ? "Deactivate"
                                  : "Activate"}
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* BULK ACTION BAR */}

        <div className={`bulk-bar ${selectedIds.length > 0 ? "show" : ""}`}>
          <strong>
            <span>{selectedIds.length}</span> consultants selected
          </strong>

          <button onClick={() => bulkAction("activate")}>
            <i className="fa-solid fa-check"></i>
            Activate
          </button>

          <button onClick={() => bulkAction("deactivate")}>
            <i className="fa-solid fa-power-off"></i>
            Deactivate
          </button>

          <button onClick={() => bulkAction("export")}>
            <i className="fa-solid fa-file-export"></i>
            Export
          </button>

          <button
            className="bulk-clear"
            onClick={() => setSelectedIds([])}
            title="Clear selection"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* TABLE FOOTER / PAGINATION */}

        <div className="table-footer">
          <span>
            Showing {pagedConsultants.length} consultants from{" "}
            {filteredConsultants.length} total accounts
          </span>

          <div className="pagination">
            <button
              disabled={safePage === 1}
              onClick={() => setPage(safePage - 1)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  className={pageNumber === safePage ? "current" : ""}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              )
            )}

            <button
              disabled={safePage === totalPages}
              onClick={() => setPage(safePage + 1)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>

      {/* ================= CREATE MODAL ================= */}

      {showCreateModal && (
        <ConsultantFormModal
          title="Create Consultant"
          subtitle="Create a professional consultant account."
          buttonText="Create Consultant"
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmitForm}
          onClose={closeFormModal}
          projectManagers={projectManagers}
        />
      )}

      {/* ================= EDIT MODAL ================= */}

      {editingConsultant && (
        <ConsultantFormModal
          title="Edit Consultant"
          subtitle={`Update ${editingConsultant.name}'s account information.`}
          buttonText="Save Changes"
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleSubmitForm}
          onClose={closeFormModal}
          projectManagers={projectManagers}
        />
      )}

      {/* ================= NOTE MODAL ================= */}

      {noteTarget && (
        <NoteModal
          consultant={noteTarget}
          note={noteText}
          setNote={setNoteText}
          onClose={() => setNoteTargetId(null)}
          onSubmit={handleSendNote}
        />
      )}

      {/* ================= WORKSPACE ================= */}

      {workspaceConsultant && (
        <ConsultantWorkspace
          consultant={workspaceConsultant}
          onClose={() => setWorkspaceId(null)}
          onEdit={() => openEditModal(workspaceConsultant)}
          onNote={() => openNoteModal(workspaceConsultant)}
          onToggleStatus={() => toggleStatus(workspaceConsultant)}
          onToast={showToast}
        />
      )}

      {/* ================= TOAST ================= */}

      <div className={`toast ${toast.show ? "show" : ""}`}>
        <i className="fa-solid fa-circle-check"></i>
        <span>{toast.message}</span>
      </div>
    </div>
  );
}

/* =========================================================
   CONSULTANT FORM MODAL (Create / Edit)
========================================================= */

function ConsultantFormModal({
  title,
  subtitle,
  buttonText,
  formData,
  onChange,
  onSubmit,
  onClose,
  projectManagers,
}) {
  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="create-modal">

        {/* HEADER */}

        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-icon">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div>
              <h2>{title}</h2>
              <p>{subtitle}</p>
            </div>
          </div>

          <button className="close-modal" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="modal-body">

            {/* PERSONAL */}

            <div className="form-section">
              <div className="form-section-title">
                <div>
                  <i className="fa-regular fa-user"></i>
                </div>
                <span>
                  <strong>Personal Information</strong>
                  <small>Basic consultant details</small>
                </span>
              </div>

              <div className="form-grid">
                <label>
                  Full Name
                  <span>*</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={onChange}
                    required
                  />
                </label>

                <label>
                  Email Address
                  <span>*</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="consultant@example.com"
                    value={formData.email}
                    onChange={onChange}
                    required
                  />
                </label>

                <label>
                  Phone Number
                  <span>*</span>
                  <input
                    type="text"
                    name="phone"
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={onChange}
                    required
                  />
                </label>

                <label>
                  Joining Date
                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={onChange}
                  />
                </label>
              </div>
            </div>

            {/* PROFESSIONAL */}

            <div className="form-section">
              <div className="form-section-title">
                <div>
                  <i className="fa-solid fa-briefcase"></i>
                </div>
                <span>
                  <strong>Professional Information</strong>
                  <small>Consultant role and expertise</small>
                </span>
              </div>

              <div className="form-grid">
                <label>
                  Role
                  <div className="role-display">
                    <i className="fa-solid fa-user-gear"></i>
                    <span>
                      <strong>Consultant</strong>
                      <small>System role</small>
                    </span>
                  </div>
                </label>

                <label>
                  Experience
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={onChange}
                  >
                    <option value="">Select experience</option>
                    {experienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Primary Expertise
                  <select
                    name="expertise"
                    value={formData.expertise}
                    onChange={onChange}
                  >
                    <option value="">Select expertise</option>
                    {expertiseOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Project Manager
                  <select
                    name="manager"
                    value={formData.manager}
                    onChange={onChange}
                  >
                    <option value="">Select project manager</option>
                    {projectManagers.map((manager) => (
                      <option key={manager._id} value={manager.name}>
                        {manager.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="full">
                  Additional Skills
                  <input
                    type="text"
                    name="skills"
                    placeholder="React, Node.js, MongoDB..."
                    value={formData.skills}
                    onChange={onChange}
                  />
                </label>
              </div>
            </div>

            {/* ACCOUNT */}

            <div className="form-section">
              <div className="form-section-title">
                <div>
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <span>
                  <strong>Account & Access</strong>
                  <small>Login and account status</small>
                </span>
              </div>

              <div className="form-grid">
                <label>
                  Username
                  <input
                    type="text"
                    name="username"
                    placeholder="Auto-generated or enter username"
                    value={formData.username}
                    onChange={onChange}
                  />
                </label>

                <label>
                  Temporary Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Create temporary password"
                    value={formData.password}
                    onChange={onChange}
                  />
                </label>
              </div>

              <div className="account-note">
                <i className="fa-solid fa-circle-info"></i>
                <span>
                  The consultant will use these credentials to access the
                  Consultant Dashboard. The role will be stored with the account
                  in the database.
                </span>
              </div>

              <div className="status-selector">
                <span>Account Status</span>

                <label
                  className={`status-choice ${
                    formData.status === "Active" ? "active-choice" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="Active"
                    checked={formData.status === "Active"}
                    onChange={onChange}
                  />
                  <i className="fa-solid fa-circle"></i>
                  Active
                </label>

                <label
                  className={`status-choice ${
                    formData.status === "Inactive" ? "inactive-choice" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="Inactive"
                    checked={formData.status === "Inactive"}
                    onChange={onChange}
                  />
                  <i className="fa-solid fa-circle"></i>
                  Inactive
                </label>
              </div>
            </div>

            {/* NOTES */}

            <div className="form-section">
              <div className="form-section-title">
                <div>
                  <i className="fa-regular fa-note-sticky"></i>
                </div>
                <span>
                  <strong>Admin Notes</strong>
                  <small>Optional internal information</small>
                </span>
              </div>

              <textarea
                className="admin-notes-input"
                name="notes"
                placeholder="Add any internal notes about this consultant..."
                value={formData.notes}
                onChange={onChange}
              ></textarea>
            </div>
          </div>

          {/* FOOTER */}

          <div className="modal-footer">
            <span>
              <i className="fa-solid fa-lock"></i>
              Only Admin can create consultant accounts.
            </span>

            <div>
              <button
                type="button"
                className="secondary-btn"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="create-btn">
                <i className="fa-solid fa-user-plus"></i>
                {buttonText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   NOTE MODAL
========================================================= */

function NoteModal({ consultant, note, setNote, onClose, onSubmit }) {
  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="note-modal">

        <div className="modal-header">
          <div className="modal-title">
            <div className="modal-icon">
              <i className="fa-regular fa-note-sticky"></i>
            </div>
            <div>
              <h2>Send Note</h2>
              <p>
                Add an internal note for <strong>{consultant.name}</strong>.
              </p>
            </div>
          </div>

          <button className="close-modal" onClick={onClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="modal-body">
            <div className="note-recipient">
              <div>
                <strong>{consultant.name}</strong>
                <span>{consultant.email}</span>
              </div>
            </div>

            <textarea
              className="admin-notes-input"
              placeholder="Write your internal note..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              autoFocus
            ></textarea>
          </div>

          <div className="modal-footer">
            <span>
              <i className="fa-solid fa-lock"></i>
              Notes are visible to admins only.
            </span>

            <div>
              <button
                type="button"
                className="secondary-btn"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="create-btn">
                <i className="fa-regular fa-paper-plane"></i>
                Send Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   CONSULTANT WORKSPACE
========================================================= */

function ConsultantWorkspace({
  consultant,
  onClose,
  onEdit,
  onNote,
  onToggleStatus,
  onToast,
}) {
  const workloadInfo = getWorkloadInfo(consultant.workload, consultant.status);

  return (
    <div className="workspace-overlay show">
      <div className="workspace">

        {/* ============ HEADER ============ */}

        <header className="workspace-header">
          <div className="workspace-heading">
            <button className="workspace-back" onClick={onClose}>
              <i className="fa-solid fa-arrow-left"></i>
              Back to Consultants
            </button>

            <div className="workspace-person">
              <div>
                <div className="workspace-name-row">
                  <h2>{consultant.name}</h2>
                  <span
                    className={`workspace-status ${
                      consultant.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    <i className="fa-solid fa-circle"></i>
                    {consultant.status}
                  </span>
                </div>
                <p>Consultant · {consultant.id}</p>
              </div>
            </div>
          </div>

          <div className="workspace-actions">
            <button onClick={onEdit}>
              <i className="fa-solid fa-pen"></i>
              Edit
            </button>

            <button onClick={onNote}>
              <i className="fa-regular fa-note-sticky"></i>
              Send Note
            </button>

            <button
              className="workspace-more"
              onClick={() => onToast("More consultant actions opened.")}
            >
              <i className="fa-solid fa-ellipsis"></i>
            </button>

            <button className="workspace-close" onClick={onClose}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </header>

        {/* ============ BODY ============ */}

        <div className="workspace-body">

          {/* PROFILE SUMMARY */}

          <div className="profile-summary">
            <div className="profile-main">
              <div>
                <span>CONSULTANT PROFILE</span>
                <h3>{consultant.name}</h3>
                <p>{consultant.specialization}</p>
              </div>
            </div>

            <div className="summary-stat">
              <span>Open Tickets</span>
              <strong>{consultant.openTickets}</strong>
              <small>Currently assigned</small>
            </div>

            <div className="summary-stat">
              <span>Workload</span>
              <strong>{consultant.workload}%</strong>
              <small>{workloadInfo.label} workload</small>
            </div>

            <div className="summary-stat">
              <span>Resolved</span>
              <strong>{consultant.resolved}</strong>
              <small>This quarter</small>
            </div>
          </div>

          {/* GRID */}

          <div className="workspace-grid">

            {/* ======= LEFT ======= */}

            <main className="workspace-main">

              {/* PROFESSIONAL INFO */}

              <section className="workspace-panel">
                <div className="panel-heading">
                  <div>
                    <span>PROFILE</span>
                    <h3>Professional Information</h3>
                  </div>
                  <i className="fa-solid fa-briefcase"></i>
                </div>

                <div className="detail-grid">
                  <div className="detail-item">
                    <span>Consultant ID</span>
                    <strong>{consultant.id}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Role</span>
                    <strong>Consultant</strong>
                  </div>
                  <div className="detail-item">
                    <span>Experience</span>
                    <strong>{consultant.experience}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Specialization</span>
                    <strong>{consultant.specialization}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Email</span>
                    <strong>{consultant.email}</strong>
                  </div>
                  <div className="detail-item">
                    <span>Phone</span>
                    <strong>{consultant.phone}</strong>
                  </div>
                </div>

                <div className="skills-section">
                  <span>EXPERTISE</span>
                  <div className="skill-tags">
                    {consultant.skills.length ? (
                      consultant.skills.map((skill) => (
                        <span key={skill}>{skill}</span>
                      ))
                    ) : (
                      <span>General Support</span>
                    )}
                  </div>
                </div>
              </section>

              {/* WORKLOAD */}

              <section className="workspace-panel">
                <div className="panel-heading">
                  <div>
                    <span>CAPACITY</span>
                    <h3>Workload Overview</h3>
                  </div>
                  <strong className="workload-percent">
                    {consultant.workload}%
                  </strong>
                </div>

                <div className="workload-large">
                  <div className="workload-large-top">
                    <div>
                      <strong>{workloadInfo.label} workload</strong>
                      <span>
                        {consultant.openTickets} active tickets assigned
                      </span>
                    </div>
                    <i className="fa-solid fa-arrow-trend-up"></i>
                  </div>

                  <div
                    className={`large-progress ${
                      workloadInfo.level === "critical" ||
                      workloadInfo.level === "high"
                        ? "danger"
                        : ""
                    }`}
                  >
                    <span style={{ width: `${consultant.workload}%` }}></span>
                  </div>

                  <div className="workload-scale">
                    <span>0%</span>
                    <span>50%</span>
                    <span>80%</span>
                    <span>100%</span>
                  </div>
                </div>

                <div className="ticket-mini-stats">
                  <div>
                    <strong>{consultant.openTickets}</strong>
                    <span>Open</span>
                  </div>
                  <div>
                    <strong>{consultant.inProgress}</strong>
                    <span>In Progress</span>
                  </div>
                  <div>
                    <strong>{consultant.pending}</strong>
                    <span>Pending</span>
                  </div>
                  <div>
                    <strong>{consultant.resolved}</strong>
                    <span>Resolved</span>
                  </div>
                </div>
              </section>

              {/* RECENT TICKETS */}

              <section className="workspace-panel">
                <div className="panel-heading">
                  <div>
                    <span>SUPPORT ACTIVITY</span>
                    <h3>Recent Tickets</h3>
                  </div>
                  <button
                    className="text-action"
                    onClick={() => onToast("Opening all assigned tickets...")}
                  >
                    View all
                    <i className="fa-solid fa-arrow-right"></i>
                  </button>
                </div>

                {consultant.recentTickets.length === 0 ? (
                  <div className="empty-panel">
                    <i className="fa-solid fa-ticket"></i>
                    No recent tickets for this consultant.
                  </div>
                ) : (
                  consultant.recentTickets.map((ticket) => (
                    <div className="recent-ticket" key={ticket.id}>
                      <div className={`ticket-icon ${ticket.tone}`}>
                        <i
                          className={`fa-solid ${
                            ticket.status === "Resolved" ? "fa-check" : "fa-ticket"
                          }`}
                        ></i>
                      </div>

                      <div className="ticket-content">
                        <strong>
                          #{ticket.id} — {ticket.title}
                        </strong>
                        <span>
                          Client: {ticket.client} · {ticket.time}
                        </span>
                      </div>

                      <span
                        className={`ticket-status ${
                          ticket.status === "In Progress"
                            ? "progress-status"
                            : ticket.status === "Pending"
                              ? "pending-status"
                              : "resolved-status"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                  ))
                )}
              </section>

              {/* ACTIVITY */}

              <section className="workspace-panel">
                <div className="panel-heading">
                  <div>
                    <span>HISTORY</span>
                    <h3>Recent Activity</h3>
                  </div>
                </div>

                <div className="timeline">
                  {consultant.activities.map((activity, index) => (
                    <div className="timeline-item" key={index}>
                      <div className={`timeline-dot ${activity.tone}`}></div>
                      <div>
                        <strong>{activity.title}</strong>
                        <span>{activity.detail}</span>
                        <small>{activity.time}</small>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </main>

            {/* ======= RIGHT ======= */}

            <aside className="workspace-side">

              {/* MANAGER */}

              <section className="workspace-panel">
                <div className="panel-heading">
                  <div>
                    <span>ASSIGNMENT</span>
                    <h3>Project Manager</h3>
                  </div>
                </div>

                <div className="manager-card">
                  <div>
                    <strong>{consultant.manager}</strong>
                    <span>Project Manager</span>
                  </div>
                  <button
                    title="View manager"
                    onClick={() =>
                      onToast(`Opening ${consultant.manager}'s profile...`)
                    }
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </button>
                </div>
              </section>

              {/* ACCOUNT */}

              <section className="workspace-panel">
                <div className="panel-heading">
                  <div>
                    <span>ACCOUNT</span>
                    <h3>Account Information</h3>
                  </div>
                </div>

                <dl className="account-details">
                  <div>
                    <dt>Status</dt>
                    <dd
                      className={
                        consultant.status === "Active"
                          ? "green-value"
                          : "red-value"
                      }
                    >
                      {consultant.status}
                    </dd>
                  </div>
                  <div>
                    <dt>Created</dt>
                    <dd>{consultant.joined}</dd>
                  </div>
                  <div>
                    <dt>Last Login</dt>
                    <dd>{consultant.lastLogin}</dd>
                  </div>
                  <div>
                    <dt>Account Role</dt>
                    <dd>Consultant</dd>
                  </div>
                </dl>
              </section>

              {/* ADMIN NOTES */}

              <section className="workspace-panel">
                <div className="panel-heading">
                  <div>
                    <span>ADMIN NOTES</span>
                    <h3>Internal Notes</h3>
                  </div>
                  <button className="small-add" onClick={onNote}>
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                {consultant.notes.length === 0 ? (
                  <div className="empty-panel">
                    <i className="fa-regular fa-note-sticky"></i>
                    No notes yet. Add the first one.
                  </div>
                ) : (
                  consultant.notes.map((note, index) => (
                    <div className="admin-note" key={index}>
                      <p>{note.text}</p>
                      <small>{note.meta}</small>
                    </div>
                  ))
                )}
              </section>

              {/* QUICK ACTIONS */}

              <section className="workspace-panel quick-actions">
                <div className="panel-heading">
                  <div>
                    <span>QUICK ACTIONS</span>
                    <h3>Admin Controls</h3>
                  </div>
                </div>

                <button onClick={onEdit}>
                  <i className="fa-solid fa-pen"></i>
                  Edit Consultant
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

                <button onClick={onNote}>
                  <i className="fa-regular fa-note-sticky"></i>
                  Send Internal Note
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

                <button onClick={() => onToast("Workload details opened")}>
                  <i className="fa-solid fa-chart-simple"></i>
                  View Workload
                  <i className="fa-solid fa-chevron-right"></i>
                </button>

                <button className="danger-action" onClick={onToggleStatus}>
                  <i className="fa-solid fa-power-off"></i>
                  {consultant.status === "Active"
                    ? "Deactivate Account"
                    : "Activate Account"}
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
