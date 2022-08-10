import type { Project, Skill } from '@prisma/client';

export type ProjectType = Project & { skills?: Skill[] };
