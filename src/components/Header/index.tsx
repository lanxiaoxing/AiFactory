import React, { useState } from 'react';
import styles from './Header.module.css';

interface MenuItem {
  title: string;
}

const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const menuItems: MenuItem[] = [
    {
      title: 'My To-do'
    },
    {
      title: 'New Project'
    },
    {
      title: 'WPC Warehouse'
    },
    {
      title: 'WPC Plannning'
    },
    {
      title: 'Global Support'
    },
    {
      title: 'Info Management'
    }
  ];

  const handleMouseEnter = (title: string) => {
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>WPC SMART SYSTEM</h1>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menuItems.map((item) => (
              <li
                key={item.title}
                className={styles.menuItem}
                onMouseEnter={() => handleMouseEnter(item.title)}
                onMouseLeave={handleMouseLeave}
              >
                <span className={styles.menuTitle}>{item.title}</span>
                {activeMenu === item.title && (
                  <div className={styles.dropdown}>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;