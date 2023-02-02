import { Link } from 'react-scroll';

import { SectionIndex } from 'constants/section-index';

import styles from './scroll-aside.module.css';

const defaultSetup = {
  spy: true,
  smooth: true,
  offset: -50,
  duration: 500,
};

export const ScrollAside = () => (
  <aside className={styles.sidebar}>
    <Link
      activeClass={styles.active}
      to={SectionIndex.Welcome}
      {...defaultSetup}
    >
      <div className={styles.link} />
    </Link>

    <Link
      activeClass={styles.active}
      to={SectionIndex.AboutMe}
      {...defaultSetup}
    >
      <div className={styles.link} />
    </Link>

    <Link
      activeClass={styles.active}
      to={SectionIndex.TechStack}
      {...defaultSetup}
    >
      <div className={styles.link} />
    </Link>

    <Link
      activeClass={styles.active}
      to={SectionIndex.Projects}
      {...defaultSetup}
    >
      <div className={styles.link} />
    </Link>

    <Link
      activeClass={styles.active}
      to={SectionIndex.Contact}
      {...defaultSetup}
      offset={-200}
    >
      <div className={styles.link} />
    </Link>
  </aside>
);
