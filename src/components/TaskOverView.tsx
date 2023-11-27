import React, { useState } from "react";

interface TaskOverviewProps {
  onDescriptionChange: (description: string) => void;
}

const TaskOverview: React.FC<TaskOverviewProps> = ({ onDescriptionChange }) => {
  const [projectDescription, setProjectDescription] = useState("");

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const description = e.target.value;
    setProjectDescription(description);
    onDescriptionChange(description); // Call the parent's onDescriptionChange prop
  };

  return (
    <div className="flex items-start justify-start flex-col ml-4">
      <div className="mb-4">
        <h2 className="font-medium">Task Summary:</h2>
        <textarea
          value={projectDescription}
          onChange={handleDescriptionChange}
          rows={3}
          cols={40}
          className="border border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:border-blue-500"
          placeholder="eg. create posters..."
        />
      </div>
    </div>
  );
};

export default TaskOverview;
