import React, { useState } from 'react';
import styles from './Home.module.css';
import PopupMenu from '../../components/PopupMenu';
import FileManager from '../../components/FileManager';
import ProcessManager from '../../components/FileManager/ProcessManager';
import ProjectsTablePopup from '../../components/ProjectsTablePopup';
import MoreMenu from '../../components/MoreMenu';

const countryMarkers = [
  {
    name: 'WPC',
    nameEn: '',
    position: { x: 72, y: 35 }, // 调整为更符合中国地理位置的中心点
    color: '#FFD700',
    isCenter: true,
    size: 'large'
  },
  {
    name: 'Brazil',
    nameEn: '',
    position: { x: 35, y: 73 },
    color: '#FF6B35',
    showPulse: true
  },
  {
    name: 'India',
    nameEn: '',
    position: { x: 64, y: 54 },
    color: '#4ECDC4',
    showPulse: true
  },
  {
    name: 'Indonesia',
    nameEn: '',
    position: { x: 76, y: 66 },
    color: '#d145a7ff',
    showPulse: true
  },
  {
    name: '‌Argentina',
    nameEn: '',
    position: { x: 30, y: 88 },
    color: '#d8e045ff',
    showPulse: true
  },
];

const Home: React.FC = () => {
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [showProcessManager, setShowProcessManager] = useState(false);
  const [showProjectsTable, setShowProjectsTable] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  // Get WPC center position
  const wuhanPosition = countryMarkers.find(m => m.name === 'WPC')?.position || { x: 70, y: 42 };

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
      setShowMoreMenu(true);
    }
    // 其他菜单项的处理逻辑（Saudi Arabia的Project Overview不做任何处理）
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

  const handleMoreMenuClose = () => {
    setShowMoreMenu(false);
    setSelectedCountry(null);
  };

  const handleMoreMenuSelect = (option: string) => {
    console.log(`More menu selected: ${option} for ${selectedCountry}`);
    setShowMoreMenu(false);

    if (option === 'Project Overview') {
      setShowProjectsTable(true);
    } else if (option === 'File Transfer') {
      setShowFileManager(true);
    } else if (option === 'Process') {
      setShowProcessManager(true);
    }

    setSelectedCountry(null);
  };

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <div className={styles.backgroundImage}></div>
        <div className={styles.mapOverlay}>
          {/* SVG for curved radiation lines from WUHAN */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              pointerEvents: 'none',
              zIndex: 1,
            }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{ stopColor: '#888888', stopOpacity: 0.3 }} />
                <stop offset="50%" style={{ stopColor: '#999999', stopOpacity: 0.5 }} />
                <stop offset="100%" style={{ stopColor: '#888888', stopOpacity: 0.4 }} />
              </linearGradient>
            </defs>

            {countryMarkers.map((country, index) => {
              // 跳过WPC中心点本身
              if (country.name === 'WPC') return null;

              const centerX = wuhanPosition.x;
              const centerY = wuhanPosition.y;
              const targetX = country.position.x;
              const targetY = country.position.y;

              // 计算距离
              const dx = targetX - centerX;
              const dy = targetY - centerY;
              const distance = Math.sqrt(dx * dx + dy * dy);

              // 创建直线路径
              const pathData = `M ${centerX},${centerY} L ${targetX},${targetY}`;

              return (
                <g key={`radiation-${index}`}>
                  {/* 主直线 - 实线 */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="url(#lineGradient)"
                    strokeWidth="0.4"
                    strokeOpacity="0.6"
                    strokeLinecap="round"
                  />

                  {/* 细装饰线 - 淡实线 */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#888888"
                    strokeWidth="0.2"
                    strokeOpacity="0.3"
                    strokeLinecap="round"
                  />

                  {/* 背景光晕 - 极淡实线 */}
                  <path
                    d={pathData}
                    fill="none"
                    stroke="#aaaaaa"
                    strokeWidth="0.1"
                    strokeOpacity="0.2"
                    strokeLinecap="round"
                    filter="url(#softGlow)"
                  />
                </g>
              );
            })}
          </svg>

          {countryMarkers.map((country, index) => (
            <div
              key={index}
              className={`${styles.countryMarker} ${country.isCenter ? styles.centerMarker : ''} ${country.isCenter ? styles.noClick : ''}`}
              style={{
                left: `${country.position.x}%`,
                top: `${country.position.y}%`,
                animationDelay: `${index * 0.6}s`,
                '--marker-color': country.color,
                cursor: country.isCenter ? 'default' : 'pointer',
              } as React.CSSProperties}
              onClick={() => !country.isCenter && handleMarkerClick(country.name)}
            >
              {country.isCenter ? (
                <div className={styles.factoryMarker}>
                  <svg viewBox="0 0 24 24" fill="currentColor" className={styles.factoryIcon}>
                    {/* 旗杆 */}
                    <rect x="11" y="5" width="2" height="15" rx="0.5"/>

                    {/* 简单的三角形旗帜 */}
                    <path d="M13 5 L21 9 L13 13 Z" fill="currentColor"/>
                  </svg>
                </div>
              ) : (
                <>
                  <div className={styles.markerRing}></div>
                  <div className={styles.markerCore}></div>
                  {/* Show pulse animation for specific countries */}
                  {country.showPulse && <div className={styles.markerPulse}></div>}
                </>
              )}
              <div className={styles.markerLabel}>
                <div className={styles.labelName}>
                  {country.name}
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
        <ProjectsTablePopup onClose={handleProjectsTableClose} />
      )}

      {showMoreMenu && selectedCountry && (
        <MoreMenu
          countryName={selectedCountry}
          onClose={handleMoreMenuClose}
          onSelect={handleMoreMenuSelect}
        />
      )}

    </div>
  );
};

export default Home;
