import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../CSS/App.css";
import CreateProjectPage from "../pages/CreateProjectPage";
import Navigation from "./Navigation";
import ProjectMenu from "./ProjectMenu";
import ViewProject from "./ViewProject";
import { useState } from "react";

const App: React.FC = () => {
  // Fetch the project list from localStorage or initialize an empty array
  const [projectList, setProjectList] = useState(
    JSON.parse(localStorage.getItem("projectList") || "[]")
  );

  // Function to add a new project to the project list
  const addProjectToList = (newProject) => {
    const updatedProjectList = [...projectList, newProject];
    setProjectList(updatedProjectList);
    // Save the updated project list to localStorage
    localStorage.setItem("projectList", JSON.stringify(updatedProjectList));
  };

  return (
    <Routes>
      <Route
        path="/project-creation"
        element={<CreateProjectPage addProjectToList={addProjectToList} />}
      />

      <Route
        path="/project-menu/*"
        element={<ProjectMenu projectList={projectList} />}
      />

      <Route
        path="/project/:id"
        element={<ViewProject projectList={projectList} />}
      />

      <Route
        path="/"
        element={
          <>
            <Navigation />
            <Link to="/project-creation">
              <button className="bg-red-300 p-4 hover:bg-red-400 rounded">
                Create New ProjectS
              </button>
            </Link>
            <Link to="/project-menu">
              <button className="bg-green-300 p-4 hover:bg-green-400 rounded">
                View Project Menu
              </button>
            </Link>
          </>
        }
      />
    </Routes>
  );
};

export default App;
