import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminTopbar.css";

function AdminTopbar() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  // Ctrl + K se search focus
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Search submit
  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) return;

    navigate(`/admin/search?q=${encodeURIComponent(query)}`);

    setSearchQuery("");
  };

  return (
    <header className="admin-topbar">

      {/* Left Side */}
      <div className="admin-topbar-left">
        <div className="admin-eyebrow"></div>

        <h1>Support Management System</h1>
      </div>

      {/* Right Side */}
      <div className="admin-topbar-right">

        {/* Search */}
        <form
          className="admin-search"
          onSubmit={handleSearch}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search tickets, users..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(event.target.value)
            }
          />

          <span className="admin-search-kbd">
            Search
          </span>
        </form>

        {/* New Ticket */}
        <button
          className="admin-new-ticket"
          onClick={() => navigate("/admin/tickets")}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>

          New Ticket
        </button>

        {/* Notification */}
        <button
          className="admin-notification-btn"
          title="Notifications"
          onClick={() => navigate("/admin/notifications")}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 0 1-3.4 0" />
          </svg>

          <span className="admin-notification-dot"></span>
        </button>

      </div>
    </header>
  );
}

export default AdminTopbar;