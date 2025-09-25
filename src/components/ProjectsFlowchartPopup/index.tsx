import React, { useState } from 'react';
import styles from './ProjectsFlowchartPopup.module.css';

interface ProjectsFlowchartPopupProps {
  onClose: () => void;
}

const ProjectsFlowchartPopup: React.FC<ProjectsFlowchartPopupProps> = ({ onClose }) => {
  const [liquidGlassEffect, setLiquidGlassEffect] = useState<string | null>(null);
  const projectData = [
    {
      project: 'PROTO25',
      items: ['Basic Information', 'Key Process', 'Manufacture Issue', 'Line Plan'],
      color: '#11a05dff'
    },
    {
      project: 'LAGOS25',
      items: ['Basic Information', 'Key Process', 'Manufacture Issue', 'Line Plan'],
      color: '#11a05dff'
    },
    {
      project: 'UTAH26',
      items: ['Basic Information', 'Key Process', 'Manufacture Issue', 'Line Plan'],
      color: '#11a05dff'
    },
    {
      project: 'EQUATOR25',
      items: ['Basic Information', 'Key Process', 'Manufacture Issue', 'Line Plan'],
      color: '#FF6B35'
    }
  ];

  const handleItemClick = (projectName: string, item: string) => {
    console.log(`Clicked on ${projectName} - ${item}`);

    // 检查是否为指定项目，如果是则触发液态玻璃效果
    const targetProjects = ['PROTO25', 'LAGOS25', 'UTAH26', 'EQUATOR25'];
    if (targetProjects.includes(projectName)) {
      setLiquidGlassEffect(projectName);
      // 6秒后清除效果
      setTimeout(() => {
        setLiquidGlassEffect(null);
      }, 6000);
    }
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
                <div className={`${styles.projectNode} ${liquidGlassEffect === project.project ? styles.liquidGlass : ''}`}>
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