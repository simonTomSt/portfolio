import * as BaseCheckbox from '@radix-ui/react-checkbox';
import type { CheckboxProps } from '@radix-ui/react-checkbox';
import clsx from 'clsx';
import { Check } from 'react-bootstrap-icons';

import styles from './checkbox.module.css';

export const Checkbox = ({ className = '', ...props }: CheckboxProps) => (
  <BaseCheckbox.Root className={clsx(styles.checkbox, className)} {...props}>
    <BaseCheckbox.Indicator>
      <Check />
    </BaseCheckbox.Indicator>
  </BaseCheckbox.Root>
);
