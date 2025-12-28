import React, { useState } from 'react';
import styles from './ProjectsTablePopup.module.css';
import ProjectDetailsPopup from './ProjectDetailsPopup';

interface ProjectsTablePopupProps {
  onClose: () => void;
}

const ProjectsTablePopup: React.FC<ProjectsTablePopupProps> = ({ onClose }) => {
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const projectData = [
    {
      project: 'URUS25',
      basicInformation: 'Basic Information',
      keyProcess: 'Key Process',
      manufactureIssue: 'Manufacture Issue',
      linePlan: 'Line Plan'
    },
    {
      project: 'AVENGER26',
      basicInformation: 'Basic Information',
      keyProcess: 'Key Process',
      manufactureIssue: 'Manufacture Issue',
      linePlan: 'Line Plan'
    },
    {
      project: 'DALLAS26',
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

  const getOptionsForColumn = (columnName: string) => {
    switch (columnName) {
      case 'Basic Information':
        return ['Product Config', 'Team Member', 'Product Volume'];
      case 'Key Process':
        return ['SMT', 'BE', 'CFC'];
      case 'Manufacture Issue':
        return ['SMT Issue', 'BE Issue', 'CFC Issue'];
      case 'Line Plan':
        return ['Line Capacity', 'Line Layout'];
      default:
        return [];
    }
  };

  const handleCellClick = (projectName: string, columnName: string) => {
    setSelectedProject(projectName);
    setSelectedColumn(columnName);
    setShowOptionsMenu(true);
  };

  const handleOptionClick = (option: string) => {
    alert(`${selectedProject} - ${selectedColumn}: ${option}`);
    setShowOptionsMenu(false);
  };

  const handlePopupTableClick = () => {
    // Close options menu when clicking on the popup table area
    if (showOptionsMenu) {
      setShowOptionsMenu(false);
    }
  };

  const handleProjectNameClick = (projectName: string) => {
    setSelectedProject(projectName);
    setShowProjectDetails(true);
  };


  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupTable} onClick={(e) => {
        e.stopPropagation();
        handlePopupTableClick();
      }}>
        <div className={styles.popupHeader} onClick={(e) => e.stopPropagation()}>
          <h2 className={styles.popupTitle}>
            <strong>Ongoing Projects</strong>
            <span className={styles.projectCount}>{projectData.length}</span>
          </h2>
          <div className={styles.ecgContainer}>
            <svg className={styles.ecgLine} viewBox="0 0 200 40" preserveAspectRatio="none">
              <polyline
                points="0,20 35,20 38,5 42,35 46,8 50,32 54,20 85,20 88,5 92,35 96,8 100,32 104,20 135,20 138,5 142,35 146,8 150,32 154,20 200,20"
              />
            </svg>
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
                  <td
                    className={`${styles.projectName} ${styles.clickableProjectName}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleProjectNameClick(project.project);
                    }}
                  >
                    <div className={styles.projectNameContainer}>
                      <div className={`${styles.statusLight} ${project.project === 'URUS25' ? styles.yellowLight : ''}`}></div>
                      {project.project}
                      <span className={styles.clickIndicator}>📊</span>
                    </div>
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMenuPosition({ x: rect.right + 10, y: rect.top });
                      handleCellClick(project.project, 'Basic Information');
                    }}
                  >
                    {project.basicInformation}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMenuPosition({ x: rect.right + 10, y: rect.top });
                      handleCellClick(project.project, 'Key Process');
                    }}
                  >
                    {project.keyProcess}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMenuPosition({ x: rect.right + 10, y: rect.top });
                      handleCellClick(project.project, 'Manufacture Issue');
                    }}
                  >
                    {project.manufactureIssue}
                  </td>
                  <td
                    className={styles.clickableCell}
                    onClick={(e) => {
                      e.stopPropagation();
                      const rect = e.currentTarget.getBoundingClientRect();
                      setMenuPosition({ x: rect.right + 10, y: rect.top });
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

        {showOptionsMenu && (
          <div
            className={styles.linePlanOptions}
            style={{
              left: `${menuPosition.x}px`,
              top: `${menuPosition.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {getOptionsForColumn(selectedColumn).map((option, index) => (
              <div
                key={index}
                className={styles.linePlanOption}
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
          </div>
        )}

        {showProjectDetails && (
          <ProjectDetailsPopup
            projectName={selectedProject}
            onClose={() => setShowProjectDetails(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectsTablePopup;