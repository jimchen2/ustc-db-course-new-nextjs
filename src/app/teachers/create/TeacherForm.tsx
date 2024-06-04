import React from "react";

interface TeacherFormProps {
  formData: {
    id: string;
    name: string;
    gender: string;
    title: string;
  };
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const TeacherForm: React.FC<TeacherFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit} className="max-w-sm">
      <div className="mb-4">
        <label htmlFor="id" className="block text-gray-700 font-bold mb-2">
          ID:
        </label>
        <input
          type="text"
          id="id"
          name="id"
          value={formData.id}
          onChange={handleChange}
          required
          maxLength={5}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-500">Maximum 5 characters</p>
      </div>
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={256}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="text-sm text-gray-500">Maximum 256 characters</p>
      </div>
      <div className="mb-4">
        <label htmlFor="gender" className="block text-gray-700 font-bold mb-2">
          Gender:
        </label>
        <select
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select gender</option>
          <option value="1">Male</option>
          <option value="2">Female</option>
          <option value="3">Non-binary</option>
          <option value="4">Transgender</option>
          <option value="5">Genderqueer</option>
          <option value="6">Agender</option>
          <option value="7">Bigender</option>
          <option value="8">Gender fluid</option>
          <option value="9">Pangender</option>
          <option value="10">Other</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        Create Teacher
      </button>
    </form>
  );
};

export default TeacherForm;
