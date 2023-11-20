import React, { useState } from "react";
import { FaTrash } from "react-icons/fa"; // Import the delete icon

interface ProjectOverviewProps {
  onDescriptionChange: (description: string) => void;
}

const ProjectOverview: React.FC<ProjectOverviewProps> = ({
  onDescriptionChange,
}) => {
  const [projectDescription, setProjectDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const description = e.target.value;
    setProjectDescription(description);
    onDescriptionChange(description); // Call the parent's onDescriptionChange prop
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
      </div>
    </div>
  );
};

export default ProjectOverview;
