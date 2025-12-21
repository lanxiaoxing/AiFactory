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

      {/* History Section */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>History</h2>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Support Projects</h3>
          <div className={styles.statsList}>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>Dixon</span>
              <span className={styles.statValue}>3</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>PTSN</span>
              <span className={styles.statValue}>2</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statLabel}>SASC</span>
              <span className={styles.statValue}>0</span>
            </div>
          </div>
        </div>

        <div className={styles.subsection}>
          <h3 className={styles.subsectionTitle}>Process Library</h3>
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
    </div>
  );
};

export default StatsPanel;
