import { z } from 'zod';

import { createRouter } from './context';

export const projectRouter = createRouter()
  .mutation('createProject', {
    input: z.object({
      id: z.string().uuid().optional(),
      title: z.string(),
      description: z.string(),
      shortDescription: z.string().optional(),
      url: z.string().url().optional(),
      githubUrl: z.string().url(),
    }),
    async resolve({ ctx, input }) {
      return ctx.prisma.project.create({ data: input });
    },
  })
  .query('getAll', {
    resolve({ ctx }) {
      return ctx.prisma.project.findMany({
        include: {
          skills: true,
        },
      });
    },
  });
