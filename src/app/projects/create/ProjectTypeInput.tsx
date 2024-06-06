import React from "react";

const ProjectTypeInput = ({ projectType, setProjectType }) => {
  const handleChange = (e) => {
    setProjectType(parseInt(e.target.value));
  };

  return (
    <div className="mb-4">
      <label htmlFor="projectType" className="block text-gray-700 font-bold mb-2">
        Project Type:
      </label>
      <input
        type="number"
        id="projectType"
        value={projectType}
        onChange={handleChange}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
};

export default ProjectTypeInput;
