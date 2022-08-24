import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createRouter } from './context';

export const userRouter = createRouter()
  .mutation('updateInfo', {
    input: z.object({
      id: z.string().cuid(),
      email: z.string().email(),
      linkedinUrl: z.string().url(),
      cvUrl: z.string().url(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx?.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.user.update({
        where: { id: input.id },
        data: {
          email: input.email,
          cvUrl: input.cvUrl,
          linkedinUrl: input.linkedinUrl,
        },
      });
    },
  })
  .query('get', {
    resolve({ ctx }) {
      return ctx.prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          githubLogin: true,
          cvUrl: true,
          linkedinUrl: true,
        },
      });
    },
  });
