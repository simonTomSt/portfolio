import { type ReactNode } from 'react';

import styles from './admin-layout.module.css';
import { AdminNavigation } from './admin-navigation';

type AdminLayoutProps = { children: ReactNode };

export const AdminLayout = ({ children }: AdminLayoutProps) => (
  <div className={styles.container}>
    <AdminNavigation />
    <main className={styles.main}>{children}</main>
  </div>
);
