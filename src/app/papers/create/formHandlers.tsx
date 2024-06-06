
export const handleAddAuthor = (
    authors: { id: string; isCorrespondingAuthor: boolean; ranking: number }[],
    setAuthors: React.Dispatch<
      React.SetStateAction<
        { id: string; isCorrespondingAuthor: boolean; ranking: number }[]
      >
    >
  ) => {
    setAuthors([
      ...authors,
      { id: "", isCorrespondingAuthor: false, ranking: authors.length + 1 },
    ]);
  };
  
  export const handleAuthorChange = (
    index: number,
    field: string,
    value: any,
    authors: { id: string; isCorrespondingAuthor: boolean; ranking: number }[],
    setAuthors: React.Dispatch<
      React.SetStateAction<
        { id: string; isCorrespondingAuthor: boolean; ranking: number }[]
      >
    >
  ) => {
    const newAuthors = [...authors];
    (newAuthors[index] as any)[field] = value;
    setAuthors(newAuthors);
  };
  
  export const handleRemoveAuthor = (
    index: number,
    authors: { id: string; isCorrespondingAuthor: boolean; ranking: number }[],
    setAuthors: React.Dispatch<
      React.SetStateAction<
        { id: string; isCorrespondingAuthor: boolean; ranking: number }[]
      >
    >
  ) => {
    const newAuthors = authors.filter((_, i) => i !== index);
    setAuthors(newAuthors.map((author, i) => ({ ...author, ranking: i + 1 })));
  };
  
  export const handleSubmit = async (
    name: string,
    source: string,
    year: number | null,
    type: number | null,
    level: number | null,
    authors: { id: string; isCorrespondingAuthor: boolean; ranking: number }[],
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>,
    setName: React.Dispatch<React.SetStateAction<string>>,
    setSource: React.Dispatch<React.SetStateAction<string>>,
    setYear: React.Dispatch<React.SetStateAction<number | null>>,
    setType: React.Dispatch<React.SetStateAction<number | null>>,
    setLevel: React.Dispatch<React.SetStateAction<number | null>>,
    setAuthors: React.Dispatch<
      React.SetStateAction<
        { id: string; isCorrespondingAuthor: boolean; ranking: number }[]
      >
    >
  ) => {
    setLoading(true);
    setError("");
  
    try {
      const response = await fetch("/api/papers/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, source, year, type, level, authors }),
      });
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
  
      const data = await response.json();
      console.log("Paper created:", data);
      // Clear form fields after successful creation
      setName("");
      setSource("");
      setYear(null);
      setType(null);
      setLevel(null);
      setAuthors([{ id: "", isCorrespondingAuthor: false, ranking: 1 }]);
    } catch (error) {
      setError("Failed to create paper");
    } finally {
      setLoading(false);
    }
  };
  