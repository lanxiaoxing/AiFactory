import React from 'react';
import styles from './MoreMenu.module.css';

interface MoreMenuProps {
  countryName: string;
  onClose: () => void;
  onSelect: (option: string) => void;
}

const MoreMenu: React.FC<MoreMenuProps> = ({ countryName, onClose, onSelect }) => {
  const menuOptions = [
    {
      title: 'BMS',
      icon: '🔋',
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
      icon: '📋',
      color: '#45B7D1'
    },
    {
      title: 'Fixtures',
      icon: '🔧',
      color: '#5E72E4'
    },
    {
      title: 'Message',
      icon: '💬',
      color: '#d145a7ff'
    }
  ];

  const handleOptionClick = (option: string) => {
    onClose();
  };

  return (
    <div className={styles.moreMenuOverlay} onClick={onClose}>
      <div className={styles.moreMenuContainer} onClick={(e) => e.stopPropagation()}>
        <div className={styles.moreMenuGrid}>
          {menuOptions.map((option, index) => (
            <div
              key={option.title}
              className={styles.moreMenuItem}
              onClick={() => handleOptionClick(option.title)}
            >
              <div className={styles.moreMenuItemIcon}>
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