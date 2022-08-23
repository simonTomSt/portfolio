import clsx from 'clsx';
import Link from 'next/link';

import { Routes } from '../../constants/routes';

import styles from './logo.module.css';

export type LogoProps = {
  className?: string;
};

export const Logo = ({ className = '' }: LogoProps) => (
  <Link className={clsx(styles.logo, className)} href={Routes.home}>
    <a>
      <p className={styles.text}>simonTomSt</p>
    </a>
  </Link>
);
