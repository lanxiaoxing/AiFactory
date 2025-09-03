import React from 'react';
import styles from './ProjectsTablePopup.module.css';

interface ProjectsTablePopupProps {
  onClose: () => void;
}

const ProjectsTablePopup: React.FC<ProjectsTablePopupProps> = ({ onClose }) => {
  const projectData = [
    {
      project: 'PROTO25',
      onePage: 'Project One Page',
      schedule: 'Schedule',
      keyFeatures: 'Key Features',
      linePlan: 'Line Plan / Layout',
      keyIssue: 'Key Issue'
    },
    {
      project: 'LAGOS25',
      onePage: 'Project One Page',
      schedule: 'Schedule',
      keyFeatures: 'Key Features',
      linePlan: 'Line Plan / Layout',
      keyIssue: 'Key Issue'
    },
    {
      project: 'UTAH26',
      onePage: 'Project One Page',
      schedule: 'Schedule',
      keyFeatures: 'Key Features',
      linePlan: 'Line Plan / Layout',
      keyIssue: 'Key Issue'
    },
    {
      project: 'EQUATOR25',
      onePage: 'Project One Page',
      schedule: 'Schedule',
      keyFeatures: 'Key Features',
      linePlan: 'Line Plan / Layout',
      keyIssue: 'Key Issue'
    }
  ];

  const handleCellClick = (projectName: string, columnName: string) => {
    // alert(`Clicked on ${projectName} - ${columnName}`);
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupTable} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h3>Projects Overview</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.projectsTable}>
            <thead>
              <tr>
                <th>Project</th>
                <th>One Page</th>
                <th>Schedule</th>
                <th>Key Features</th>
                <th>Line Plan / Layout</th>
                <th>Key Issue</th>
              </tr>
            </thead>
            <tbody>
              {projectData.map((project, rowIndex) => (
                <tr key={rowIndex}>
                  <td className={styles.projectName}>{project.project}</td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'One Page')}
                  >
                    {project.onePage}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'Schedule')}
                  >
                    {project.schedule}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'Key Features')}
                  >
                    {project.keyFeatures}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'Line Plan / Layout')}
                  >
                    {project.linePlan}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'Key Issue')}
                  >
                    {project.keyIssue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProjectsTablePopup;