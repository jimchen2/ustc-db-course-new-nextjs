"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Teacher {
  id: string;
  name: string;
  gender: number;
  title: number;
}

interface PageProps {
  params: {
    id: string;
  };
}

const EditTeacherPage = ({ params }: PageProps) => {
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState<number | null>(null);
  const [title, setTitle] = useState<number | null>(null);

  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    fetchTeacher(id);
  }, [id]);

  const fetchTeacher = async (id: string) => {
    try {
      const response = await fetch(`/api/teachers/list?id=${id}`);
      console.log(response);
      const data = await response.json();
      if (data.length > 0) {
        const teacherData = data[0];
        setTeacher(teacherData);
        setName(teacherData.name);
        setGender(teacherData.gender);
        setTitle(teacherData.title);
      }
    } catch (error) {
      console.error("Error fetching teacher:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id || !name || gender === null || title === null) {
      console.log("Invalid form data");
      return;
    }

    try {
      await fetch(`/api/teachers/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, name, gender, title }),
      });
      router.push("/teachers");
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Teacher</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="gender" className="block mb-2">
            Gender:
          </label>
          <select
            id="gender"
            value={gender ?? ""}
            onChange={(e) => setGender(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select gender</option>
            <option value={0}>Male</option>
            <option value={1}>Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2">
            Title:
          </label>
          <select
            id="title"
            value={title ?? ""}
            onChange={(e) => setTitle(parseInt(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded"
          >
            <option value="">Select title</option>
            <option value={0}>Dr.</option>
            <option value={1}>Prof.</option>
          </select>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditTeacherPage;
