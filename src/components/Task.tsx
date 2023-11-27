import React, { useState } from "react";
import Navigation from "../components/Navigation";
import ProjectName from "../components/ProjectName";
import ProjectDate from "../components/ProjectDate";
import TaskMembers from "../components/TaskMembers";
import { useNavigate, useLocation, useParams } from "react-router-dom";

interface TaskProps {
  addTaskToList: (task: TaskDetails) => void; // Function to add task to the list
  projectList: any[];
  selectedProject?: any;
}

interface TaskDetails {
  taskName: string;
  taskStartDate: Date | null;
  taskEndDate: Date | null;
  taskBudget: number;
  parentProjectId?: number;
}

const Task: React.FC<TaskProps> = ({ projectList, addTaskToList }) => {
  const [taskDetails, setTaskDetails] = useState<TaskDetails>({
    taskName: "",
    taskStartDate: null,
    taskEndDate: null,
    taskBudget: 0,
  });

  const navigate = useNavigate();
  const handleCreateTask = () => {
    if (!validateTaskDetails()) {
      return;
    }
    addTaskToList(taskDetails);
    navigate(`/project/${projectId}`, { state: { taskDetails } });
  };

  const { id } = useParams<{ id: string }>();
  // check if it is a valid number
  if (id === undefined || isNaN(parseInt(id))) {
    return <div>Invalid project ID</div>;
  }

  const projectId = parseInt(id);
  // set the parentProjectId to the project ID
  taskDetails.parentProjectId = projectId;

  // Retrieve the project details based on the ID
  const projectDetails = projectList.find(
    (project, index) => index === projectId
  );

  const validateTaskDetails = (): boolean => {
    if (!taskDetails.taskName.trim()) {
      alert("Task Name is required.");
      return false;
    }

    if (!taskDetails.taskStartDate || !taskDetails.taskEndDate) {
      alert("Start Date and End Date are required.");
      return false;
    }

    if (taskDetails.taskStartDate < projectDetails?.startDate) {
      alert("Task Start Date cannot be before Project Start Date.");
      return false;
    }

    if (taskDetails.taskEndDate > projectDetails?.endDate) {
      alert("Task End Date cannot be after Project End Date.");
      return false;
    }

    if (taskDetails.taskStartDate > taskDetails.taskEndDate) {
      alert("Task Start Date cannot be after Task End Date.");
      return false;
    }
    if (taskDetails.taskBudget > (projectDetails?.budget || 0)) {
      alert(
        `Task Budget (${taskDetails.taskBudget}) cannot exceed Project Budget (${projectDetails?.budget})`
      );
      return false;
    }

    return true;
  };

  const addMembers = projectDetails?.projectMembers;
  const handleTaskNameChange = (name: string) => {
    setTaskDetails({ ...taskDetails, taskName: name });
  };

  const handleTaskStartDateChange = (startDate: Date | null) => {
    setTaskDetails({ ...taskDetails, taskStartDate: startDate });
  };

  const handleTaskEndDateChange = (endDate: Date | null) => {
    setTaskDetails({ ...taskDetails, taskEndDate: endDate });
  };

  const handleTaskBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    setTaskDetails({
      ...taskDetails,
      taskBudget: parseFloat(rawValue) || 0,
    });
  };

  return (
    <div className="container mx-auto bg-slate-100 pb-4">
      <Navigation />
      <div className="mt-6 flex-grow">
        <ProjectName onNameChange={handleTaskNameChange} />
        <ProjectDate
          startDate={taskDetails.taskStartDate}
          endDate={taskDetails.taskEndDate}
          onStartDateChange={handleTaskStartDateChange}
          onEndDateChange={handleTaskEndDateChange}
        />
        <div className="flex items-start justify-start flex-col ml-4 mt-2 mb-4">
          Task Budget:
          <input
            type="text"
            placeholder="£"
            className="border-2 border-gray-400 py-2 px-4 mt-2 rounded-lg focus:outline-none focus:border-blue-500 "
            value={`£${taskDetails.taskBudget}`}
            onChange={handleTaskBudgetChange}
          />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-1/2 pr-4">
            <TaskMembers
              addMembers={addMembers}
              taskMembers={projectDetails.projectMembers}
            />
          </div>
        </div>
        <button
          onClick={handleCreateTask}
          className="mt-4 bg-blue-500 hover:bg-blue-600 p-5 text-white font-bold rounded">
          Create Task
        </button>
      </div>
    </div>
  );
};

export default Task;
