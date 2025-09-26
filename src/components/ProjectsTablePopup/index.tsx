import React, { useState } from 'react';
import styles from './ProjectsTablePopup.module.css';

interface ProjectsTablePopupProps {
  onClose: () => void;
}

const ProjectsTablePopup: React.FC<ProjectsTablePopupProps> = ({ onClose }) => {
  const [showLinePlanOptions, setShowLinePlanOptions] = useState(false);
  const [linePlanPosition, setLinePlanPosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState('');

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
    if (columnName === 'Line Plan') {
      setSelectedProject(projectName);
      setShowLinePlanOptions(true);
    } else {
      // alert(`Clicked on ${projectName} - ${columnName}`);
    }
  };

  const handleLinePlanOptionClick = (option: string) => {
    alert(`${selectedProject} - ${option}`);
    setShowLinePlanOptions(false);
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
            <thead>
              <tr>
                <th>Project</th>
                <th>Basic Information</th>
                <th>Key Process</th>
                <th>Manufacture Issue</th>
                <th>Line Plan</th>
              </tr>
            </thead>
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
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      setLinePlanPosition({ x: rect.right + 10, y: rect.top });
                      handleCellClick(project.project, 'Line Plan');
                    }}
                  >
                    {project.linePlan}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showLinePlanOptions && (
          <div
            className={styles.linePlanOptions}
            style={{
              left: `${linePlanPosition.x}px`,
              top: `${linePlanPosition.y}px`,
            }}
          >
            <div
              className={styles.linePlanOption}
              onClick={() => handleLinePlanOptionClick('Line Capacity')}
            >
              Line Capacity
            </div>
            <div
              className={styles.linePlanOption}
              onClick={() => handleLinePlanOptionClick('Line Layout')}
            >
              Line Layout
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsTablePopup;