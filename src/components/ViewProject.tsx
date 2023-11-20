import React from "react";
import { useParams } from "react-router-dom";
import Navigation from "./Navigation";

interface ViewProjectProps {
  projectList: any[]; // Define the projectList prop here
}

const ViewProject: React.FC<ViewProjectProps> = ({ projectList }) => {
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL params

  // Check if id exists and is a valid number
  if (id === undefined || isNaN(parseInt(id))) {
    return <div>Invalid project ID</div>;
  }

  // Parse id as an integer
  const projectId = parseInt(id);

  // Retrieve the project details based on the ID
  const selectedProject = projectList.find(
    (project, index) => index === projectId
  );

  if (!selectedProject) {
    return <div>Project not found</div>;
  }

  const { name, startDate, endDate, budget } = selectedProject;

  return (
    <div className="container mx-auto bg-white p-6 border rounded shadow-md">
      <Navigation />
      <h2 className="text-2xl font-semibold mb-4">Project Name: {name}</h2>
      <div className="flex flex-col">
        <p>
          <span className="font-semibold">Start Date:</span>{" "}
          {startDate
            ? new Date(startDate).toLocaleDateString()
            : "Not specified"}
        </p>
        <p>
          <span className="font-semibold">End Date:</span>{" "}
          {endDate ? new Date(endDate).toLocaleDateString() : "Not specified"}
        </p>
        <p>
          <span className="font-semibold">Budget:</span>{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "GBP",
          }).format(budget)}
        </p>
        {/* Add other project details here */}
      </div>
    </div>
  );
};

export default ViewProject;
