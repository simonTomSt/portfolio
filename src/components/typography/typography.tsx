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
  | 'title'
  | 'subtitle'
  | 'paragraph-0'
  | 'paragraph-1'
  | 'paragraph-2'
  | 'paragraph-3'
  | 'code-0'
  | 'code-1'
  | 'anchor';

type TypographyProps = {
  as?: TypographyTag;
  children: ReactNode;
  className?: string;
  variant?: TypographyVariant;
} & HTMLAttributes<HTMLElement>;

export const Typography = ({
  as: Tag = 'p',
  children,
  className = '',
  variant = 'paragraph-0',
  ...props
}: TypographyProps) => (
  <Tag className={clsx(styles.text, styles[variant], className)} {...props}>
    {children}
  </Tag>
);
