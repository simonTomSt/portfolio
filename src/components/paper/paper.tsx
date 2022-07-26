import { type HTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './paper.module.css';

export type PaperProps = HTMLAttributes<HTMLDivElement>;

export const Paper = ({ children, className = '', ...props }: PaperProps) => (
  <div className={clsx(styles.paper, className)} {...props}>
    {children}
  </div>
);
