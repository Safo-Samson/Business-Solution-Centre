import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Link, useNavigate, useLocation } from "react-router-dom";
interface Project {
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  members: string[];
}

const ProjectMenu: React.FC<{ projectList: Project[] }> = ({
  projectList: initialProjectList,
}) => {
  console.log(initialProjectList);
  const location = useLocation();
  const [projectList, setProjectList] = useState(
    initialProjectList ||
      JSON.parse(localStorage.getItem("projectList") || "[]")
  );

  const navigate = useNavigate();
  const handleCreateNewProject = () => {
    navigate("/project-creation");
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the formatting here as needed
  };

  useEffect(() => {
    // Retrieve the stored projects from localStorage on component mount
    const storedProjects = JSON.parse(
      localStorage.getItem("projectList") || "[]"
    );
    setProjectList(storedProjects);
  }, []);

  useEffect(() => {
    let projectDetails = location.state?.projectDetails;

    if (projectDetails) {
      // Check if projectDetails already exists in projectList based on specific criteria
      const isDuplicate = projectList.some(
        (project) =>
          project.name === projectDetails.name &&
          project.budget === projectDetails.budget
      );

      if (!isDuplicate) {
        // Add projectDetails to projectList if it's not a duplicate and not overriding existing project
        setProjectList((prevList) => [...prevList, projectDetails]);
      }
    }
  }, [location.state?.projectDetails]);

  return (
    <div className="container mx-auto bg-slate-100 pb-4">
      <Navigation />
      <h1 className="text-3xl text-center font-bold pt-4">Projects Menu</h1>

      <div className="border-b-2 p-4">
        <div className="grid grid-cols-6 gap-4">
          <p className="text-lg font-bold">Project Name</p>
          <p className="text-lg font-bold">Budget in £</p>
          <p className="text-lg font-bold">Start Date</p>
          <p className="text-lg font-bold">End Date</p>
          <p className="text-lg font-bold">Members</p>
          <p className="text-lg font-bold">Actions</p>
        </div>
      </div>

      {projectList.length === 0 ? (
        <p className="text-lg text-center font-bold">
          You currently have no projects
        </p>
      ) : (
        projectList.map((project, index) => (
          <div
            key={index}
            className="border-b-2 p-4 grid grid-cols-6 gap-4 items-center">
            <p className="text-lg col-span-1">{project.name}</p>
            <p className="text-lg col-span-1">{project.budget}</p>
            <p className="text-lg col-span-1">
              {formatDate(project.startDate)}
            </p>
            <p className="text-lg col-span-1">{formatDate(project.endDate)}</p>
            <p className="text-lg col-span-1">{project.members}</p>
            <Link
              to={`/project/${index}`} // Define a dynamic route for each project
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded col-span-1">
              Add Task
            </Link>
          </div>
        ))
      )}

      <button
        onClick={() => handleCreateNewProject()}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded mt-4">
        Create New Project
      </button>
    </div>
  );
};

export default ProjectMenu;
