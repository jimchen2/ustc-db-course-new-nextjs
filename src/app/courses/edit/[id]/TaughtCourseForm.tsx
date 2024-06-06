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
  
  const TaughtCourseForm = ({
    index,
    taughtCourse,
    handleTaughtCourseChange,
    handleRemoveTaughtCourse,
  }: TaughtCourseFormProps) => {
    return (
      <div>
        <label>
          Teacher ID:
          <input
            type="text"
            value={taughtCourse.teacherId}
            onChange={(e) =>
              handleTaughtCourseChange(index, "teacherId", e.target.value)
            }
          />
        </label>
        <label>
          Year:
          <input
            type="number"
            value={taughtCourse.year}
            onChange={(e) =>
              handleTaughtCourseChange(index, "year", parseInt(e.target.value))
            }
          />
        </label>
        <label>
          Term:
          <input
            type="number"
            value={taughtCourse.term}
            onChange={(e) =>
              handleTaughtCourseChange(index, "term", parseInt(e.target.value))
            }
          />
        </label>
        <button onClick={() => handleRemoveTaughtCourse(index)}>Remove Taught Course</button>
      </div>
    );
  };
  
  export default TaughtCourseForm;
  