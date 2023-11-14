import React, { useState } from "react";

const ProjectName: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [showInput, setShowInput] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSaveClick = (text: string) => {
    if (text.trim() === "") {
      alert("Please enter a non-empty project name.");
      return;
    }

    const confirmed = window.confirm(
      `This Project name "${text}" cannot be undone. Are you sure you want to save?`
    );

    if (confirmed) {
      setShowInput(false);
    }
  };

  return (
    <div className="bg-gray-200 flex justify-center items-left mt-2">
      <div className="max-w-md w-full p-6 bg-white  shadow-md">
        {inputText && !showInput && (
          <>
            <h3> Project Name:</h3>
            <h2 className="text-xl font-semibold mb-8">{inputText}</h2>
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
              onClick={() => handleSaveClick(inputText)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Save
            </button>
          </>
        ) : (
          <p className="text-gray-600 text-sm"></p>
        )}
      </div>
    </div>
  );
};

export default ProjectName;
