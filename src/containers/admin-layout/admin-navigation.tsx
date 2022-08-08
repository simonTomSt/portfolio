import { signOut } from 'next-auth/react';
import Link from 'next/link';

import { Button } from 'components';
import { Routes } from 'constants/routes';

import styles from './admin-layout.module.css';

export const AdminNavigation = () => (
  <aside className={styles.aside}>
    <nav className={styles.nav}>
      <Link href={Routes.admin.projects}>
        <a>Projects</a>
      </Link>
      <Link href={Routes.admin.content}>
        <a>Content</a>
      </Link>
      <Link href={Routes.admin.skills}>
        <a>Skills</a>
      </Link>
      <Link href={Routes.admin.info}>
        <a>My info</a>
      </Link>
    </nav>
    <Button className={styles.logout} onClick={() => signOut()}>
      Sign out
    </Button>
  </aside>
);
