import NextAuth, { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';

import { Routes } from 'constants/routes';

import { prisma } from '../../../server/db/client';
import { env } from '../../../server/env.mjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: { signIn: Routes.admin.login, signOut: Routes.admin.login },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  providers: [
    GitHubProvider({
      clientId: env.GITHUB_ID,
      clientSecret: env.GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
