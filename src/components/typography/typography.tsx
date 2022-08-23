import type { HTMLAttributes, ReactNode } from 'react';

import clsx from 'clsx';

import styles from './typography.module.css';

export type TypographyTag =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'a'
  | 'span';

export type TypographyVariant =
  | 'super-title'
  | 'large-title'
  | 'title'
  | 'subtitle'
  | 'base';

export type TypographyGradient = 'pink-to-blue' | 'blue-to-green' | 'none';

type TypographyProps = {
  as?: TypographyTag;
  children: ReactNode;
  className?: string;
  variant?: TypographyVariant;
  gradient?: TypographyGradient;
} & HTMLAttributes<HTMLElement>;

export const Typography = ({
  as: Tag = 'p',
  children,
  className = '',
  variant = 'base',
  gradient = 'none',
  ...props
}: TypographyProps) => (
  <Tag
    className={clsx(
      styles.text,
      styles[variant],
      styles[`gradient-${gradient}`],
      className,
    )}
    {...props}
  >
    {children}
  </Tag>
);
