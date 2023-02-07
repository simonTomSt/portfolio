import NextAuth, { type NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';

import { Routes } from 'constants/routes';
import { logger } from 'utils/logger';

import { prisma } from '../../../server/db/client';
import { env } from '../../../server/env.mjs';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  pages: { signIn: Routes.admin.login, signOut: Routes.admin.login },
  callbacks: {
    async signIn({ user, profile }) {
      try {
        await prisma.user.updateMany({
          where: { id: user.id, githubLogin: null },
          data: { ...user, githubLogin: profile.login as string },
        });

        return true;
      } catch (error) {
        logger.log(error);

        return false;
      }
    },
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
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
