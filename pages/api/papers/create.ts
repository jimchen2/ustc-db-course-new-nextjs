// curl -X POST http://localhost:3000/api/papers/create \
// -H "Content-Type: application/json" \
// -d '{
//   "name": "Sample Paper",
//   "source": "Journal",
//   "year": 2024,
//   "type": 1,
//   "level": 2,
//   "authors": [
//     { "id": "T1234", "isCorrespondingAuthor": true, "ranking": 1 },
//     { "id": "T5678", "isCorrespondingAuthor": false, "ranking": 2 }
//   ]
// }'

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, source, year, type, level, authors } = req.body;

    try {
      const paper = await prisma.paper.create({
        data: {
          name,
          source,
          year,
          type,
          level,
          publishedPapers: {
            create: authors.map(
              (author: {
                id: string;
                isCorrespondingAuthor: boolean;
                ranking: number;
              }) => ({
                teacherId: author.id,
                ranking: author.ranking,
                isCorrespondingAuthor: author.isCorrespondingAuthor,
              })
            ),
          },
        },
      });

      res.status(201).json(paper);
    } catch (error) {}
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
