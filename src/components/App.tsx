import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "../CSS/App.css";
import CreateProjectPage from "../pages/CreateProjectPage";
import Navigation from "./Navigation";
import ProjectMenu from "./ProjectMenu";
import ViewProject from "./ViewProject";
import CreateProject from "./CreateProject";
import ProjectChatRoom from "./ProjectChatRoom";
import Task from "./Task";
import TaskModal from "./TaskModal";
import { useState, useEffect } from "react";
import { MdAdd, MdFolder } from "react-icons/md";
import Calendar from "react-calendar"; // Import react-calendar
import "react-calendar/dist/Calendar.css"; // Import default calendar style
import ProjectName from "./ProjectName";
import ChatRooms from "./ChatRooms";
const App: React.FC = () => {
  // Fetch the project list from localStorage or initialize an empty array
  const [projectList, setProjectList]: any[] = useState(
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

  const addTaskToList = (newTask) => {
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    // Save the updated project list to localStorage
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  };

  const [date, setDate] = useState(new Date());
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
      {/* Dynamic routes for each chat room */}

      <Route
        path="/project/:projectId/chat-room"
        element={
          <>
            <Navigation />
            <ProjectChatRoom projectList={projectList} />
          </>
        }
      />

      <Route
        path="/chat-rooms/*"
        element={
          <>
            <Navigation />
            <ChatRooms chatRooms={projectList} />
          </>
        }
      />
      {/* <Route
        path="/create-task/:id"
        element={
          <Task projectList={projectList} addTaskToList={addTaskToList} />
        }
      /> */}
      {/* <Route
        path="/create-task/:id"
        element={
          <TaskModal projectList={projectList} addTaskToList={addTaskToList} />
        }
      /> */}

      <Route
        path="/"
        element={
          <>
            <Navigation />
            <div className="min-h-screen flex flex-col  p-4 sm:p-8">
              <h1 className="text-3xl text-center mt-4">
                Welcome to your dashboard! - {date.toDateString()}
              </h1>
              <div className="flex flex-col sm:flex-row justify-center items-center mt-4 ">
                <Link to="/project-creation" className="mb-4 sm:mb-0 sm:mr-4">
                  <button className="bg-blue-300 p-4 sm:p-6 hover:bg-blue-400 rounded mr-10">
                    <h3 className="font-medium mb-3 sm:mb-7">
                      Create New Project
                    </h3>
                    <MdAdd className="mx-10 mb-5 text-6xl sm:text-6xl text-blue-700" />
                  </button>
                </Link>
                <Link to="/project-menu" className="sm:mr-4">
                  <button className="bg-green-300 p-4 sm:p-6 hover:bg-green-400 rounded mr-10">
                    <h3 className="font-medium mb-3 sm:mb-7">
                      View All Projects
                    </h3>
                    <MdFolder className=" mx-10 mb-5 text-6xl sm:text-6xl text-green-700" />
                  </button>
                </Link>
                <div className="mt-4 sm:mt-0">
                  {/* React Calendar Component */}
                  <Calendar
                    value={date}
                    className="react-calendar"
                    minDetail="month"
                    showNavigation={true}
                    selectRange={false}
                    view="month"
                    showNeighboringMonth={false}
                    onClickDay={() => {}}
                  />
                </div>
              </div>
            </div>
          </>
        }
      />
    </Routes>
  );
};

export default App;
