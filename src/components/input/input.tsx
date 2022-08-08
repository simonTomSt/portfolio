import { forwardRef, InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './input.module.css';

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', ...props }, ref) => (
    <input ref={ref} className={clsx(styles.input, className)} {...props} />
  ),
);
