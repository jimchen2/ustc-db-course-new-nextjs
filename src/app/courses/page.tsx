"use client";

import { useState, useEffect } from "react";
import { Course, fetchCourses, deleteCourse } from "./CourseApi";

const CoursesPage = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async (id: string = "") => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchCourses(id);
      setCourses(data);
    } catch (error) {
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    setError("");

    try {
      await deleteCourse(id);
      loadCourses();
    } catch (error) {
      setError("Failed to delete course");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadCourses(searchId);
  };

  return (
    <div>
      <h1>List of Courses</h1>
      <div>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search by ID"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <div>
                <strong>ID:</strong> {course.id}
                <br />
                <strong>Name:</strong> {course.name}
                <br />
                <strong>Total Hours:</strong> {course.totalHours}
                <br />
                <strong>Level:</strong> {course.level}
                <br />
                <em>Taught Courses:</em>
                <ul>
                  {course.taughtCourses.map((taughtCourse) => (
                    <li key={`${taughtCourse.courseId}-${taughtCourse.teacherId}`}>
                      Teacher: {taughtCourse.teacher.name} - Year: {taughtCourse.year}, Term: {taughtCourse.term}, Teaching Hours: {taughtCourse.teachingHours}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleDelete(course.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesPage;
