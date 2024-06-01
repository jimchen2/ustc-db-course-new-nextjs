// pages/api/teachers/create.ts

import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { id, name, gender, title } = req.body;

    try {
      const teacher = await prisma.teacher.create({
        data: {
          id,
          name,
          gender: parseInt(gender),
          title: parseInt(title),
        },
      });
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ error: "Failed to create teacher" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
