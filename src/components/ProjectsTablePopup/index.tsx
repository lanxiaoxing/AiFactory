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
          <h2 className={styles.popupTitle}>Ongoing Projects 4</h2>
          <div className={styles.ecgContainer}>
            <svg className={styles.ecgLine} viewBox="0 0 200 40" preserveAspectRatio="none">
              <polyline
                points="0,20 35,20 38,5 42,35 46,8 50,32 54,20 85,20 88,5 92,35 96,8 100,32 104,20 135,20 138,5 142,35 146,8 150,32 154,20 200,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
            <div className={styles.ecgPulse}></div>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
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