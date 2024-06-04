"use client";

import { useState, useEffect } from "react";
import { Paper, fetchPapers, deletePaper } from "./PaperApi";

const PapersPage = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    loadPapers();
  }, []);

  const loadPapers = async (id: string = "") => {
    setLoading(true);
    setError("");

    try {
      const data = await fetchPapers(id);
      setPapers(data);
    } catch (error) {
      setError("Failed to fetch papers");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setLoading(true);
    setError("");

    try {
      await deletePaper(id);
      loadPapers();
    } catch (error) {
      setError("Failed to delete paper");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    loadPapers(searchId);
  };

  return (
    <div>
      <h1>List of Papers</h1>
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
          {papers.map((paper) => (
            <li key={paper.id}>
              <div>
                <strong>ID:</strong> {paper.id}
                <br />
                <strong>Name:</strong> {paper.name}
                <br />
                <strong>Year:</strong> {paper.year}
                <br />
                <strong>Source:</strong> {paper.source}
                <br />
                <strong>Type:</strong> {paper.type}
                <br />
                <strong>Level:</strong> {paper.level}
                <br />
                <em>Authors:</em>
                <ul>
                  {paper.publishedPapers.map((pub) => (
                    <li key={pub.teacherId}>
                      {pub.teacher.name} (Ranking: {pub.ranking})
                      {pub.isCorrespondingAuthor && " - Corresponding Author"}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleDelete(paper.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PapersPage;
