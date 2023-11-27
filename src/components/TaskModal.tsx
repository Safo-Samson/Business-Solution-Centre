import { useNavigate, useLocation, useParams } from "react-router-dom";
import React, { useState } from "react";
import Modal from "react-modal";
import ProjectName from "./ProjectName";
import ProjectDate from "./ProjectDate";
import TaskMembers from "./TaskMembers";
import TaskOverview from "./TaskOverView";
interface AddTaskModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  addTaskToList: (task: TaskDetails) => void;
  projectList: any[];
  projectDetails: any;
  taskMembers: (members: string[]) => void;
}

interface TaskDetails {
  taskName: string;
  taskStartDate: Date | null;
  taskEndDate: Date | null;
  taskBudget: number;
  parentProjectId?: number;
  taskHours: number;
  description?: string;
}

const TaskModal: React.FC<AddTaskModalProps> = ({
  isOpen,
  onRequestClose,
  addTaskToList,
  projectList,
}) => {
  const [taskDetails, setTaskDetails] = useState<TaskDetails>({
    taskName: "",
    taskStartDate: null,
    taskEndDate: null,
    taskBudget: 0,
    taskHours: 0,
  });
  const navigate = useNavigate();
  const handleCreateTask = () => {
    if (!validateTaskDetails()) {
      return;
    }

    addTaskToList(taskDetails);
    navigate(`/project/${projectId}`, { state: { taskDetails } });

    onRequestClose(); // Close the modal after creating the task
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

  const addMembers = projectDetails?.projectMembers;

  const validateTaskDetails = (): boolean => {
    if (!taskDetails.taskName.trim()) {
      alert("Task Name is required.");
      return false;
    }

    if (!taskDetails.taskStartDate || !taskDetails.taskEndDate) {
      alert("Start Date and End Date are required.");
      return false;
    }
    if (!taskDetails.taskHours) {
      alert("Task Hours is required.");
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

  const [hoursInput, setHoursInput] = useState("");
  const handleHoursChange = (e) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, ""); // Remove non-numeric characters
    setHoursInput(rawValue);
    setTaskDetails({
      ...taskDetails,
      taskHours: parseFloat(rawValue) || 0, // Parse string to float, default to 0 if empty or invalid
    });
  };
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
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      ariaHideApp={false} // To prevent a warning about appElement not being defined
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          width: "80%", // Adjust the width as per your requirement
          maxHeight: "80%", // Adjust the max height as per your requirement
          overflowY: "auto", // Enable vertical scrolling if content exceeds the height
          borderRadius: "8px",
        },
      }}>
      <div className="container mx-auto bg-slate-100 pb-4 ">
        <h2 className="font-bold text-2xl flex justify-center items-center">
          Add New Task Details
        </h2>
        <div className="mt-6 flex-grow">
          <ProjectName onNameChange={handleTaskNameChange} />
          <ProjectDate
            startDate={taskDetails.taskStartDate}
            endDate={taskDetails.taskEndDate}
            onStartDateChange={handleTaskStartDateChange}
            onEndDateChange={handleTaskEndDateChange}
          />
          <div className="flex items-start justify-start flex-col ml-4 mt-2 mb-4">
            Task Hours:
            <input
              type="text"
              placeholder="0"
              className="border-2 border-gray-400 py-2 px-4 mt-2 rounded-lg focus:outline-none focus:border-blue-500 "
              value={`${hoursInput}`}
              onChange={handleHoursChange}
            />
          </div>
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
          <div className="lg:w-2/3 pr-4">
            <TaskOverview
              onDescriptionChange={(description: string) =>
                setTaskDetails({ ...taskDetails, description })
              }
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
            className="mt-4 bg-blue-500 hover:bg-blue-600 p-5 text-white font-bold rounded flex justify-center items-center ml-6">
            Create Task
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TaskModal;
