import React, { type ButtonHTMLAttributes } from 'react';

import { Loader } from 'components';

import styles from './button.module.css';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const Button = ({
  children,
  type = 'button',
  loading = false,
  ...props
}: ButtonProps) => (
  <button type={type} {...props}>
    {loading ? <Loader /> : children}
  </button>
);
