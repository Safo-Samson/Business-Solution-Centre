import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import the delete icon
import { FaTimes } from "react-icons/fa";

const ProjectOverview: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setProjectDescription(e.target.value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const fileList = Array.from(files);
      const combinedFiles = [
        ...selectedFiles,
        ...fileList.slice(0, 3 - selectedFiles.length),
      ]; // Combine new files with existing ones, up to a maximum of 3 files

      setSelectedFiles(combinedFiles);
    }
  };

  const handleDeleteFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  //   const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //     setSelectedSkill(e.target.value);
  //   };

  //   const addSkill = () => {
  //     if (selectedSkill && !selectedSkills.includes(selectedSkill)) {
  //       setSelectedSkills([...selectedSkills, selectedSkill]);
  //       setSelectedSkill("");
  //     }
  //   };

  //   const removeSkill = (skill: string) => {
  //     const updatedSkills = selectedSkills.filter((s) => s !== skill);
  //     setSelectedSkills(updatedSkills);
  //   };

  return (
    <div className="flex items-start justify-start flex-col ml-4">
      <div className="mb-4">
        <h2 className="font-medium">Project Overview:</h2>
        <textarea
          value={projectDescription}
          onChange={handleDescriptionChange}
          rows={8}
          cols={90}
          className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="Enter project overview..."
        />
      </div>
      <div>
        {selectedFiles.length < 3 && (
          <input
            type="file"
            accept=".pdf,.docx"
            onChange={handleFileChange}
            multiple // Allow multiple files to be selected
            className="mb-2"
          />
        )}
        {selectedFiles.length > 0 && (
          <div>
            <h2 className="font-medium">Selected files:</h2>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index} className="flex items-center">
                  <span>{file.name}</span>
                  <span
                    onClick={() => handleDeleteFile(index)}
                    className="ml-auto">
                    <FaTrash className="ml-2 cursor-pointer" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* <div className="mt-4">
          <h2 className="font-medium">Skills Required:</h2>
          <div className="flex flex-wrap">
            {selectedSkills.map((skill, index) => (
              <div key={index} className="flex items-center mr-2 mb-2">
                <span className="border border-gray-300 rounded-md py-1 px-2 mr-1">
                  {skill}
                </span>
                <span
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 cursor-pointer">
                  <FaTimes />
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center mt-2">
            <select
              value={selectedSkill}
              onChange={handleSkillChange}
              className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
              <option value="">Select Skill</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Accountancy">Accountancy</option>
              <option value="Law">Law</option>
              <option value="Media">Media</option>
              <option value="Media">Public Relations</option>
              <option value="Media">Health</option>
              <option value="Media">Media</option>
            </select>
            <button
              onClick={addSkill}
              className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Add Skill
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ProjectOverview;
