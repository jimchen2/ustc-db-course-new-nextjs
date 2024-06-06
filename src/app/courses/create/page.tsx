"use client";

import { useState } from "react";
import TaughtCourseForm from "./TaughtCourseForm";
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
  >([{ teacherId: "", year: new Date().getFullYear(), term: 1 }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <div>
      <h1>Create a New Course</h1>
      <div>
        <label>
          Course ID:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </label>
      </div>
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
              handleRemoveTaughtCourse(index, taughtCourses, setTaughtCourses)
            }
          />
        ))}
        <button
          onClick={() => handleAddTaughtCourse(taughtCourses, setTaughtCourses)}
        >
          Add Taught Course
        </button>
      </div>
      <button
        onClick={() =>
          handleSubmitCourse(
            id,
            name,
            totalHours,
            level,
            taughtCourses,
            setLoading,
            setError,
            setId,
            setName,
            setTotalHours,
            setLevel,
            setTaughtCourses
          )
        }
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Course"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreateCoursePage;
