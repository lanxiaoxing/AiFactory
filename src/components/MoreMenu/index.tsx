import React from 'react';
import styles from './MoreMenu.module.css';

interface MoreMenuProps {
  countryName: string;
  onClose: () => void;
  onSelect: (option: string) => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ countryName, onClose }) => {
  const allMenuOptions = [
    {
      title: 'BMS',
      icon: '👥',
      color: '#FF6B35'
    },
    {
      title: 'Fupan',
      icon: '📈',
      color: '#4ECDC4'
    },
    {
      title: 'Interaction',
      icon: '🤝',
      color: '#84a515ff'
    },
    {
      title: 'KD',
      icon: '🚢',
      color: '#45B7D1'
    },
    {
      title: 'History',
      icon: '📜',
      color: '#8898f6e2'
    },
    {
      title: 'Message',
      icon: '💬',
      color: '#d145a7ff'
    }
  ];

  // Filter menu options based on country
  const menuOptions = countryName.includes('Saudi Arabia')
    ? allMenuOptions.filter(item =>
        !['Interaction', 'History', 'KD'].includes(item.title)
      )
    : allMenuOptions;

  const handleOptionClick = (_option: string) => {
    onClose();
  };

  return (
    <div className={styles.moreMenuOverlay} onClick={onClose}>
      <div className={styles.moreMenuContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.moreMenuGrid}>
          {menuOptions.map((option) => (
            <div
              key={option.title}
              className={styles.moreMenuItem}
              onClick={() => handleOptionClick(option.title)}
            >
              <div
                className={styles.moreMenuItemIcon}
                style={{
                  backgroundColor: option.color,
                } as React.CSSProperties}
              >
                <span className={styles.iconEmoji}>{option.icon}</span>
              </div>
              <div className={styles.moreMenuItemTitle}>
                {option.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MoreMenu;