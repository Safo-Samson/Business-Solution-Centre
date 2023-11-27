import React, { useState } from "react";
import Navigation from "../components/Navigation";
import ProjectName from "../components/ProjectName";
import ProjectDate from "../components/ProjectDate";
import ProjectOverview from "../components/ProjectOverview";
import ProjectMembers from "../components/ProjectMembers";
import PopUpMenu from "../components/PopUpMenu";
import { Link, useNavigate } from "react-router-dom";

interface CreateProjectProps {
  addProjectToList: (project: ProjectDetails) => void; // Function to add project to the list
}
interface ProjectDetails {
  name: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  budget: number;
  totalHours: number;
  projectMembers?: string[];
  status: string;
  // Include other necessary fields here
}

const CreateProject: React.FC<CreateProjectProps> = ({ addProjectToList }) => {
  const [projectDetails, setProjectDetails] = useState<ProjectDetails>({
    name: "",
    description: "",
    startDate: null,
    endDate: null,
    budget: 0,
    totalHours: 0,
    projectMembers: [],
    status: "",
    // Initialize other necessary fields here
  });

  // Function to add members to the project
  const addMembers = (members: string[]) => {
    setProjectDetails({ ...projectDetails, projectMembers: members });
  };

  const [showPopUp, setShowPopUp] = useState(false);
  const [budgetInput, setBudgetInput] = useState("");
  const [hoursInput, setHoursInput] = useState("");

  const validateProjectDetails = (): string[] | true => {
    const emptyFields: string[] = [];

    if (!projectDetails.name.trim()) {
      emptyFields.push("Project Name");
    }
    if (!projectDetails.description.trim()) {
      emptyFields.push("Project Overview");
    }
    if (!projectDetails.startDate) {
      emptyFields.push("Start Date");
    }
    if (!projectDetails.endDate) {
      emptyFields.push("End Date");
    }
    if (!projectDetails.budget) {
      emptyFields.push("Project Budget");
    }
    if (!projectDetails.totalHours) {
      emptyFields.push("Total Hours");
    }

    return emptyFields.length === 0 ? true : emptyFields;
  };

  const handleCreateProject = () => {
    const emptyFields = validateProjectDetails();
    projectDetails.status = "Not Started";

    if (emptyFields !== true) {
      const message = `The following fields are empty: ${emptyFields.join(
        ", "
      )}.`;
      alert(message);
      return; // Exit if validation fails
    }

    setShowPopUp(true); // Show the pop-up when Create Project button is clicked
  };

  const handleBudgetChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    setBudgetInput(rawValue);
    setProjectDetails({
      ...projectDetails,
      budget: parseFloat(rawValue) || 0, // Parse string to float, default to 0 if empty or invalid
    });
  };

  const handleHoursChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    setHoursInput(rawValue);
    setProjectDetails({
      ...projectDetails,
      totalHours: parseFloat(rawValue) || 0, // Parse string to float, default to 0 if empty or invalid
    });
  };

  const navigate = useNavigate();
  const handleConfirm = () => {
    setShowPopUp(false); // Hide the pop-up when confirmed

    addProjectToList(projectDetails);
    navigate("/project-menu", { state: { projectDetails } });
  };

  const handleCancel = () => {
    setShowPopUp(false); // Hide the pop-up when canceled
    // Optionally handle cancel action here
  };

  return (
    <div className="container mx-auto bg-slate-100 pb-4">
      <Navigation />
      <div className="mt-6 flex-grow">
        <ProjectName
          onNameChange={(name: string) =>
            setProjectDetails({ ...projectDetails, name })
          }
        />
        <ProjectDate
          startDate={projectDetails.startDate}
          endDate={projectDetails.endDate}
          onStartDateChange={(startDate: Date | null) =>
            setProjectDetails({ ...projectDetails, startDate })
          }
          onEndDateChange={(endDate: Date | null) =>
            setProjectDetails({ ...projectDetails, endDate })
          }
        />
        <div className="flex items-start justify-start flex-col ml-4 mt-2 mb-4">
          Project Budget:
          <input
            type="text"
            placeholder="£"
            className="border-2 border-gray-400 py-2 px-4 mt-2 rounded-lg focus:outline-none focus:border-blue-500 "
            value={`£${budgetInput}`}
            onChange={handleBudgetChange}
          />
        </div>
        <div className="flex items-start justify-start flex-col ml-4 mt-2 mb-4">
          Project Hours:
          <input
            type="text"
            placeholder="0"
            className="border-2 border-gray-400 py-2 px-4 mt-2 rounded-lg focus:outline-none focus:border-blue-500 "
            value={`${hoursInput}`}
            onChange={handleHoursChange}
          />
        </div>

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-2/3 pr-4">
            <ProjectOverview
              onDescriptionChange={(description: string) =>
                setProjectDetails({ ...projectDetails, description })
              }
            />
          </div>
          <div className="lg:w-1/3 pl-8">
            <ProjectMembers addMembers={addMembers} />
          </div>
        </div>
        <button
          onClick={handleCreateProject}
          className="mt-4 bg-blue-500 hover:bg-blue-600 p-5 text-white font-bold rounded">
          Create Project
        </button>

        {showPopUp && (
          <PopUpMenu
            message={`Are these right, saving can't be undone!.
            Project Name: ${projectDetails.name},
            Total Hours: ${
              projectDetails.totalHours ? projectDetails.totalHours : "-"
            },\n
            Total Members: ${
              projectDetails.projectMembers
                ? projectDetails.projectMembers.length
                : "-"
            }\n
            `}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default CreateProject;
