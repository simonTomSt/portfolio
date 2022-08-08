import { forwardRef, TextareaHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './textarea.module.css';

export type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ children, className = '', ...props }, ref) => (
    <textarea ref={ref} className={clsx(styles.input, className)} {...props}>
      {children}
    </textarea>
  ),
);
