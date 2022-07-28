import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import { prisma } from '../../server/db/client';

const project = async (req: NextApiRequest, res: NextApiResponse) => {
  const projects = await prisma.project.findMany({
    include: {
      skills: true,
    },
  });
  return res.status(200).json(projects);
};

export default withSentry(project);
