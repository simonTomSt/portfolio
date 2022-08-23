import { type ReactNode } from 'react';

import clsx from 'clsx';

import styles from './container.module.css';

export type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export const Container = ({ children, className = '' }: ContainerProps) => (
  <div className={clsx(styles.container, className)}>{children}</div>
);
