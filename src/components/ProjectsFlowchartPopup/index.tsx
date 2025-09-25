import React from 'react';
import styles from './ProjectsFlowchartPopup.module.css';

interface ProjectsFlowchartPopupProps {
  onClose: () => void;
}

const ProjectsFlowchartPopup: React.FC<ProjectsFlowchartPopupProps> = ({ onClose }) => {
  const projectData = [
    {
      project: 'PROTO25',
      items: ['Basic Information', 'Key Process', 'Manufacture Issue', 'Line Plan'],
      color: '#FF6B35'
    },
    {
      project: 'LAGOS25',
      items: ['Basic Information', 'Key Process', 'Manufacture Issue', 'Line Plan'],
      color: '#4ECDC4'
    },
    {
      project: 'UTAH26',
      items: ['Basic Information', 'Key Process', 'Manufacture Issue', 'Line Plan'],
      color: '#45B7D1'
    },
    {
      project: 'EQUATOR25',
      items: ['Basic Information', 'Key Process', 'Manufacture Issue', 'Line Plan'],
      color: '#96CEB4'
    }
  ];

  const handleItemClick = (projectName: string, item: string) => {
    console.log(`Clicked on ${projectName} - ${item}`);
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h3>Local New Project Overview</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        
        <div className={styles.flowchartContainer}>
          <div className={styles.flowchartRow}>
            {projectData.map((project, index) => (
              <div key={project.project} className={styles.projectFlow}>
                <div className={styles.projectNode}>
                  <span className={styles.projectName}>{project.project}</span>
                  <div 
                    className={styles.projectIndicator}
                    style={{ '--indicator-color': project.color } as React.CSSProperties}
                  ></div>
                </div>
                
                {project.items.length > 0 && (
                  <div className={styles.projectDetails}>
                    {project.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className={styles.detailItem}
                        onClick={() => handleItemClick(project.project, item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
                
                {index < projectData.length - 1 && (
                  <div className={styles.arrow}>→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsFlowchartPopup;