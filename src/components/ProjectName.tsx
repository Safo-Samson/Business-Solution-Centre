import React, { useState } from "react";

interface ProjectNameProps {
  onNameChange: (name: string) => void;
  initialName?: string; // Optional prop for initial project name
}

const ProjectName: React.FC<ProjectNameProps> = ({
  onNameChange,
  initialName = "",
}) => {
  const [inputText, setInputText] = useState(initialName);
  const [showInput, setShowInput] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSaveClick = () => {
    if (inputText.trim() !== "") {
      setShowInput(false);
      setIsEditing(false);
      onNameChange(inputText); // Call the onNameChange prop with the updated name
    } else {
      alert("Project name cannot be empty!");
    }
  };

  const handleEditClick = () => {
    if (inputText.trim() !== "") {
      setShowInput(true);
      setIsEditing(true);
    } else {
      alert("Project name cannot be empty!");
    }
  };

  return (
    <div className="bg-gray-50 flex justify-center items-left">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        {inputText && !isEditing && (
          <>
            <h3> Project Name:</h3>
            <h2 className="text-xl font-semibold mb-4">{inputText}</h2>
          </>
        )}
        {showInput ? (
          <>
            <input
              type="text"
              className="border border-gray-300 rounded-md w-full py-2 px-3 mb-4 focus:outline-none focus:border-green-500"
              placeholder="Enter project name..."
              value={inputText}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSaveClick}
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-1 px-2 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
          </>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-1 px-2 rounded focus:outline-none focus:shadow-outline">
            Edit Name
          </button>
        )}
      </div>
    </div>
  );
};

export default ProjectName;
