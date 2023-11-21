import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../CSS/App.css";
import CreateProjectPage from "../pages/CreateProjectPage";
import Navigation from "./Navigation";
import ProjectMenu from "./ProjectMenu";
import ViewProject from "./ViewProject";
import CreateProject from "./CreateProject";
import Task from "./Task";
import { useState } from "react";

const App: React.FC = () => {
  // Fetch the project list from localStorage or initialize an empty array
  const [projectList, setProjectList] = useState(
    JSON.parse(localStorage.getItem("projectList") || "[]")
  );

  // Fetch the task list from localStorage or initialize an empty array
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList") || "[]")
  );

  // Function to add a new project to the project list
  const addProjectToList = (newProject: typeof CreateProject) => {
    const updatedProjectList = [...projectList, newProject];
    setProjectList(updatedProjectList);
    // Save the updated project list to localStorage
    localStorage.setItem("projectList", JSON.stringify(updatedProjectList));
  };

  const addTaskToList = (newTask: typeof Task) => {
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    // Save the updated project list to localStorage
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
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

      {/* <Route path="/create-task" element={<Task projectList={projectList} />} />
       */}

      <Route
        path="/create-task/:id"
        element={
          <Task projectList={projectList} addTaskToList={addTaskToList} />
        }
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
