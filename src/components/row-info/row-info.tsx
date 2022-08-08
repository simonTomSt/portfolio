import { type ReactNode } from 'react';

import styles from './row-info.module.css';

export type RowInfoProps = {
  children: ReactNode;
  onClick?: VoidFunction;
};

export const RowInfo = ({ children, onClick }: RowInfoProps) => (
  <button type='button' className={styles.row} onClick={onClick}>
    {children}
  </button>
);

export type RowInfoItemProps = {
  children: ReactNode;
};

export const RowInfoItem = ({ children }: RowInfoItemProps) => (
  <div>{children}</div>
);
