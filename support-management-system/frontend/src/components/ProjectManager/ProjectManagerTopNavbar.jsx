import {
  FaBell,
  FaUserCircle
} from "react-icons/fa";

import "./ProjectManagerTopNavbar.css";


function ProjectManagerTopNavbar() {
  return (
    <header className="project-manager-top-navbar">

      {/* Dashboard Title */}
      <div>
        <strong>Project Manager Dashboard</strong>
      </div>


      {/* Search */}
      <input
        type="text"
        className="project-manager-search"
        placeholder="Search tickets..."
      />


      {/* Right Side */}
      <div className="project-manager-navbar-right">

        {/* Notification */}
        <FaBell className="project-manager-navbar-icon" />


        {/* Profile */}
        <div className="project-manager-navbar-profile">

          <FaUserCircle className="project-manager-navbar-icon" />

          <span>Project Manager</span>

        </div>

      </div>

    </header>
  );
}


export default ProjectManagerTopNavbar;