"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TaughtCourseForm from "./TaughtCourseForm";
import {
  handleAddTaughtCourse,
  handleTaughtCourseChange,
  handleRemoveTaughtCourse,
} from "./formHandlers";

interface Teacher {
  id: string;
  name: string;
  gender: number;
  title: number;
}

interface TaughtCourse {
  courseId: string;
  teacherId: string;
  year: number;
  term: number;
  teachingHours: number;
  teacher: Teacher;
}

interface Course {
  id: string;
  name: string;
  totalHours: number;
  level: number;
  taughtCourses: TaughtCourse[];
}
interface PageProps {
  params: {
    id: string;
  };
}

const EditCoursePage = ({ params }: PageProps) => {
  const router = useRouter();
  const { id } = params;

  const [course, setCourse] = useState<Course | null>(null);
  const [name, setName] = useState<string>("");
  const [totalHours, setTotalHours] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [taughtCourses, setTaughtCourses] = useState<
    { teacherId: string; year: number; term: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      loadCourse(id as string);
    }
  }, [id]);

  const loadCourse = async (courseId: string) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/courses/list?id=${courseId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch course");
      }
      const courses: Course[] = await response.json();
      if (courses.length > 0) {
        const course = courses[0];
        setCourse(course);
        setName(course.name);
        setTotalHours(course.totalHours);
        setLevel(course.level);
        setTaughtCourses(
          course.taughtCourses.map((tc) => ({
            teacherId: tc.teacherId,
            year: tc.year,
            term: tc.term,
          }))
        );
      } else {
        setError("Course not found");
      }
    } catch (error) {
      setError("Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitCourse = async () => {
    if (!course) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/courses/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: course.id,
          name,
          totalHours: totalHours || 0,
          level: level || 0,
          taughtCourses,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update course");
      }

      const data = await response.json();
      console.log("Course updated:", data);
      router.push("/courses");
    } catch (error) {
      setError("Failed to update course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Course</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : course ? (
        <div>
          <div>
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>
          <div>
            <label>
              Total Hours:
              <input
                type="number"
                value={totalHours || ""}
                onChange={(e) => setTotalHours(parseInt(e.target.value))}
              />
            </label>
          </div>
          <div>
            <label>
              Level:
              <input
                type="number"
                value={level || ""}
                onChange={(e) => setLevel(parseInt(e.target.value))}
              />
            </label>
          </div>
          <div>
            <h3>Taught Courses</h3>
            {taughtCourses.map((taughtCourse, index) => (
              <TaughtCourseForm
                key={index}
                index={index}
                taughtCourse={taughtCourse}
                handleTaughtCourseChange={(index, field, value) =>
                  handleTaughtCourseChange(
                    index,
                    field,
                    value,
                    taughtCourses,
                    setTaughtCourses
                  )
                }
                handleRemoveTaughtCourse={(index) =>
                  handleRemoveTaughtCourse(
                    index,
                    taughtCourses,
                    setTaughtCourses
                  )
                }
              />
            ))}
            <button
              onClick={() =>
                handleAddTaughtCourse(taughtCourses, setTaughtCourses)
              }
            >
              Add Taught Course
            </button>
          </div>
          <button onClick={handleSubmitCourse} disabled={loading}>
            {loading ? "Updating..." : "Update Course"}
          </button>
          {error && <p>{error}</p>}
        </div>
      ) : (
        <p>No course selected</p>
      )}
    </div>
  );
};

export default EditCoursePage;
