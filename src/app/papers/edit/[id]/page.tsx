"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "./AuthorForm";
import {
  handleAddAuthor,
  handleAuthorChange,
  handleRemoveAuthor,
} from "./formHandlers";

interface PageProps {
  params: {
    id: string;
  };
}

const EditPaperPage = ({ params }: PageProps) => {
  const router = useRouter();
  const { id } = params;

  const [name, setName] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [year, setYear] = useState<number | null>(null);
  const [type, setType] = useState<number | null>(null);
  const [level, setLevel] = useState<number | null>(null);
  const [authors, setAuthors] = useState<
    { id: string; isCorrespondingAuthor: boolean; ranking: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchPaper = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/papers/list?id=${id}`);
          const data = await response.json();
          const paper = data[0];
          setName(paper.name);
          setSource(paper.source);
          setYear(paper.year);
          setType(paper.type);
          setLevel(paper.level);
          setAuthors(
            paper.publishedPapers.map((author: any) => ({
              id: author.teacherId,
              isCorrespondingAuthor: author.isCorrespondingAuthor,
              ranking: author.ranking,
            }))
          );
        } catch (error) {
          setError("Failed to load paper data");
        }
      }
    };

    fetchPaper();
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/papers/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, source, year, type, level, authors }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Paper updated:", data);
      router.push("/papers");
    } catch (error) {
      setError("Failed to update paper");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Edit Paper</h1>
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
        <button onClick={() => handleAddAuthor(authors, setAuthors)}>
          Add Author
        </button>
      </div>
      <button onClick={handleUpdate} disabled={loading}>
        {loading ? "Updating..." : "Update Paper"}
      </button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default EditPaperPage;
