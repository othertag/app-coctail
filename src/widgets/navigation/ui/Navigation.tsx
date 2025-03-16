import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.scss';

type NavigationProps = {
  codes: readonly string[];
};

export const Navigation: React.FC<NavigationProps> = ({ codes }) => {
  return (
    <nav className={styles.nav}>
      <ul>
        {codes.map((code) => (
          <li key={code}>
            <NavLink
              to={`${BASE_DOMAIN}/${code}`}
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              {code}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
