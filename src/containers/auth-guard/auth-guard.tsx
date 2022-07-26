import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import { Routes } from 'constants/routes';
import { Loader } from 'components';

type AuthGuardProps = {
  children: JSX.Element;
};

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { push } = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => push(Routes.admin.login),
  });

  if (status === 'loading') {
    return <Loader />;
  }

  return children;
};
