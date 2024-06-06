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
    const {
      id,
      name,
      totalHours,
      level,
      taughtCourses,
    }: {
      id: string;
      name: string;
      totalHours: number;
      level: number;
      taughtCourses: { [key: string]: TaughtCourse };
    } = req.body;

    try {
      // Validate fields
      if (
        !id ||
        !name ||
        totalHours === undefined ||
        level === undefined ||
        !taughtCourses
      ) {
        return res.status(400).json({ error: "Invalid input data." });
      }

      // Check for duplicate course ID
      const existingCourse = await prisma.course.findUnique({
        where: { id },
      });
      if (existingCourse) {
        return res.status(400).json({ error: "Course ID already exists." });
      }

      // Convert taughtCourses object to array
      const taughtCoursesArray = Object.values(taughtCourses);

      // Check if all teachers exist
      const teacherIds = taughtCoursesArray.map((tc) => tc.teacherId);
      const existingTeachers = await prisma.teacher.findMany({
        where: { id: { in: teacherIds } },
        select: { id: true },
      });
      const existingTeacherIds = new Set(existingTeachers.map((t) => t.id));

      for (const teacherId of teacherIds) {
        if (!existingTeacherIds.has(teacherId)) {
          return res
            .status(400)
            .json({ error: `Teacher with ID ${teacherId} does not exist.` });
        }
      }

      // Calculate teachingHours for each taughtCourse
      const teachingHours = totalHours;

      const course = await prisma.course.create({
        data: {
          id,
          name,
          totalHours,
          level,
          taughtCourses: {
            create: taughtCoursesArray.map((taughtCourse) => ({
              teacherId: taughtCourse.teacherId,
              year: taughtCourse.year,
              term: taughtCourse.term,
              teachingHours: teachingHours,
            })),
          },
        },
      });

      res.status(201).json(course);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while creating the course." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
