// curl -X POST http://localhost:3000/api/courses/create \
// -H "Content-Type: application/json" \
// -d '{
//   "id": "C123456",
//   "name": "Sample Course",
//   "totalHours": 40,
//   "level": 2,
//   "taughtCourses": [
//     { "teacherId": "T1234", "year": 2024, "term": 1 },
//     { "teacherId": "T5678", "year": 2024, "term": 2 }
//   ]
// }'



import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface TaughtCourse {
  teacherId: string;
  year: number;
  term: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, name, totalHours, level, taughtCourses }: { id: string, name: string, totalHours: number, level: number, taughtCourses: TaughtCourse[] } = req.body;

    try {
      // Calculate teachingHours for each taughtCourse
      const teachingHours = totalHours / taughtCourses.length;

      const course = await prisma.course.create({
        data: {
          id,
          name,
          totalHours,
          level,
          taughtCourses: {
            create: taughtCourses.map((taughtCourse) => ({
              teacherId: taughtCourse.teacherId,
              year: taughtCourse.year,
              term: taughtCourse.term,
              teachingHours: teachingHours, // Set the calculated teachingHours for each taughtCourse
            })),
          },
        },
      });

      res.status(201).json(course);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while creating the course." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
