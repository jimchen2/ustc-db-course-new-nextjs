// curl -X GET http://localhost:3000/api/papers/list
// curl -X GET http://localhost:3000/api/papers/list?id=1



import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { id } = req.query;

    try {
      let papers;

      if (id) {
        // Fetch specific paper by ID
        papers = await prisma.paper.findMany({
          where: { id: parseInt(id as string, 10) },
          include: {
            publishedPapers: {
              include: {
                teacher: true,
              },
            },
          },
        });
      } else {
        // Fetch all papers
        papers = await prisma.paper.findMany({
          include: {
            publishedPapers: {
              include: {
                teacher: true,
              },
            },
          },
        });
      }

      res.status(200).json(papers);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
