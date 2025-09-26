import React from 'react';
import styles from './ProjectsTablePopup.module.css';

interface ProjectsTablePopupProps {
  onClose: () => void;
}

const ProjectsTablePopup: React.FC<ProjectsTablePopupProps> = ({ onClose }) => {
  const projectData = [
    {
      project: 'PROTO25',
      basicInformation: 'Basic Information',
      keyProcess: 'Key Process',
      manufactureIssue: 'Manufacture Issue',
      linePlan: 'Line Plan'
    },
    {
      project: 'LAGOS25',
      basicInformation: 'Basic Information',
      keyProcess: 'Key Process',
      manufactureIssue: 'Manufacture Issue',
      linePlan: 'Line Plan'
    },
    {
      project: 'UTAH26',
      basicInformation: 'Basic Information',
      keyProcess: 'Key Process',
      manufactureIssue: 'Manufacture Issue',
      linePlan: 'Line Plan'
    },
    {
      project: 'EQUATOR25',
      basicInformation: 'Basic Information',
      keyProcess: 'Key Process',
      manufactureIssue: 'Manufacture Issue',
      linePlan: 'Line Plan'
    }
  ];

  const handleCellClick = (projectName: string, columnName: string) => {
    // alert(`Clicked on ${projectName} - ${columnName}`);
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupTable} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h3>Local New Project Overview</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.tableContainer}>
          <table className={styles.projectsTable}>
            <tbody>
              {projectData.map((project, rowIndex) => (
                <tr key={rowIndex}>
                  <td className={styles.projectName}>
                    <div className={styles.projectNameContainer}>
                      <div className={`${styles.statusLight} ${project.project === 'EQUATOR25' ? styles.yellowLight : ''}`}></div>
                      {project.project}
                    </div>
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'Basic Information')}
                  >
                    {project.basicInformation}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'Key Process')}
                  >
                    {project.keyProcess}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'Manufacture Issue')}
                  >
                    {project.manufactureIssue}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={() => handleCellClick(project.project, 'Line Plan')}
                  >
                    {project.linePlan}
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