import React, { type ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import { Loader } from 'components/loader';

import styles from './button.module.css';

type ButtonSize = 'medium' | 'large';

type ButtonColor = 'primary' | 'secondary' | 'text' | 'white';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  size?: ButtonSize;
  color?: ButtonColor;
};

export const Button = ({
  children,
  type = 'button',
  color = 'primary',
  className = '',
  size = 'medium',
  loading = false,
  ...props
}: ButtonProps) => (
  <button
    type={type}
    className={clsx(styles.button, styles[color], styles[size], className)}
    {...props}
  >
    {loading ? <Loader /> : children}
  </button>
);
