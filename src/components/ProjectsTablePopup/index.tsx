import React, { useState } from 'react';
import styles from './ProjectsTablePopup.module.css';
import ProjectDetailsPopup from './ProjectDetailsPopup';

interface ProjectsTablePopupProps {
  onClose: () => void;
}

const projectData = [
  {
    project: 'URUS25',
    color: '#4ECDC4',
    glow: 'rgba(78, 205, 196, 0.2)',
    status: 'green',
  },
  {
    project: 'AVENGER26',
    color: '#FF6B6B',
    glow: 'rgba(255, 107, 107, 0.2)',
    status: 'yellow',
  },
  {
    project: 'DALLAS26',
    color: '#A78BFA',
    glow: 'rgba(167, 139, 250, 0.2)',
    status: 'green',
  },
  {
    project: 'EQUATOR25',
    color: '#F59E0B',
    glow: 'rgba(245, 158, 11, 0.2)',
    status: 'green',
  },
];

const ProjectsTablePopup: React.FC<ProjectsTablePopupProps> = ({ onClose }) => {
  const [selectedProject, setSelectedProject] = useState('');
  const [showProjectDetails, setShowProjectDetails] = useState(false);

  const handleProjectClick = (projectName: string) => {
    setSelectedProject(projectName);
    setShowProjectDetails(true);
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.popupHeader}>
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

        {/* 2×2 Card Grid */}
        <div className={styles.cardGrid}>
          {projectData.map((project, index) => (
            <div
              key={project.project}
              className={styles.projectCard}
              style={{
                '--card-color': project.color,
                '--card-glow': project.glow,
                animationDelay: `${index * 0.1}s`,
              } as React.CSSProperties}
              onClick={() => handleProjectClick(project.project)}
            >
              <div className={styles.cardHeader}>
                <div className={`${styles.statusLight} ${project.status === 'yellow' ? styles.yellowLight : ''}`}></div>
                <span className={styles.cardProjectName}>{project.project}</span>
              </div>
              <div className={styles.cardFooter}>
                <span className={styles.cardSubtext}>View Details</span>
                <span className={styles.cardArrow}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* Project Details Popup */}
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