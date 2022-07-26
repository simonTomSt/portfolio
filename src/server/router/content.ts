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
      const content = await ctx.prisma.content.findFirst();

      if (!content) return ctx.prisma.content.create({ data: input });

      return ctx.prisma.content.update({
        where: { id: content.id },
        data: input,
      });
    },
  })
  .query('getContent', {
    resolve({ ctx }) {
      return ctx.prisma.content.findFirst();
    },
  });
