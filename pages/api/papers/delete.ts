

// curl -X DELETE http://localhost:3000/api/papers/delete \
// -H "Content-Type: application/json" \
// -d '{
//   "id": 1
// }'

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body;

    try {
      // Delete related PublishedPaper records first
      await prisma.publishedPaper.deleteMany({
        where: { paperId: parseInt(id, 10) },
      });

      // Then delete the Paper record
      await prisma.paper.delete({
        where: { id: parseInt(id, 10) },
      });

      res.status(200).json({ message: 'Paper deleted successfully' });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
