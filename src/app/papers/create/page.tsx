"use client";

import { useState } from "react";
import AuthorForm from "./AuthorForm";
import { handleAddAuthor, handleAuthorChange, handleSubmit, handleRemoveAuthor } from "./formHandlers";

const CreatePaperPage = () => {
  const [name, setName] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [year, setYear] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [authors, setAuthors] = useState<
    { id: string; isCorrespondingAuthor: boolean; ranking: number }[]
  >([{ id: "", isCorrespondingAuthor: false, ranking: 1 }]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  return (
    <div>
      <h1>Create a New Paper</h1>
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
          Source:
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Year:
          <input
            type="number"
            value={year || ""}
            onChange={(e) => setYear(parseInt(e.target.value))}
          />
        </label>
      </div>
      <div>
        <label>
          Type:
          <input
            type="number"
            value={type || ""}
            onChange={(e) => setType(parseInt(e.target.value))}
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
        <h3>Authors</h3>
        {authors.map((author, index) => (
          <AuthorForm
            key={index}
            index={index}
            author={author}
            handleAuthorChange={(index, field, value) =>
              handleAuthorChange(index, field, value, authors, setAuthors)
            }
            handleRemoveAuthor={(index) =>
              handleRemoveAuthor(index, authors, setAuthors)
            }
          />
        ))}
        <button onClick={() => handleAddAuthor(authors, setAuthors)}>Add Author</button>
      </div>
      <button
        onClick={() =>
          handleSubmit(
            name,
            source,
            year,
            type,
            level,
            authors,
            setLoading,
            setError,
            setName,
            setSource,
            setYear,
            setType,
            setLevel,
            setAuthors
          )
        }
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Paper"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default CreatePaperPage;
