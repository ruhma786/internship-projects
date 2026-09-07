import axios from "axios";
import React, { useEffect, useMemo, useState } from "react";
import "./ProjectManagersPage.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  designation: "",
  experience: "",
  password: "",
  confirmPassword: "",
  status: "Active",
  location: "",
  bio: "",
};

function ProjectManagersPage() {
  const [managers, setManagers] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [workloadFilter, setWorkloadFilter] = useState("All");

  const [selectedManager, setSelectedManager] = useState(null);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);

  const [formData, setFormData] = useState(emptyForm);
  const [editingManager, setEditingManager] = useState(null);

  const [noteText, setNoteText] = useState("");
  const [toast, setToast] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchManagers = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/users`, {
        params: { role: "projectManager" },
      });

      if (Array.isArray(data)) {
        const mapped = data.map((user) => {
          const metrics = user.metrics || user.metadata || {};

          return {
            id: user._id || user.id,
            name: user.name,
            email: user.email,
            phone: user.phone || "+92 300 0000000",
            department: user.department || metrics.department || "Support Operations",
            designation: user.designation || metrics.designation || "Project Manager",
            experience: user.experience || metrics.experience || "Not specified",
            role: "Project Manager",
            status: user.status || "Active",
            projects: metrics.projects || 0,
            activeProjects: metrics.activeProjects || 0,
            tickets: metrics.tickets || 0,
            openTickets: metrics.openTickets || 0,
            resolvedTickets: metrics.resolvedTickets || 0,
            consultants: metrics.consultants || 0,
            workload: user.workload || metrics.workload || 0,
            activity: "Just now",
            activityLabel: "Account synced",
            joined: user.createdAt ? new Date(user.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "Recently",
            location: user.location || user.company || "Not specified",
            bio: user.bio || metrics.bio || "Project manager account synced from database.",
          };
        });

        setManagers(mapped);
        return;
      }

      setManagers([]);
    } catch (error) {
      console.error("Failed to load project managers from backend:", error);
      setManagers([]);
    }
  };

  useEffect(() => {
    fetchManagers();
  }, []);

  const showToast = (message) => {
    setToast(message);

    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleDeleteProjectManager = async (managerId) => {
    if (!window.confirm("Are you sure you want to delete this Project Manager? This action cannot be undone.")) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/users/${managerId}`);
      setManagers((items) => items.filter((item) => item.id !== managerId));
      showToast("Project Manager deleted successfully");
    } catch (error) {
      console.error("Failed to delete Project Manager:", error);
      showToast("Failed to delete Project Manager");
    }
  };

  const departments = useMemo(() => {
    return [...new Set(managers.map((manager) => manager.department))];
  }, [managers]);

  const filteredManagers = useMemo(() => {
    return managers.filter((manager) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        manager.name.toLowerCase().includes(searchValue) ||
        manager.id.toLowerCase().includes(searchValue) ||
        manager.email.toLowerCase().includes(searchValue) ||
        manager.department.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || manager.status === statusFilter;

      const matchesDepartment =
        departmentFilter === "All" ||
        manager.department === departmentFilter;

      let matchesWorkload = true;

      if (workloadFilter === "Low") {
        matchesWorkload = manager.workload < 50;
      }

      if (workloadFilter === "Medium") {
        matchesWorkload = manager.workload >= 50 && manager.workload < 75;
      }

      if (workloadFilter === "High") {
        matchesWorkload = manager.workload >= 75;
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesDepartment &&
        matchesWorkload
      );
    });
  }, [
    managers,
    search,
    statusFilter,
    departmentFilter,
    workloadFilter,
  ]);

  const totalManagers = managers.length;

  const activeManagers = managers.filter(
    (manager) => manager.status === "Active"
  ).length;

  const inactiveManagers = managers.filter(
    (manager) => manager.status === "Inactive"
  ).length;

  const highWorkloadManagers = managers.filter(
    (manager) => manager.workload >= 75
  ).length;

  const totalProjects = managers.reduce(
    (total, manager) => total + manager.projects,
    0
  );

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCreateManager = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      showToast("Please complete the required profile information.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match.");
      return;
    }

    const nameParts = formData.name.trim().split(" ");

    const initials =
      nameParts.length > 1
        ? `${nameParts[0][0]}${nameParts[nameParts.length - 1][0]}`
        : nameParts[0]?.substring(0, 2);

    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password || "projectmanager123",
      phone: formData.phone,
      company: formData.location || "Not specified",
      role: "projectManager",
      status: formData.status,
      metadata: {
        department: formData.department || "Support Operations",
        designation: formData.designation || "Project Manager",
        experience: formData.experience || "Not specified",
        bio: formData.bio || "New project manager responsible for support project coordination.",
        projects: 0,
        activeProjects: 0,
        tickets: 0,
        openTickets: 0,
        resolvedTickets: 0,
        consultants: 0,
        workload: 0,
      },
    };

    axios
      .post(`${API_URL}/users`, payload)
      .then(({ data }) => {
        const newManager = {
          id: data._id || data.id,
          name: data.name,
          email: data.email,
          phone: data.phone || formData.phone,
          department: data.metadata?.department || "Support Operations",
          designation: data.metadata?.designation || "Project Manager",
          experience: data.metadata?.experience || "Not specified",
          role: "Project Manager",
          status: data.status || "Active",
          projects: data.metadata?.projects || 0,
          activeProjects: data.metadata?.activeProjects || 0,
          tickets: data.metadata?.tickets || 0,
          openTickets: data.metadata?.openTickets || 0,
          resolvedTickets: data.metadata?.resolvedTickets || 0,
          consultants: data.metadata?.consultants || 0,
          workload: data.metadata?.workload || 0,
          activity: "Just now",
          activityLabel: "Account created",
          joined: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
          location: data.company || "Not specified",
          bio: data.metadata?.bio || "Project manager account created.",
        };

        setManagers((previous) => [newManager, ...previous]);
        setFormData(emptyForm);
        setShowCreateModal(false);
        showToast("Project Manager account created successfully.");
      })
      .catch((error) => {
        showToast(error.response?.data?.message || "Failed to create project manager in MongoDB.");
      });
  };

  const openEditModal = (manager) => {
    setEditingManager(manager);

    setFormData({
      name: manager.name,
      email: manager.email,
      phone: manager.phone,
      department: manager.department,
      designation: manager.designation,
      experience: manager.experience,
      password: "",
      confirmPassword: "",
      status: manager.status,
      location: manager.location,
      bio: manager.bio,
    });

    setShowEditModal(true);
  };

  const handleEditManager = (event) => {
    event.preventDefault();

    if (!editingManager) return;

    setManagers((previous) =>
      previous.map((manager) =>
        manager.id === editingManager.id
          ? {
              ...manager,
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              department: formData.department,
              designation: formData.designation,
              experience: formData.experience,
              status: formData.status,
              location: formData.location,
              bio: formData.bio,
            }
          : manager
      )
    );

    if (selectedManager?.id === editingManager.id) {
      setSelectedManager({
        ...selectedManager,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        designation: formData.designation,
        experience: formData.experience,
        status: formData.status,
        location: formData.location,
        bio: formData.bio,
      });
    }

    setShowEditModal(false);
    setEditingManager(null);
    setFormData(emptyForm);

    showToast("Project Manager profile updated.");
  };

  const toggleStatus = (managerId) => {
    setManagers((previous) =>
      previous.map((manager) =>
        manager.id === managerId
          ? {
              ...manager,
              status:
                manager.status === "Active" ? "Inactive" : "Active",
            }
          : manager
      )
    );

    setSelectedManager((previous) => {
      if (!previous || previous.id !== managerId) return previous;

      return {
        ...previous,
        status:
          previous.status === "Active" ? "Inactive" : "Active",
      };
    });

    showToast("Account status updated.");
  };

  const openNoteModal = (manager) => {
    setSelectedManager(manager);
    setNoteText("");
    setShowNoteModal(true);
  };

  const sendNote = (event) => {
    event.preventDefault();

    if (!noteText.trim()) {
      showToast("Please write a note first.");
      return;
    }

    setShowNoteModal(false);
    setNoteText("");

    showToast("Note sent to Project Manager.");
  };

  const exportManagers = () => {
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "Department",
      "Designation",
      "Role",
      "Status",
      "Projects",
      "Tickets",
      "Workload",
    ];

    const rows = filteredManagers.map((manager) => [
      manager.id,
      manager.name,
      manager.email,
      manager.phone,
      manager.department,
      manager.designation,
      manager.role,
      manager.status,
      manager.projects,
      manager.tickets,
      `${manager.workload}%`,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "project-managers.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    showToast("Project Managers exported successfully.");
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("All");
    setDepartmentFilter("All");
    setWorkloadFilter("All");
  };

  if (selectedManager) {
    return (
      <div className="pm-page pm-workspace-page">
        <div className="pm-workspace-top">
          <button
            className="pm-back-button"
            onClick={() => setSelectedManager(null)}
          >
            <span>←</span>
            Back to Project Managers
          </button>

          <div className="pm-workspace-actions">
            <button
              className="pm-secondary-button"
              onClick={() => openNoteModal(selectedManager)}
            >
              <span>✉</span>
              Send Note
            </button>

            <button
              className="pm-secondary-button"
              onClick={() => openEditModal(selectedManager)}
            >
              <span>✎</span>
              Edit Profile
            </button>

            <button
              className={
                selectedManager.status === "Active"
                  ? "pm-danger-button"
                  : "pm-success-button"
              }
              onClick={() => toggleStatus(selectedManager.id)}
            >
              {selectedManager.status === "Active"
                ? "Deactivate"
                : "Activate"}
            </button>
          </div>
        </div>

        <section className="pm-profile-hero">
          <div className="pm-profile-heading">
            <div className="pm-id-line">
              <span>{selectedManager.id}</span>
              <span
                className={`pm-status ${
                  selectedManager.status === "Active"
                    ? "active"
                    : "inactive"
                }`}
              >
                <i></i>
                {selectedManager.status}
              </span>
            </div>

            <h1>{selectedManager.name}</h1>

            <p>
              {selectedManager.designation} ·{" "}
              {selectedManager.department}
            </p>

            <div className="pm-contact-row">
              <span>✉ {selectedManager.email}</span>
              <span>☎ {selectedManager.phone}</span>
              <span>⌖ {selectedManager.location}</span>
            </div>
          </div>

          <div className="pm-role-box">
            <span>ACCOUNT ROLE</span>
            <strong>Project Manager</strong>
            <small>Admin managed account</small>
          </div>
        </section>

        <div className="pm-workspace-grid">
          <main>
            <section className="pm-panel">
              <div className="pm-panel-heading">
                <div>
                  <span className="pm-eyebrow">Performance snapshot</span>
                  <h2>Management Overview</h2>
                </div>
                <span className="pm-live-label">
                  ● Live information
                </span>
              </div>

              <div className="pm-metrics">
                <div className="pm-metric">
                  <span>Projects</span>
                  <strong>{selectedManager.projects}</strong>
                  <small>
                    {selectedManager.activeProjects} active
                  </small>
                </div>

                <div className="pm-metric">
                  <span>Assigned Tickets</span>
                  <strong>{selectedManager.tickets}</strong>
                  <small>
                    {selectedManager.openTickets} currently open
                  </small>
                </div>

                <div className="pm-metric">
                  <span>Resolved Tickets</span>
                  <strong>{selectedManager.resolvedTickets}</strong>
                  <small>Successfully resolved</small>
                </div>

                <div className="pm-metric">
                  <span>Consultants</span>
                  <strong>{selectedManager.consultants}</strong>
                  <small>Team members</small>
                </div>
              </div>
            </section>

            <section className="pm-panel">
              <div className="pm-panel-heading">
                <div>
                  <span className="pm-eyebrow">Capacity</span>
                  <h2>Current Workload</h2>
                </div>

                <strong
                  className={`pm-workload-number ${
                    selectedManager.workload >= 75
                      ? "high"
                      : selectedManager.workload >= 50
                      ? "medium"
                      : "low"
                  }`}
                >
                  {selectedManager.workload}%
                </strong>
              </div>

              <div className="pm-workload-visual">
                <div className="pm-workload-track">
                  <span
                    style={{
                      width: `${selectedManager.workload}%`,
                    }}
                  ></span>
                </div>

                <div className="pm-workload-scale">
                  <span>Available</span>
                  <span>Balanced</span>
                  <span>High workload</span>
                </div>
              </div>

              <div className="pm-workload-info">
                <div>
                  <strong>{selectedManager.openTickets}</strong>
                  <span>Open tickets</span>
                </div>

                <div>
                  <strong>{selectedManager.activeProjects}</strong>
                  <span>Active projects</span>
                </div>

                <div>
                  <strong>{selectedManager.consultants}</strong>
                  <span>Consultants managed</span>
                </div>
              </div>
            </section>

            <section className="pm-panel">
              <div className="pm-panel-heading">
                <div>
                  <span className="pm-eyebrow">Assignments</span>
                  <h2>Active Projects</h2>
                </div>

                <button className="pm-text-button">
                  View all →
                </button>
              </div>

              <div className="pm-project-list">
                <div className="pm-project-item">
                  <div className="pm-project-icon red">SP</div>

                  <div>
                    <strong>Support Portal Upgrade</strong>
                    <span>Enterprise support project</span>
                  </div>

                  <div className="pm-project-progress">
                    <span>78%</span>
                    <div>
                      <i style={{ width: "78%" }}></i>
                    </div>
                  </div>
                </div>

                <div className="pm-project-item">
                  <div className="pm-project-icon blue">CS</div>

                  <div>
                    <strong>Client Service Integration</strong>
                    <span>Client operations project</span>
                  </div>

                  <div className="pm-project-progress">
                    <span>61%</span>
                    <div>
                      <i style={{ width: "61%" }}></i>
                    </div>
                  </div>
                </div>

                <div className="pm-project-item">
                  <div className="pm-project-icon purple">AP</div>

                  <div>
                    <strong>Automation Platform</strong>
                    <span>Technical support project</span>
                  </div>

                  <div className="pm-project-progress">
                    <span>43%</span>
                    <div>
                      <i style={{ width: "43%" }}></i>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="pm-panel">
              <div className="pm-panel-heading">
                <div>
                  <span className="pm-eyebrow">Communication</span>
                  <h2>Recent Activity</h2>
                </div>
              </div>

              <div className="pm-activity">
                <div className="pm-activity-dot red"></div>
                <div>
                  <strong>Ticket reassigned</strong>
                  <p>
                    Ticket #TCK-2048 was assigned to a consultant.
                  </p>
                </div>
                <span>12 min ago</span>
              </div>

              <div className="pm-activity">
                <div className="pm-activity-dot blue"></div>
                <div>
                  <strong>Project updated</strong>
                  <p>
                    Project milestone information was updated.
                  </p>
                </div>
                <span>1 hour ago</span>
              </div>

              <div className="pm-activity">
                <div className="pm-activity-dot green"></div>
                <div>
                  <strong>Ticket resolved</strong>
                  <p>
                    A support ticket was successfully resolved.
                  </p>
                </div>
                <span>2 hours ago</span>
              </div>
            </section>
          </main>

          <aside>
            <section className="pm-panel">
              <div className="pm-panel-heading">
                <div>
                  <span className="pm-eyebrow">Profile</span>
                  <h2>Account Information</h2>
                </div>
              </div>

              <dl className="pm-info-list">
                <div>
                  <dt>Role</dt>
                  <dd>Project Manager</dd>
                </div>

                <div>
                  <dt>Department</dt>
                  <dd>{selectedManager.department}</dd>
                </div>

                <div>
                  <dt>Experience</dt>
                  <dd>{selectedManager.experience}</dd>
                </div>

                <div>
                  <dt>Joined</dt>
                  <dd>{selectedManager.joined}</dd>
                </div>

                <div>
                  <dt>Location</dt>
                  <dd>{selectedManager.location}</dd>
                </div>
              </dl>
            </section>

            <section className="pm-panel pm-bio-panel">
              <span className="pm-eyebrow">About</span>
              <h2>Profile Summary</h2>
              <p>{selectedManager.bio}</p>
            </section>

            <section className="pm-panel">
              <div className="pm-panel-heading">
                <div>
                  <span className="pm-eyebrow">Team</span>
                  <h2>Consultants</h2>
                </div>
              </div>

              <div className="pm-consultant-list">
                <div>
                  <i className="blue">JO</i>
                  <span>
                    <strong>James Okafor</strong>
                    <small>Technical Consultant</small>
                  </span>
                </div>

                <div>
                  <i className="purple">MW</i>
                  <span>
                    <strong>Marcus Webb</strong>
                    <small>Support Consultant</small>
                  </span>
                </div>

                <div>
                  <i className="green">FA</i>
                  <span>
                    <strong>Fatima Ali</strong>
                    <small>Implementation Consultant</small>
                  </span>
                </div>
              </div>
            </section>

            <section className="pm-panel pm-security-panel">
              <span className="pm-eyebrow">Account control</span>
              <h2>Admin Controls</h2>

              <p>
                Admin can update this account or change its active
                status without deleting the manager's historical
                data.
              </p>

              <button
                className={
                  selectedManager.status === "Active"
                    ? "pm-full-danger"
                    : "pm-full-success"
                }
                onClick={() => toggleStatus(selectedManager.id)}
              >
                {selectedManager.status === "Active"
                  ? "Deactivate Account"
                  : "Activate Account"}
              </button>
            </section>
          </aside>
        </div>

        {showEditModal && (
          <ManagerModal
            title="Edit Project Manager"
            subtitle="Update the selected manager's account information."
            formData={formData}
            onChange={handleFormChange}
            onSubmit={handleEditManager}
            onClose={() => {
              setShowEditModal(false);
              setEditingManager(null);
              setFormData(emptyForm);
            }}
            submitText="Save Changes"
            editMode
          />
        )}

        {showNoteModal && (
          <NoteModal
            manager={selectedManager}
            noteText={noteText}
            setNoteText={setNoteText}
            onSubmit={sendNote}
            onClose={() => setShowNoteModal(false)}
          />
        )}

        {toast && <div className="pm-toast">{toast}</div>}
      </div>
    );
  }

  return (
    <div className="pm-page">
      <header className="pm-page-header">
        <div>
          <span className="pm-eyebrow">
            <i></i> Admin workspace
          </span>

          <h1>Project Managers</h1>

          <p>
            Create, manage and monitor project managers across the
            support operation.
          </p>
        </div>

        <div className="pm-header-actions">
          <button
            className="pm-export-button"
            onClick={exportManagers}
          >
            <span>↓</span>
             ↓ Export
          </button>

          <button
            className="pm-primary-button"
            onClick={() => {
              setFormData(emptyForm);
              setShowCreateModal(true);
            }}
          >

            <span>＋</span>
            Create Project Manager
          </button>
        </div>
      </header>

      <section className="pm-summary">
        <div className="pm-summary-item">
          <div className="pm-summary-icon red">PM</div>
          <div>
            <strong>{totalManagers}</strong>
            <span>Total Managers</span>
          </div>
        </div>

        <div className="pm-summary-item">
          <div className="pm-summary-icon green">✓</div>
          <div>
            <strong>{activeManagers}</strong>
            <span>Active</span>
          </div>
        </div>

        <div className="pm-summary-item">
          <div className="pm-summary-icon gray">○</div>
          <div>
            <strong>{inactiveManagers}</strong>
            <span>Inactive</span>
          </div>
        </div>

        <div className="pm-summary-item">
          <div className="pm-summary-icon amber">!</div>
          <div>
            <strong>{highWorkloadManagers}</strong>
            <span>High Workload</span>
          </div>
        </div>

        <div className="pm-summary-item">
          <div className="pm-summary-icon blue">▣</div>
          <div>
            <strong>{totalProjects}</strong>
            <span>Managed Projects</span>
          </div>
        </div>
      </section>

      <section className="pm-directory">
        <div className="pm-directory-header">
          <div>
            <span className="pm-eyebrow">Management directory</span>
            <h2>Project Manager Directory</h2>
            <p>
              Select a manager to view their complete management
              workspace.
            </p>
          </div>

          <span className="pm-result-count">
            {filteredManagers.length} of {managers.length} managers
          </span>
        </div>

        <div className="pm-toolbar">
          <label className="pm-search">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search by name, ID, email or department..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button onClick={() => setSearch("")}>×</button>
            )}
          </label>

          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          <select
            value={departmentFilter}
            onChange={(event) =>
              setDepartmentFilter(event.target.value)
            }
          >
            <option value="All">All Departments</option>

            {departments.map((department) => (
              <option key={department} value={department}>
                {department}
              </option>
            ))}
          </select>

          <select
            value={workloadFilter}
            onChange={(event) =>
              setWorkloadFilter(event.target.value)
            }
          >
            <option value="All">All Workload</option>
            <option value="Low">Low &lt; 50%</option>
            <option value="Medium">Medium 50–74%</option>
            <option value="High">High 75%+</option>
          </select>

          {(search ||
            statusFilter !== "All" ||
            departmentFilter !== "All" ||
            workloadFilter !== "All") && (
            <button className="pm-clear-filter" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>

        <div className="pm-table-card">
          <div className="pm-table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Project Manager</th>
                  <th>Department</th>
                  <th>Projects</th>
                  <th>Tickets</th>
                  <th>Workload</th>
                  <th>Status</th>
                  <th>Last Activity</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredManagers.length > 0 ? (
                  filteredManagers.map((manager) => (
                    <tr key={manager.id}>
                      <td>
                        <div className="pm-person">
                          <div>
                            <strong>{manager.name}</strong>
                            <span>{manager.id}</span>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="pm-department">
                          <strong>{manager.department}</strong>
                          <span>{manager.designation}</span>
                        </div>
                      </td>

                      <td>
                        <div className="pm-number-cell">
                          <strong>{manager.projects}</strong>
                          <span>
                            {manager.activeProjects} active
                          </span>
                        </div>
                      </td>

                      <td>
                        <div className="pm-number-cell">
                          <strong>{manager.tickets}</strong>
                          <span>{manager.openTickets} open</span>
                        </div>
                      </td>

                      <td>
                        <div className="pm-table-workload">
                          <div>
                            <span>{manager.workload}%</span>
                            <small>
                              {manager.workload >= 75
                                ? "High"
                                : manager.workload >= 50
                                ? "Balanced"
                                : "Low"}
                            </small>
                          </div>

                          <div className="pm-mini-track">
                            <i
                              className={
                                manager.workload >= 75
                                  ? "high"
                                  : manager.workload >= 50
                                  ? "medium"
                                  : "low"
                              }
                              style={{
                                width: `${manager.workload}%`,
                              }}
                            ></i>
                          </div>
                        </div>
                      </td>

                      <td>
                        <span
                          className={`pm-status ${
                            manager.status === "Active"
                              ? "active"
                              : "inactive"
                          }`}
                        >
                          <i></i>
                          {manager.status}
                        </span>
                      </td>

                      <td>
                        <div className="pm-activity-cell">
                          <strong>{manager.activityLabel}</strong>
                          <span>{manager.activity}</span>
                        </div>
                      </td>

                      <td>
                        <div className="pm-row-actions">
                          <button
                            className="pm-view-button"
                            onClick={() =>
                              setSelectedManager(manager)
                            }
                          >
                            View
                          </button>

                          <button
                            className="pm-delete-button"
                            title="Delete this Project Manager"
                            onClick={() =>
                              handleDeleteProjectManager(manager.id)
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
                          >
                            Delete
                          </button>

                          <button
                            className="pm-more-button"
                            title="More actions"
                            onClick={() =>
                              openNoteModal(manager)
                            }
                          >
                            •••
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8">
                      <div className="pm-empty-state">
                        <div>⌕</div>
                        <h3>No Project Managers Found</h3>
                        <p>
                          Try changing your search or filter
                          settings.
                        </p>
                        <button onClick={clearFilters}>
                          Clear Filters
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <footer className="pm-table-footer">
            <span>
              Showing <strong>{filteredManagers.length}</strong>{" "}
              project managers
            </span>

            <span>
              Role-controlled accounts · Admin managed
            </span>
          </footer>
        </div>
      </section>

      <section className="pm-bottom-insight">
        <div>
          <span className="pm-eyebrow">Management insight</span>
          <h2>Keep your support leadership balanced.</h2>
          <p>
            Monitor workload and active projects to identify
            managers who may need additional support.
          </p>
        </div>

        <div className="pm-insight-stat">
          <strong>{highWorkloadManagers}</strong>
          <span>Managers above 75% workload</span>
        </div>
      </section>

      {showCreateModal && (
        <ManagerModal
          title="Create Project Manager"
          subtitle="Create a complete role-based account for a new project manager."
          formData={formData}
          onChange={handleFormChange}
          onSubmit={handleCreateManager}
          onClose={() => {
            setShowCreateModal(false);
            setFormData(emptyForm);
          }}
          submitText="Create Project Manager"
        />
      )}

      {showNoteModal && (
        <NoteModal
          manager={selectedManager}
          noteText={noteText}
          setNoteText={setNoteText}
          onSubmit={sendNote}
          onClose={() => setShowNoteModal(false)}
        />
      )}

      {toast && <div className="pm-toast">{toast}</div>}
    </div>
  );
}




function ManagerModal({
  title,
  subtitle,
  formData,
  onChange,
  onSubmit,
  onClose,
  submitText,
  editMode = false,
}) {
  return (
    <div className="pm-modal-overlay" onMouseDown={onClose}>
      <div
        className="pm-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="pm-modal-header">
          <div>
            <span className="pm-eyebrow">
              {editMode ? "Account management" : "New account"}
            </span>

            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          <button className="pm-modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="pm-modal-body">
            <div className="pm-form-section">
              <div className="pm-form-section-heading">
                <span>01</span>
                <div>
                  <strong>Profile Information</strong>
                  <small>Basic manager information</small>
                </div>
              </div>

              <div className="pm-form-grid">
                <FormField
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={onChange}
                  placeholder="e.g. Sarah Chen"
                  required
                />

                <FormField
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={onChange}
                  placeholder="manager@example.com"
                  required
                />

                <FormField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={onChange}
                  placeholder="+92 300 1234567"
                  required
                />

                <FormField
                  label="Location"
                  name="location"
                  value={formData.location}
                  onChange={onChange}
                  placeholder="Islamabad, Pakistan"
                />
              </div>
            </div>

            <div className="pm-form-section">
              <div className="pm-form-section-heading">
                <span>02</span>
                <div>
                  <strong>Professional Information</strong>
                  <small>Role and organizational details</small>
                </div>
              </div>

              <div className="pm-form-grid">
                <div className="pm-form-field">
                  <label>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={onChange}
                  >
                    <option value="">Select department</option>
                    <option value="Support Operations">
                      Support Operations
                    </option>
                    <option value="Client Services">
                      Client Services
                    </option>
                    <option value="Technical Support">
                      Technical Support
                    </option>
                    <option value="Customer Success">
                      Customer Success
                    </option>
                  </select>
                </div>

                <FormField
                  label="Designation"
                  name="designation"
                  value={formData.designation}
                  onChange={onChange}
                  placeholder="Senior Project Manager"
                />

                <FormField
                  label="Experience"
                  name="experience"
                  value={formData.experience}
                  onChange={onChange}
                  placeholder="e.g. 5 Years"
                />

                <div className="pm-form-field">
                  <label>Role</label>
                  <div className="pm-fixed-role">
                    <span>◆</span>
                    Project Manager
                    <small>Fixed role</small>
                  </div>
                </div>
              </div>
            </div>

            <div className="pm-form-section">
              <div className="pm-form-section-heading">
                <span>03</span>
                <div>
                  <strong>Account Access</strong>
                  <small>Login and account status</small>
                </div>
              </div>

              <div className="pm-form-grid">
                <FormField
                  label={editMode ? "New Password" : "Password"}
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={onChange}
                  placeholder="Enter password"
                  required={!editMode}
                />

                <FormField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={onChange}
                  placeholder="Confirm password"
                  required={!editMode}
                />

                <div className="pm-form-field">
                  <label>Account Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={onChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pm-form-section">
              <div className="pm-form-section-heading">
                <span>04</span>
                <div>
                  <strong>Profile Summary</strong>
                  <small>Optional additional information</small>
                </div>
              </div>

              <div className="pm-form-field">
                <label>Short Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={onChange}
                  placeholder="Write a short professional summary..."
                />
              </div>
            </div>
          </div>

          <div className="pm-modal-footer">
            <span>
              Role will be stored as{" "}
              <strong>project_manager</strong>.
            </span>

            <div>
              <button
                type="button"
                className="pm-cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="pm-primary-button">
                {submitText}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="pm-form-field">
      <label>
        {label}
        {required && <em>*</em>}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

function NoteModal({
  manager,
  noteText,
  setNoteText,
  onSubmit,
  onClose,
}) {
  return (
    <div className="pm-modal-overlay" onMouseDown={onClose}>
      <div
        className="pm-note-modal"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="pm-note-header">
          <div className="pm-note-avatar">
            {manager?.initials}
          </div>

          <div>
            <span>Internal communication</span>
            <h2>Send Note</h2>
            <p>
              Send a note to{" "}
              <strong>{manager?.name}</strong>.
            </p>
          </div>

          <button onClick={onClose}>×</button>
        </div>

        <form onSubmit={onSubmit}>
          <textarea
            value={noteText}
            onChange={(event) => setNoteText(event.target.value)}
            placeholder="Write your message or internal note..."
            autoFocus
          />

          <div className="pm-note-footer">
            <span>Only the selected manager will receive this note.</span>

            <div>
              <button
                type="button"
                className="pm-cancel-button"
                onClick={onClose}
              >
                Cancel
              </button>

              <button type="submit" className="pm-primary-button">
                Send Note
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectManagersPage;