import "./AdminSectionPlaceholder.css";

function AdminSectionPlaceholder({ title, description }) {
  return (
    <section className="admin-section-placeholder">
      <p className="admin-section-placeholder-eyebrow">Admin workspace</p>
      <h1>{title}</h1>
      <p>{description}</p>
    </section>
  );
}

export default AdminSectionPlaceholder;
