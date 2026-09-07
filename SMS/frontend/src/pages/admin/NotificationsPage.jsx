import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/notifications`);
        setNotifications(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load notifications from backend:", error);
        setNotifications([]);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h2 style={{ marginBottom: "20px" }}>Notifications</h2>

      <div style={{ display: "grid", gap: "12px" }}>
        {notifications.length === 0 ? (
          <div style={{ padding: "18px", background: "#f3f4f6", borderRadius: "12px" }}>
            No notifications found.
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item._id || item.id}
              style={{
                background: item.isRead ? "#ffffff" : "#eef6ff",
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: "6px" }}>{item.title}</div>
              <div style={{ color: "#4b5563", marginBottom: "8px" }}>{item.message}</div>
              <small style={{ color: "#6b7280" }}>
                {item.type} · {item.isRead ? "Read" : "Unread"}
              </small>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
