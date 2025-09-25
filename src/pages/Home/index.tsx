import React, { useState } from 'react';
import styles from './Home.module.css';
import PopupMenu from '../../components/PopupMenu';
import FileManager from '../../components/FileManager';
import ProcessManager from '../../components/FileManager/ProcessManager';
import ProjectsFlowchartPopup from '../../components/ProjectsFlowchartPopup';

const countryMarkers = [
  {
    name: 'Brazil',
    nameEn: '',
    position: { x: 35, y: 73 },
    color: '#FF6B35'
  },
  {
    name: 'India',
    nameEn: '',
    position: { x: 64, y: 54 },
    color: '#4ECDC4'
  },
  {
    name: 'Indonesia',
    nameEn: '',
    position: { x: 76, y: 66 },
    color: '#d145a7ff'
  },
  {
    name: 'Saudi Arabia‌',
    nameEn: '',
    position: { x: 56, y: 48 },
    color: '#45d155ff',
    showLock: true
  },
  {
    name: '‌Argentina',
    nameEn: '',
    position: { x: 30, y: 88 },
    color: '#d8e045ff'
  },
];

const Home: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [showProcessManager, setShowProcessManager] = useState(false);
  const [showProjectsTable, setShowProjectsTable] = useState(false);

  const handleMarkerClick = (countryName: string) => {
    setSelectedCountry(countryName);
    setShowPopupMenu(true);
  };

  const handleMenuClose = () => {
    setShowPopupMenu(false);
    setSelectedCountry(null);
  };

  const handleMenuSelect = (option: string) => {
    console.log(`Selected ${option} for ${selectedCountry}`);

    if (option === 'Files') {
      setShowPopupMenu(false);
      setShowFileManager(true);
    } else if (option === 'Process') {
      setShowPopupMenu(false);
      setShowProcessManager(true);
    } else if (option === 'Projects') {
      setShowPopupMenu(false);
      setShowProjectsTable(true);
    } else if (option === 'Security') {
      setShowPopupMenu(false);
      // alert(`Security features for ${selectedCountry} will be implemented soon.`);
    } else if (option === 'More') {
      setShowPopupMenu(false);
      // 新模块功能待实现
      console.log(`More for ${selectedCountry} - Coming Soon!`);
    }
    // 其他菜单项的处理逻辑（Saudi Arabia的Projects Info不做任何处理）
  };

  const handleFileManagerClose = () => {
    setShowFileManager(false);
    setSelectedCountry(null);
  };

  const handleProcessManagerClose = () => {
    setShowProcessManager(false);
    setSelectedCountry(null);
  };

  const handleProjectsTableClose = () => {
    setShowProjectsTable(false);
    setSelectedCountry(null);
  };

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.mapOverlay}>
          {countryMarkers.map((country, index) => (
            <div
              key={index}
              className={styles.countryMarker}
              style={{
                left: `${country.position.x}%`,
                top: `${country.position.y}%`,
                animationDelay: `${index * 0.6}s`,
                '--marker-color': country.color,
              } as React.CSSProperties}
              onClick={() => handleMarkerClick(country.name)}
            >
              <div className={styles.markerRing}></div>
              <div className={styles.markerCore}></div>
              <div className={styles.markerPulse}></div>
              <div className={styles.markerLabel}>
                <div className={styles.labelName}>
                  {country.name}
                  {country.showLock && <span className={styles.lockIcon}>🔒</span>}
                </div>
                <div className={styles.labelNameEn}>{country.nameEn}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showPopupMenu && selectedCountry && (
        <PopupMenu
          countryName={selectedCountry}
          onClose={handleMenuClose}
          onSelect={handleMenuSelect}
        />
      )}

      {showFileManager && selectedCountry && (
        <FileManager
          countryName={selectedCountry}
          onClose={handleFileManagerClose}
        />
      )}

      {showProcessManager && selectedCountry && (
        <ProcessManager
          countryName={selectedCountry}
          onClose={handleProcessManagerClose}
        />
      )}

      {showProjectsTable && (
        <ProjectsFlowchartPopup onClose={handleProjectsTableClose} />
      )}

    </div>
  );
};

export default Home;
