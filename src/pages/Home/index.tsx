import React, { useState } from 'react';
import styles from './Home.module.css';
import PopupMenu from '../../components/PopupMenu';
import FileManager from '../../components/FileManager';
import ProcessManager from '../../components/FileManager/ProcessManager';
import ProjectsTablePopup from '../../components/ProjectsTablePopup';
import MoreMenu from '../../components/MoreMenu';
import StatsPanel from '../../components/StatsPanel';

// 武汉中心点
const wuhanCenter = {
  name: 'Wuhan',
  nameEn: '武汉',
  position: { x: 73, y: 44 },
  color: '#FF4444',
};

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
    color: '#4ECDC4',
    showLock: true
  },
  {
    name: 'Indonesia',
    nameEn: '',
    position: { x: 76, y: 66 },
    color: '#d145a7ff',
    showLock: true
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
  const [showMoreMenu, setShowMoreMenu] = useState(false);

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
          {/* SVG 辐射线层 */}
          <svg className={styles.radiationSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              {countryMarkers.map((country, index) => (
                <linearGradient
                  key={`grad-${index}`}
                  id={`lineGrad-${index}`}
                  x1={`${wuhanCenter.position.x}%`}
                  y1={`${wuhanCenter.position.y}%`}
                  x2={`${country.position.x}%`}
                  y2={`${country.position.y}%`}
                >
                  <stop offset="0%" stopColor={wuhanCenter.color} stopOpacity="0.9" />
                  <stop offset="100%" stopColor={country.color} stopOpacity="0.6" />
                </linearGradient>
              ))}
            </defs>
            {/* 辐射线 */}
            {countryMarkers.map((country, index) => (
              <g key={`line-group-${index}`}>
                {/* 底层光晕线 */}
                <line
                  x1={wuhanCenter.position.x}
                  y1={wuhanCenter.position.y}
                  x2={country.position.x}
                  y2={country.position.y}
                  stroke={country.color}
                  strokeWidth="0.15"
                  strokeOpacity="0.2"
                  className={styles.radiationLineGlow}
                  style={{ animationDelay: `${index * 0.4}s` }}
                />
                {/* 主辐射线 */}
                <line
                  x1={wuhanCenter.position.x}
                  y1={wuhanCenter.position.y}
                  x2={country.position.x}
                  y2={country.position.y}
                  stroke={`url(#lineGrad-${index})`}
                  strokeWidth="0.08"
                  strokeDasharray="0.5 0.3"
                  className={styles.radiationLine}
                  style={{ animationDelay: `${index * 0.4}s` }}
                />
                {/* 流光粒子效果 */}
                <circle r="0.25" fill={wuhanCenter.color} opacity="0.9">
                  <animateMotion
                    dur={`${2.5 + index * 0.3}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                    path={`M${wuhanCenter.position.x},${wuhanCenter.position.y} L${country.position.x},${country.position.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    dur={`${2.5 + index * 0.3}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.5}s`}
                  />
                </circle>
                {/* 第二个流光粒子，错开时间 */}
                <circle r="0.18" fill={country.color} opacity="0.7">
                  <animateMotion
                    dur={`${3 + index * 0.2}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.5 + 1.2}s`}
                    path={`M${wuhanCenter.position.x},${wuhanCenter.position.y} L${country.position.x},${country.position.y}`}
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.7;0.7;0"
                    dur={`${3 + index * 0.2}s`}
                    repeatCount="indefinite"
                    begin={`${index * 0.5 + 1.2}s`}
                  />
                </circle>
              </g>
            ))}
          </svg>

          {/* 武汉中心标记 */}
          <div
            className={`${styles.countryMarker} ${styles.wuhanMarker}`}
            style={{
              left: `${wuhanCenter.position.x}%`,
              top: `${wuhanCenter.position.y}%`,
              '--marker-color': wuhanCenter.color,
            } as React.CSSProperties}
          >
            <div className={styles.markerRing}></div>
            <div className={styles.markerCore}></div>
            <div className={styles.wuhanPulse}></div>
            <div className={styles.wuhanPulse2}></div>
            <div className={styles.markerLabel}>
              <div className={styles.labelName}>
                {wuhanCenter.name}
              </div>
            </div>
          </div>

          {/* 其他城市标记 */}
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
              {/* Brazil (index 0) 和 Argentina (index 4) 不显示脉冲动画 */}
              {(index !== 0 && index !== 4) && <div className={styles.markerPulse}></div>}
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

      {/* 右侧统计面板 */}
      <StatsPanel />

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
