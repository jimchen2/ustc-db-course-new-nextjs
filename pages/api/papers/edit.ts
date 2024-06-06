// curl -X PUT http://localhost:3000/api/papers/edit \
// -H "Content-Type: application/json" \
// -d '{
//   "id": 9,
//   "name": "Updated Sample Paper",
//   "source": "Updated Journal",
//   "year": 2025,
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
  if (req.method === "PUT") {
    const { id, name, source, year, type, level, authors } = req.body;

    try {
      // Update the Paper record
      const paper = await prisma.paper.update({
        where: { id: parseInt(id, 10) },
        data: {
          name,
          source,
          year,
          type,
          level,
        },
      });

      // Update the related PublishedPaper records
      if (authors && authors.length > 0) {
        // First, delete existing publishedPapers for the paper
        await prisma.publishedPaper.deleteMany({
          where: { paperId: parseInt(id, 10) },
        });

        // Then, create new publishedPapers based on the provided authors
        await prisma.publishedPaper.createMany({
          data: authors.map(
            (author: {
              id: string;
              isCorrespondingAuthor: boolean;
              ranking: number;
            }) => ({
              paperId: parseInt(id, 10),
              teacherId: author.id,
              ranking: author.ranking,
              isCorrespondingAuthor: author.isCorrespondingAuthor,
            })
          ),
        });
      }

      res.status(200).json(paper);
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
