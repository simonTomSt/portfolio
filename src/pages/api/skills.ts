import type { NextApiRequest, NextApiResponse } from 'next';
import { withSentry } from '@sentry/nextjs';

import { prisma } from '../../server/db/client';

const skill = async (req: NextApiRequest, res: NextApiResponse) => {
  const skills = await prisma.skill.findMany({ where: { primary: true } });
  return res.status(200).json(skills);
};

export default withSentry(skill);
