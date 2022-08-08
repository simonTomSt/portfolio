import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createRouter } from './context';

export const contentInputSchema = z.object({
  id: z.string().cuid().optional(),
  welcome: z.string(),
  aboutMe: z.string(),
  contact: z.string(),
});

export const contentRouter = createRouter()
  .mutation('createOrUpdate', {
    input: contentInputSchema,
    async resolve({ ctx, input }) {
      if (!ctx?.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      if (!input.id)
        return ctx.prisma.content.create({
          data: input,
        });

      return ctx.prisma.content.update({
        where: { id: input.id },
        data: input,
      });
    },
  })
  .query('getContent', {
    resolve({ ctx }) {
      return ctx.prisma.content.findFirst();
    },
  });
