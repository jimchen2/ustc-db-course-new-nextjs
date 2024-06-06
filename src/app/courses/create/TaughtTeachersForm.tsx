import React from "react";

interface TaughtCourseFormProps {
  index: number;
  taughtCourse: {
    teacherId: string;
    year: number;
    term: number;
  };
  handleTaughtCourseChange: (index: number, field: string, value: any) => void;
  handleRemoveTaughtCourse: (index: number) => void;
}

const TaughtTeachersForm: React.FC<TaughtCourseFormProps> = ({
  index,
  taughtCourse,
  handleTaughtCourseChange,
  handleRemoveTaughtCourse,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleTaughtCourseChange(
      index,
      name,
      name === "year" || name === "term" ? parseInt(value) : value
    );
  };

  return (
    <div className="max-w-sm mt-8 mb-4 p-4 border rounded-lg">
      <div className="mb-4">
        <label
          htmlFor={`teacherId-${index}`}
          className="block text-gray-700 font-bold mb-2"
        >
          Teacher ID:
        </label>
        <input
          type="text"
          id={`teacherId-${index}`}
          name="teacherId"
          value={taughtCourse.teacherId}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor={`year-${index}`}
          className="block text-gray-700 font-bold mb-2"
        >
          Year:
        </label>
        <input
          type="number"
          id={`year-${index}`}
          name="year"
          value={taughtCourse.year}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor={`term-${index}`}
          className="block text-gray-700 font-bold mb-2"
        >
          Term:
        </label>
        <input
          type="number"
          id={`term-${index}`}
          name="term"
          value={taughtCourse.term}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <button
        type="button"
        onClick={() => handleRemoveTaughtCourse(index)}
        className="bg-red-500 text-white font-bold py-2 px-4 rounded"
      >
        Remove Teacher
      </button>
    </div>
  );
};

export default TaughtTeachersForm;
