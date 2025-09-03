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
              {projectData.map((project, index) => (
                <tr key={index}>
                  <td className={styles.projectName}>{project.project}</td>
                  <td>{project.onePage}</td>
                  <td>{project.schedule}</td>
                  <td>{project.keyFeatures}</td>
                  <td>{project.linePlan}</td>
                  <td>{project.keyIssue}</td>
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