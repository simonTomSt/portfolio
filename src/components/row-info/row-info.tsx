import { type ReactNode } from 'react';

import clsx from 'clsx';

import styles from './row-info.module.css';

export type RowInfoProps = {
  children: ReactNode;
  onClick?: VoidFunction;
  as?: 'button' | 'div';
};

export const RowInfo = ({
  as: Tag = 'button',
  children,
  onClick,
}: RowInfoProps) => (
  <Tag type='button' className={styles.row} onClick={onClick}>
    {children}
  </Tag>
);

export type RowInfoItemProps = {
  children: ReactNode;
  className?: string;
};

export const RowInfoItem = ({ children, className = '' }: RowInfoItemProps) => (
  <div className={clsx(styles.item, className)}>{children}</div>
);
