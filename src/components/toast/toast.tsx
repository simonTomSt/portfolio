import { useMemo, type ReactNode } from 'react';

import * as BaseToast from '@radix-ui/react-toast';

type ToastVariant = 'success' | 'error' | 'info';

export type ToastProps = {
  description: ReactNode;
  title?: string;
  variant?: ToastVariant;
};

export const Toast = ({ title, description, variant = 'info' }: ToastProps) => (
  <BaseToast.Provider>
    <BaseToast.Root>
      <BaseToast.Title>{title ?? variant}</BaseToast.Title>
      <BaseToast.Description>{description}</BaseToast.Description>
      <BaseToast.Close />
    </BaseToast.Root>
    <BaseToast.Viewport />
  </BaseToast.Provider>
);
