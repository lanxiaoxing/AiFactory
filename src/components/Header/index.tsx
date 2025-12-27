import React, { useState } from 'react';
import styles from './Header.module.css';
import ProjectsTablePopup from '../ProjectsTablePopup';

interface MenuItem {
  title: string;
  link?: string;
}

const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showProjectsTable, setShowProjectsTable] = useState(false);

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
      title: 'WPC Handbook',
      link: 'https://app.powerbi.com/links/mRHVOijy6h?ctid=5c7d0b28-bdf8-410c-aa93-4df372b16203&pbi_source=linkShare&bookmarkGuid=ed840743-de3a-4ef4-8bbc-d87a51bcaea7'
    },
    {
      title: 'Global Support'
    }
  ];

  const handleMouseEnter = (title: string) => {
    setActiveMenu(title);
  };

  const handleMouseLeave = () => {
    setActiveMenu(null);
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.link) {
      window.open(item.link, '_blank');
      return;
    }
    if (item.title === 'Projects') {
      setShowProjectsTable(true);
    }
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
                <span
                  className={styles.menuTitle}
                  onClick={() => handleMenuClick(item)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.title}
                </span>
                {activeMenu === item.title && (
                  <div className={styles.dropdown}>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {showProjectsTable && (
        <ProjectsTablePopup onClose={() => setShowProjectsTable(false)} />
      )}
    </header>
  );
};

export default Header;