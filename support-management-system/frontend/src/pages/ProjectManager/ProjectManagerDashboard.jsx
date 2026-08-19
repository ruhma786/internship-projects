import ProjectManagerSidebar from "../../components/ProjectManager/ProjectManagerSidebar";
import ProjectManagerTopNavbar from "../../components/ProjectManager/ProjectManagerTopNavbar";
import ProjectManagerStatsCards from "../../components/ProjectManager/ProjectManagerStatsCards";

import "./ProjectManagerDashboard.css";


function ProjectManagerDashboard() {
  return (
    <div className="project-manager-dashboard">

      {/* =================================
          SIDEBAR
      ================================= */}

      <ProjectManagerSidebar />


      {/* =================================
          MAIN CONTENT
      ================================= */}

      <div className="project-manager-main">

        {/* =================================
            TOP NAVBAR
        ================================= */}

        <ProjectManagerTopNavbar />


        {/* =================================
            DASHBOARD CONTENT
        ================================= */}

        <main className="project-manager-content">


          {/* =================================
              PAGE HEADING
          ================================= */}

          <div className="dashboard-heading">

            <h1>
              Project Manager Dashboard
            </h1>

          </div>


          {/* =================================
              STATISTICS CARDS
          ================================= */}

          <ProjectManagerStatsCards />


        </main>

      </div>

    </div>
  );
}


export default ProjectManagerDashboard;