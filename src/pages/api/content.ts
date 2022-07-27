import type { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '../../server/db/client';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const content = await prisma.content.findFirst();
  res.status(200).json(content);
};
