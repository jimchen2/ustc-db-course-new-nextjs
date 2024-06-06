"use client";

import { useState } from "react";
import TaughtCourseForm from "./TaughtTeachersForm";
import CourseSection from "./CourseSection";
import {
  handleAddTaughtCourse,
  handleTaughtCourseChange,
  handleRemoveTaughtCourse,
  handleSubmitCourse,
} from "./formHandlers";

const CreateCoursePage = () => {
  const [id, setId] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [totalHours, setTotalHours] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [taughtCourses, setTaughtCourses] = useState<
    { teacherId: string; year: number; term: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <div>
      <CourseSection
        id={id}
        setId={setId}
        name={name}
        setName={setName}
        totalHours={totalHours}
        setTotalHours={setTotalHours}
        level={level}
        setLevel={setLevel}
        taughtCourses={taughtCourses}
        setTaughtCourses={setTaughtCourses}
        loading={loading}
        error={error}
        handleAddTaughtCourse={handleAddTaughtCourse}
        handleTaughtCourseChange={handleTaughtCourseChange}
        handleRemoveTaughtCourse={handleRemoveTaughtCourse}
        handleSubmitCourse={handleSubmitCourse}
      />
    </div>
  );
};

export default CreateCoursePage;
