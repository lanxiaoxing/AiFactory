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
          <a href="https://smartwhp.lenovo.com/whsc/" target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="10" rx="2" />
              <circle cx="12" cy="5" r="2" />
              <path d="M12 7v4" />
              <line x1="8" y1="16" x2="8.01" y2="16" />
              <line x1="16" y1="16" x2="16.01" y2="16" />
            </svg>
          </a>
          <span className={styles.tooltip}>WHSC Intelligence</span>
        </div>
        
        <div className={styles.linkWrapper}>
          <a href="https://npi.lenovo.com/" target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="6" width="36" height="28" rx="4" />
              <text x="20" y="22" dominantBaseline="middle" textAnchor="middle" fontSize="11" fontWeight="bold" stroke="none" fill="currentColor">I-NPI</text>
            </svg>
          </a>
          <span className={styles.tooltip}>MDSC I-NPI System</span>
        </div>

        <div className={styles.linkWrapper}>
          <a href="https://npi.mfg.lenovo.com/" target="_blank" rel="noopener noreferrer" className={styles.linkIcon}>
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="20" cy="20" r="16" />
              <text x="20" y="22" dominantBaseline="middle" textAnchor="middle" fontSize="16" fontWeight="bold" stroke="none" fill="currentColor">GE</text>
            </svg>
          </a>
          <span className={styles.tooltip}>GE NPI System</span>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
