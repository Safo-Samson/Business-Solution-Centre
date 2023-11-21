import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

interface ViewProjectProps {
  projectList: any[]; // Define the projectList prop here
  addTaskToList: (task: TaskDetails) => void;
}

interface TaskDetails {
  taskName: string;
  taskStartDate: Date | null;
  taskEndDate: Date | null;
  taskBudget: number;
  parentProjectId?: number;
}

const ViewProject: React.FC<ViewProjectProps> = ({
  projectList,
  addTaskToList,
}) => {
  const { id } = useParams<{ id: string }>(); // Get the project ID from the URL params
  const location = useLocation();
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });

  //display the task in of the project
  const [taskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("taskList") || "[]")
  );

  const navigate = useNavigate();

  const handleAddTask = () => {
    navigate(`/create-task/${id}`, {
      state: {
        projectDetails: selectedProject,
      },
    });
  };
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

  // Retrieve the tasks associated with the project
  const projectTasks = taskList.filter(
    (task) => task.parentProjectId === projectId
  );

  useEffect(() => {
    // Retrieve the stored task from localStorage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("projectList") || "[]");
    setTaskList(storedTasks);
  }, []);

  useEffect(() => {
    let taskDetails = location.state?.taskDetails;

    if (taskDetails) {
      setTaskList((prevList) => [...prevList, taskDetails]);
    }
  }, [location.state?.projectDetails]);

  useEffect(() => {
    if (selectedProject && selectedProject.endDate) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const end = new Date(selectedProject.endDate).getTime();
        const distance = end - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (distance % (1000 * 60 * 60)) / (1000 * 60)
          );

          setTimeRemaining({ days, hours, minutes });
        } else {
          setTimeRemaining({ days: 0, hours: 0, minutes: 0 });
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [selectedProject]);

  if (!selectedProject) {
    return <div>Project not found</div>;
  }

  const { name, startDate, endDate, budget, projectMembers } = selectedProject;
  useEffect(() => {
    console.log(projectMembers);
  }, []);

  return (
    <div className="container mx-auto bg-white p-6 border rounded shadow-md">
      <Navigation />
      <h2 className="text-2xl font-semibold mb-4">Project Name: {name}</h2>
      <div className="flex flex-wrap">
        <div className="w-full sm:w-auto sm:flex-grow mr-8 mb-4 sm:mb-0">
          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            {startDate
              ? new Date(startDate).toLocaleDateString()
              : "Not specified"}
          </p>
        </div>
        <div className="w-full sm:w-auto sm:flex-grow mr-8 mb-4 sm:mb-0">
          <p>
            <span className="font-semibold">End Date:</span>{" "}
            {endDate ? new Date(endDate).toLocaleDateString() : "Not specified"}
          </p>
        </div>
        <div className="w-full sm:w-auto sm:flex-grow mr-8 mb-4 sm:mb-0">
          <p>
            <span className="font-semibold">Budget:</span>{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "GBP",
            }).format(budget)}
          </p>
        </div>
        <div className="w-full sm:w-auto sm:flex-grow">
          <p>
            <span className="font-semibold">Days Remaining:</span>{" "}
            {`${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`}
          </p>
        </div>

        <div className="w-full sm:w-auto sm:flex-grow">
          <p>
            <span className="font-semibold">
              Members: {projectMembers.length}
            </span>{" "}
          </p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-4 mb-2">Project Tasks</h3>
      {projectTasks.length === 0 ? (
        <p className="text-lg">No tasks found</p>
      ) : (
        projectTasks.map((task, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b-2 p-4">
            <p className="text-lg">{task.taskName}</p>
            <Link
              to={`/project/${projectId}/task/${index}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              View Task
            </Link>
          </div>
        ))
      )}
      <button
        onClick={handleAddTask}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex">
        Add Task
      </button>
    </div>
  );
};

export default ViewProject;
