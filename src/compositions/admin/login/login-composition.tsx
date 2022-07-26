import { useCallback } from 'react';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Button } from 'components/button';
import { Routes } from 'constants/routes';

export const LoginComposition = () => {
  const { data, status } = useSession();
  const { push } = useRouter();

  const login = useCallback(async () => {
    await signIn('github');
  }, []);

  if (data && status === 'authenticated') {
    push(Routes.admin.projects);

    return <div />;
  }

  return (
    <div>
      <Button onClick={login} loading={status === 'loading'}>
        Login
      </Button>
    </div>
  );
};
