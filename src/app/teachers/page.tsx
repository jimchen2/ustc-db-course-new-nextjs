"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Teacher {
  id: string;
  name: string;
  gender: number;
  title: number;
}

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [searchId, setSearchId] = useState("");

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async (id?: string) => {
    try {
      const response = await fetch(
        `/api/teachers/list${id ? `?id=${id}` : ""}`
      );
      const data = await response.json();
      setTeachers(data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchId(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchTeachers(searchId);
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/teachers/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      fetchTeachers(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        {" "}
        <Link href={`/teachers/create`}>Teachers</Link>
      </h1>
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded-md mr-2"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>
      <ul className="list-disc pl-5">
        {teachers.map((teacher) => (
          <li
            key={teacher.id}
            className="mb-2 flex items-center justify-between"
          >
            <div>
              <div className="font-bold">{teacher.name}</div>
              <div>ID: {teacher.id}</div>
              <div>Gender: {teacher.gender}</div>
              <div>Title: {teacher.title}</div>
            </div>
            <div>
              <Link
                href={`/teachers/edit/${teacher.id}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(teacher.id)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersPage;
