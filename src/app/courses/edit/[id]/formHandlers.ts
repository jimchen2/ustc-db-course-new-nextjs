export const handleAddTaughtCourse = (
    taughtCourses: { teacherId: string; year: number; term: number }[],
    setTaughtCourses: React.Dispatch<
      React.SetStateAction<
        { teacherId: string; year: number; term: number }[]
      >
    >
  ) => {
    setTaughtCourses([
      ...taughtCourses,
      { teacherId: "", year: new Date().getFullYear(), term: 1 },
    ]);
  };
  
  export const handleTaughtCourseChange = (
    index: number,
    field: string,
    value: any,
    taughtCourses: { teacherId: string; year: number; term: number }[],
    setTaughtCourses: React.Dispatch<
      React.SetStateAction<
        { teacherId: string; year: number; term: number }[]
      >
    >
  ) => {
    const newTaughtCourses = [...taughtCourses];
    (newTaughtCourses[index] as any)[field] = value;
    setTaughtCourses(newTaughtCourses);
  };
  
  export const handleRemoveTaughtCourse = (
    index: number,
    taughtCourses: { teacherId: string; year: number; term: number }[],
    setTaughtCourses: React.Dispatch<
      React.SetStateAction<
        { teacherId: string; year: number; term: number }[]
      >
    >
  ) => {
    const newTaughtCourses = taughtCourses.filter((_, i) => i !== index);
    setTaughtCourses(newTaughtCourses);
  };
  
  export const handleSubmitCourse = async (
    id: string,
    name: string,
    totalHours: number | null,
    level: number | null,
    taughtCourses: { teacherId: string; year: number; term: number }[],
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setId: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setTotalHours: React.Dispatch<React.SetStateAction<number | null>>,
    setLevel: React.Dispatch<React.SetStateAction<number | null>>,
    setTaughtCourses: React.Dispatch<
      React.SetStateAction<
        { teacherId: string; year: number; term: number }[]
      >
    >
  ) => {
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("/api/courses/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, totalHours, level, taughtCourses }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Course created:", data);
      // Clear form fields after successful creation
      setId("");
      setName("");
      setTotalHours(null);
      setLevel(null);
      setTaughtCourses([{ teacherId: "", year: new Date().getFullYear(), term: 1 }]);
    } catch (error) {
      setError("Failed to create course");
    } finally {
      setLoading(false);
    }
  };
  