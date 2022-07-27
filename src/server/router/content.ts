import { z } from 'zod';

import { createRouter } from './context';

export const contentRouter = createRouter()
  .mutation('createContent', {
    input: z.object({
      id: z.string().uuid().optional(),
      welcome: z.string(),
      aboutMe: z.string(),
      contact: z.string(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.content.upsert({
        where: {},
        update: input,
        create: input,
      });
    },
  })
  .query('getContent', {
    resolve({ ctx }) {
      return ctx.prisma.content.findFirst();
    },
  });
