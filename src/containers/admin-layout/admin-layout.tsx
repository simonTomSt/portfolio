import { type ReactNode } from 'react';

import { signOut } from 'next-auth/react';

import { Button } from 'components/button';

type AdminLayoutProps = { children: ReactNode };

export const AdminLayout = ({ children }: AdminLayoutProps) => (
  <div>
    <Button onClick={() => signOut()}>Sign out</Button>
    {children}
  </div>
);
