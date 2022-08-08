import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createRouter } from './context';

export const projectRouter = createRouter()
  .mutation('createOrUpdateProject', {
    input: z.object({
      id: z.string().cuid().optional(),
      title: z.string(),
      description: z.string(),
      shortDescription: z.string().optional().nullable(),
      url: z.string().url().optional().nullable(),
      image: z.string().url().optional().nullable(),
      githubUrl: z.string().url(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx?.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      if (!input.id)
        return ctx.prisma.project.create({
          data: input,
        });

      return ctx.prisma.project.update({
        where: { id: input.id },
        data: input,
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx?.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.project.delete({
        where: { id: input.id },
      });
    },
  })
  .query('getSingle', {
    input: z.object({
      id: z.string().cuid().optional(),
    }),
    resolve({ ctx, input }) {
      return ctx.prisma.project.findFirst({
        where: { id: input.id },
        include: {
          skills: true,
        },
      });
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
