// curl -X PUT http://localhost:3000/api/courses/edit \
// -H "Content-Type: application/json" \
// -d '{
//   "id": "courseId",
//   "name": "Updated Sample Course",
//   "totalHours": 45,
//   "level": 3,
//   "taughtCourses": [
//     { "teacherId": "T1234", "year": 2025, "term": 1 },
//     { "teacherId": "T5678", "year": 2025, "term": 2 }
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
    const { id, name, totalHours, level, taughtCourses } = req.body;

    try {
      // Update the Course record
      const course = await prisma.course.update({
        where: { id },
        data: {
          name,
          totalHours,
          level,
        },
      });

      // Update the related TaughtCourse records
      if (taughtCourses && taughtCourses.length > 0) {
        // First, delete existing taughtCourses for the course
        await prisma.taughtCourse.deleteMany({
          where: { courseId: id },
        });

        // Then, create new taughtCourses based on the provided data
        await prisma.taughtCourse.createMany({
          data: taughtCourses.map(
            (taughtCourse: {
              teacherId: string;
              year: number;
              term: number;
            }) => ({
              courseId: id,
              teacherId: taughtCourse.teacherId,
              year: taughtCourse.year,
              term: taughtCourse.term,
              teachingHours: totalHours, // Set teachingHours to totalHours
            })
          ),
        });
      }

      res.status(200).json(course);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while updating the course." });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
