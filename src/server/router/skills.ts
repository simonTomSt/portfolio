import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createRouter } from './context';

export const skillsRouter = createRouter()
  .mutation('create', {
    input: z.object({
      primary: z.boolean(),
      name: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx?.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.skill.create({
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

      return ctx.prisma.skill.delete({
        where: { id: input.id },
      });
    },
  })
  .mutation('updateSingle', {
    input: z.object({
      id: z.string().cuid(),
      primary: z.boolean().nullable(),
      name: z.string(),
    }),
    resolve({ ctx, input }) {
      if (!ctx?.session?.user?.id) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      return ctx.prisma.skill.update({
        where: { id: input.id },
        data: input,
      });
    },
  })
  .query('getAll', {
    resolve({ ctx }) {
      return ctx.prisma.skill.findMany();
    },
  })
  .query('getAllPrimary', {
    resolve({ ctx }) {
      return ctx.prisma.skill.findMany({ where: { primary: true } });
    },
  });
