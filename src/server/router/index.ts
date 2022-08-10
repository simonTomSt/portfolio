import superjson from 'superjson';

import { createRouter } from './context';
import { authRouter } from './auth';
import { projectRouter } from './project';
import { contentRouter } from './content';
import { skillsRouter } from './skills';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('project.', projectRouter)
  .merge('content.', contentRouter)
  .merge('auth.', authRouter)
  .merge('skill.', skillsRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
