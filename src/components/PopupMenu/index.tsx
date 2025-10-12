import React from 'react';
import styles from './PopupMenu.module.css';

interface PopupMenuProps {
  countryName: string;
  onClose: () => void;
  onSelect: (option: string) => void;
}

const PopupMenu: React.FC<PopupMenuProps> = ({ countryName, onClose, onSelect }) => {
  const standardMenuOptions = [
    {
      title: 'Projects',
      icon: '📊',
      color: '#FF6B35'
    },
    {
      title: 'Process',
      icon: '⚙️',
      color: '#4ECDC4'
    },
    {
      title: 'Files',
      icon: '📁',
      color: '#45B7D1'
    },
    {
      title: 'More',
      icon: '⋮',
      color: '#5E72E4'
    }
  ];

  const saudiArabiaMenuOptions = [
    {
      title: 'Project Overview',
      icon: '📊',
      color: '#FF6B35'
    },
    {
      title: 'NPI Readiness',
      icon: '⚙️',
      color: '#4ECDC4'
    },
    {
      title: 'File Transfer ',
      icon: '📁',
      color: '#84a515ff'
    },
    {
      title: 'E/F Tracking',
      icon: '🔧',
      color: '#F39C12'
    },
    {
      title: 'More',
      icon: '⋮',
      color: '#5E72E4'
    }
  ];

  const menuOptions = countryName.includes('Saudi Arabia') ? saudiArabiaMenuOptions : standardMenuOptions;

  const handleOptionClick = (option: string) => {
    onSelect(option);
  };

  return (
    <div className={styles.popupOverlay} onClick={onClose}>
      <div className={styles.popupMenu} onClick={(e) => e.stopPropagation()}>
        <div className={styles.popupHeader}>
          <h3>{countryName}</h3>
          <button className={styles.closeButton} onClick={onClose}>×</button>
        </div>
        <div className={styles.popupContent}>
          {menuOptions.map((option, index) => (
            <div
              key={option.title}
              className={styles.menuItem}
              onClick={() => handleOptionClick(option.title)}
              style={{
                animationDelay: `${index * 0.1}s`,
                '--icon-color': option.color
              } as React.CSSProperties}
            >
              <div className={styles.menuItemIcon} style={{ background: `linear-gradient(135deg, ${option.color} 0%, ${option.color}dd 100%)` }}>
                {option.icon}
              </div>
              <div className={styles.menuItemText}>{option.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopupMenu;