import React from "react";
import TaughtCourseForm from "./TaughtTeachersForm";

interface CourseSectionProps {
  id: string;
  setId: React.Dispatch<React.SetStateAction<string>>;
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  totalHours: number | null;
  setTotalHours: React.Dispatch<React.SetStateAction<number | null>>;
  level: number | null;
  setLevel: React.Dispatch<React.SetStateAction<number | null>>;
  taughtCourses: { teacherId: string; year: number; term: number }[];
  setTaughtCourses: React.Dispatch<
    React.SetStateAction<{ teacherId: string; year: number; term: number }[]>
  >;
  loading: boolean;
  error: string;
  handleAddTaughtCourse: (
    taughtCourses: { teacherId: string; year: number; term: number }[],
    setTaughtCourses: React.Dispatch<
      React.SetStateAction<{ teacherId: string; year: number; term: number }[]>
    >
  ) => void;
  handleTaughtCourseChange: (
    index: number,
    field: string,
    value: any,
    taughtCourses: { teacherId: string; year: number; term: number }[],
    setTaughtCourses: React.Dispatch<
      React.SetStateAction<{ teacherId: string; year: number; term: number }[]>
    >
  ) => void;
  handleRemoveTaughtCourse: (
    index: number,
    taughtCourses: { teacherId: string; year: number; term: number }[],
    setTaughtCourses: React.Dispatch<
      React.SetStateAction<{ teacherId: string; year: number; term: number }[]>
    >
  ) => void;
  handleSubmitCourse: (
    id: string,
    name: string,
    totalHours: number | null,
    level: number | null,
    taughtCourses: { teacherId: string; year: number; term: number }[],
    setId: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setTotalHours: React.Dispatch<React.SetStateAction<number | null>>,
    setLevel: React.Dispatch<React.SetStateAction<number | null>>,
    setTaughtCourses: React.Dispatch<
      React.SetStateAction<{ teacherId: string; year: number; term: number }[]>
    >
  ) => Promise<void>;
}

const CourseSection: React.FC<CourseSectionProps> = ({
  id,
  setId,
  name,
  setName,
  totalHours,
  setTotalHours,
  level,
  setLevel,
  taughtCourses,
  setTaughtCourses,
  loading,
  error,
  handleAddTaughtCourse,
  handleTaughtCourseChange,
  handleRemoveTaughtCourse,
  handleSubmitCourse,
}) => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          课程编号:
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          课程名称:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          总学时:
          <input
            type="number"
            value={totalHours || ""}
            onChange={(e) => setTotalHours(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </label>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">
          课程性质 (1-本科生课程, 2-研究生课程):
          <input
            type="number"
            value={level || ""}
            onChange={(e) => setLevel(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </label>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-2">主讲教师</h3>
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
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded mt-4"
        >
          添加主讲教师
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
            setId,
            setName,
            setTotalHours,
            setLevel,
            setTaughtCourses
          )
        }
        disabled={loading}
        className={`w-full py-2 px-4 rounded ${
          loading ? "bg-gray-500" : "bg-green-500"
        } text-white font-bold`}
      >
        {loading ? "创建中..." : "创建课程"}
      </button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default CourseSection;
