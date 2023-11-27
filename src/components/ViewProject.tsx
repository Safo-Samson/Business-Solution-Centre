import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import ClearIcon from "@mui/icons-material/Clear";
import Navigation from "./Navigation";
import TaskModal from "./TaskModal";

interface ViewProjectProps {
  projectList: any[]; // Define the projectList prop here
  addTaskToList?: (task: TaskDetails) => void;
  addMembers?: (members: string[]) => void;
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
  addMembers,
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

  const addTaskToList = (newTask) => {
    const updatedTaskList = [...taskList, newTask];
    setTaskList(updatedTaskList);
    // Save the updated project list to localStorage
    localStorage.setItem("taskList", JSON.stringify(updatedTaskList));
  };

  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  const handleMembersModal = () => {
    setIsMembersModalOpen(true);
  };

  const closeMembersModal = () => {
    setIsMembersModalOpen(false);
  };

  const navigate = useNavigate();

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

  const taskMembers = selectedProject?.projectMembers;

  // Retrieve the tasks associated with the project
  const projectTasks = taskList.filter(
    (task) => task.parentProjectId === projectId
  );

  useEffect(() => {
    // Retrieve the stored task from localStorage on component mount
    const storedTasks = JSON.parse(localStorage.getItem("taskList") || "[]");
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

  const { name, startDate, endDate, budget, projectMembers, totalHours } =
    selectedProject;

  // Calculate the total budget of all tasks within the project
  const totalTasksBudget = projectTasks.reduce(
    (total, task) => total + task.taskBudget,
    0
  );

  // Calculate the remaining budget within the project
  const remainingBudget = budget - totalTasksBudget;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddTaskModal = () => {
    setIsModalOpen(true);
  };

  // const handleAddTask = () => {
  //   navigate(`/create-task/${id}`, {
  //     state: {
  //       projectDetails: selectedProject,
  //     },
  //   });
  // };

  return (
    <div className="container mx-auto bg-white p-6 border rounded shadow-md">
      <Navigation />
      <h2 className="text-2xl font-semibold mb-4 font-serif">
        Project Name: {name}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="mb-4">
          <p>
            <span className="font-semibold">Start Date:</span>{" "}
            {startDate
              ? new Date(startDate).toLocaleDateString()
              : "Not specified"}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">End Date:</span>{" "}
            {endDate ? new Date(endDate).toLocaleDateString() : "Not specified"}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Days Remaining:</span>{" "}
            {`${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Hours:</span> {totalHours}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Allocated Budget:</span>{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "GBP",
            }).format(budget)}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Budget Remaining:</span>{" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "GBP",
            }).format(remainingBudget)}
          </p>
        </div>
        <div className="mb-4">
          <p>
            <span className="font-semibold">Members:</span>{" "}
            {projectMembers.length}
          </p>
          <p
            className="font-semibold font-mono text-blue-500 cursor-pointer"
            onClick={handleMembersModal}>
            (see all)
          </p>
        </div>
      </div>
      <h3 className="text-xl font-semibold mt-10 mb-2 font-serif">
        Project Tasks ({projectTasks.length})
      </h3>

      {projectTasks.length === 0 ? (
        <p className="text-lg">No tasks found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className=" py-2 px-4 font-semibold">Task Name</th>
                <th className=" py-2 px-4 font-semibold">Task Budget</th>
                <th className=" py-2 px-4 font-semibold">Total Hours</th>
                <th className=" py-2 px-4 font-semibold">Summary</th>
                <th className=" py-2 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projectTasks.map((task, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2 px-4">{task.taskName}</td>
                  <td className="py-2 px-4">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "GBP",
                    }).format(task.taskBudget)}
                  </td>
                  <td className="py-2 px-4">{task.taskHours}</td>
                  <td className="py-2 px-4">{task.description}</td>
                  <td className="py-2 px-4">
                    <ClearIcon
                      fontSize="large"
                      className="text-red-600 cursor-pointer"
                      onClick={() => {
                        const updatedTaskList = [...taskList];
                        updatedTaskList.splice(index, 1);
                        setTaskList(updatedTaskList);
                        // Save the updated project list to localStorage
                        localStorage.setItem(
                          "taskList",
                          JSON.stringify(updatedTaskList)
                        );
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <TaskModal
        addTaskToList={addTaskToList}
        taskMembers={projectMembers}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        projectDetails={selectedProject} // Pass the selected project details
        projectList={projectList}
      />
      <button
        onClick={handleAddTaskModal}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex">
        New Task
      </button>
      {/* <button
        onClick={handleAddTask}
        className="bg-blue-
        
        500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 flex">
        Add Task
      </button> */}

      {isMembersModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 border rounded shadow-md">
            <h2 className="text-lg font-semibold mb-4  font-serif">
              Members List
            </h2>
            <ul className="space-y-4 m-12">
              {projectMembers.map((member, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                      member
                    )}&size=32&background=random&color=fff`}
                    alt={`${member}'s Avatar`}
                    className="w-8 h-8 rounded-full ring-2 ring-green-500"
                  />
                  <span>{member}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={closeMembersModal} // Close modal on click
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProject;
