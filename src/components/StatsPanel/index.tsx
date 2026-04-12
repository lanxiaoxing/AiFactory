import React from 'react';
import styles from './StatsPanel.module.css';

const StatsPanel: React.FC = () => {
  return (
    <div className={styles.statsPanel}>
      {/* Ongoing Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ongoing</h2>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>New Projects</h3>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Dixon</span>
              <span className={styles.statValue}>5</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>PTSN</span>
              <span className={styles.statValue}>4</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>SASC</span>
              <span className={styles.statValue}>0</span>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>New Process</h3>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Dixon</span>
              <span className={styles.statValue}>5</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>PTSN</span>
              <span className={styles.statValue}>4</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>SASC</span>
              <span className={styles.statValue}>0</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className={styles.linksContainer}>
        <div className={styles.linkWrapper}>
          <a href="#" className={styles.linkIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
          </a>
          <span className={styles.tooltip}>WHSC Intelligence</span>
        </div>
        
        <div className={styles.linkWrapper}>
          <a href="#" className={styles.linkIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
          </a>
          <span className={styles.tooltip}>MDSC I-NPI System</span>
        </div>

        <div className={styles.linkWrapper}>
          <a href="#" className={styles.linkIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
          </a>
          <span className={styles.tooltip}>GE NPI System</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
