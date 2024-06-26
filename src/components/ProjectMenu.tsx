import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AvatarGroup from "@mui/material/AvatarGroup";
import DeleteIcon from "@mui/icons-material/Delete";
import PopUpMenu from "./PopUpMenu";
import useMediaQuery from "@mui/material/useMediaQuery";
interface Project {
  name: string;
  budget: number;
  startDate: string;
  endDate: string;
  totalHours: number;
  projectMembers: string[];
  chatRoomId: string;
  status: string;
}

// no avatars
const renderAvatars = (members: string[]) => {
  const totalMembers = members.length;
  const displayedMembers = members.slice(0, 3); // Display avatars for the first three members

  return (
    <>
      {displayedMembers.map((member, index) => (
        <div key={index} className="relative inline-block">
          <img
            src={`https://ui-avatars.com/api/?name=${member}&rounded=true`}
            alt={`Avatar-${index}`}
            className="w-8 h-8 rounded-full ring-2 ring-green-500 cursor-pointer"
            title={member} // Display the member name as a tooltip
          />
          <span className="hidden absolute top-0 left-0 bg-white px-2 py-1 text-xs rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100">
            {member}
          </span>
        </div>
      ))}
      {totalMembers > 3 && (
        <p className="text-base ml-2 font-mono font-semibold">
          + {totalMembers - 3} more
        </p>
      )}
    </>
  );
};

const ProjectMenu: React.FC<{ projectList: Project[] }> = ({
  projectList: initialProjectList,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [projectList, setProjectList] = useState(
    initialProjectList ||
      JSON.parse(localStorage.getItem("projectList") || "[]")
  );

  // to help delete related chat rooms after deleting a project
  const [chatRooms, updateChatRooms] = useState(
    localStorage.getItem("chatRooms") || "[]"
  );

  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isMembersModalOpen, setIsMembersModalOpen] = useState(false);

  const handleCreateNewProject = () => {
    navigate("/project-creation");
  };

  const handleViewProject = (index: number) => {
    navigate(`/project/${index}`);
  };

  // Function to toggle selected projects for deletion
  const toggleProjectSelection = (index: number) => {
    if (selectedProjects.includes(index)) {
      setSelectedProjects(
        selectedProjects.filter((selected) => selected !== index)
      );
    } else {
      setSelectedProjects([...selectedProjects, index]);
    }
  };

  const handleCancel = () => {
    setShowPopUp(false); // Hide the pop-up when cancelled
  };

  const handleConfirm = () => {
    setShowPopUp(false); // Hide the pop-up when confirmed

    // Filter out the deleted projects
    const updatedProjectList = projectList.filter(
      (_, index) => !selectedProjects.includes(index)
    );

    // Retrieve the existing chat rooms from localStorage
    let updatedChatRooms = JSON.parse(
      localStorage.getItem("chatRooms") || "[]"
    );

    // Remove chat rooms corresponding to the deleted projects
    selectedProjects.forEach((index) => {
      const deletedProject = projectList[index];
      updatedChatRooms = updatedChatRooms.filter(
        (chatRoom) => chatRoom.projectId !== deletedProject.name
      );
    });

    // Update the project list and chat rooms
    setProjectList(updatedProjectList);
    updateChatRooms(updatedChatRooms);
    setSelectedProjects([]); // Clear selected projects after deletion

    // Update localStorage with the updated project list and chat rooms
    localStorage.setItem("projectList", JSON.stringify(updatedProjectList));
    localStorage.setItem("chatRooms", JSON.stringify(updatedChatRooms));
  };

  const handleDeleteProjects = () => {
    setShowPopUp(true);
  };
  const handleMembersModal = () => {
    setIsMembersModalOpen(true);
  };

  const closeMembersModal = () => {
    setIsMembersModalOpen(false);
  };

  // with avatars
  const renderAvatarPics = (members: string[]) => {
    const totalMembers = members.length;
    const displayedMembers = members.slice(0, 3);
    const [showAllMembers, setShowAllMembers] = useState(false);

    const savedAvatars = JSON.parse(localStorage.getItem("avatarUrls") || "{}");

    const handleShowAllMembers = () => {
      setShowAllMembers(!showAllMembers);
    };

    return (
      <div className="relative inline-block">
        <AvatarGroup max={6}>
          {showAllMembers
            ? members.map((member, index) => {
                let avatarSrc = savedAvatars[member] || ""; // Retrieve saved avatar URL

                // If the avatar URL doesn't exist for the member, generate a new one
                if (!avatarSrc) {
                  avatarSrc =
                    Math.random() <= 0.5
                      ? `https://source.unsplash.com/random/100x100?sig=${index}`
                      : `https://ui-avatars.com/api/?name=${member}&rounded=true`;

                  // Save the generated avatar URL for the member in localStorage
                  localStorage.setItem(
                    "avatarUrls",
                    JSON.stringify({ ...savedAvatars, [member]: avatarSrc })
                  );
                }

                return (
                  <Tooltip title={member} key={index}>
                    <Avatar
                      className="w-6 h-6 rounded-full ring-2 ring-green-500 cursor-pointer"
                      alt={member}
                      src={avatarSrc}
                    />
                  </Tooltip>
                );
              })
            : displayedMembers.map((member, index) => {
                let avatarSrc = savedAvatars[member] || ""; // Retrieve saved avatar URL

                // If the avatar URL doesn't exist for the member, generate a new one
                if (!avatarSrc) {
                  avatarSrc =
                    Math.random() <= 0.5
                      ? `https://source.unsplash.com/random/100x100?sig=${index}`
                      : `https://ui-avatars.com/api/?name=${member}&rounded=true`;

                  // Save the generated avatar URL for the member in localStorage
                  localStorage.setItem(
                    "avatarUrls",
                    JSON.stringify({ ...savedAvatars, [member]: avatarSrc })
                  );
                }

                return (
                  <Tooltip title={member} key={index}>
                    <Avatar
                      className="w-6 h-6 rounded-full ring-2 ring-green-500 cursor-pointer"
                      alt={member}
                      src={avatarSrc}
                    />
                  </Tooltip>
                );
              })}
        </AvatarGroup>
        {totalMembers > 3 && (
          <p
            className="text-base ml-2 font-mono font-semibold cursor-pointer underline"
            onClick={handleShowAllMembers}>
            {showAllMembers ? "Show Less" : `+ ${totalMembers - 3} more`}
          </p>
        )}
      </div>
    );
  };

  // Moved both useEffect hooks inside a single useEffect
  useEffect(() => {
    const storedProjects = JSON.parse(
      localStorage.getItem("projectList") || "[]"
    );

    // Retrieve the stored projects from localStorage on component mount
    setProjectList(storedProjects);

    let projectDetails = location.state?.projectDetails;

    if (projectDetails) {
      const isDuplicate = storedProjects.some(
        (project) => project.name === projectDetails.name
      );

      if (!isDuplicate) {
        const updatedProjectList = [...storedProjects, projectDetails];
        setProjectList(updatedProjectList);

        // Update localStorage with the updated project list
        localStorage.setItem("projectList", JSON.stringify(updatedProjectList));
      }
    }
  }, [location.state?.projectDetails]); // Dependencies moved to the single useEffect

  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  return (
    <div className="container mx-auto bg-slate-100 pb-4">
      <Navigation />
      <h1 className="text-3xl text-center font-bold py-4 font-serif bg-slate-200">
        Projects Menu
      </h1>

      <div className="border-b-2 p-4">
        <div className="grid grid-cols-7 gap-4">
          {!isSmallScreen && (
            <p className="text-lg font-bold font-serif">Select</p>
          )}
          {!isSmallScreen && (
            <p className="text-lg font-bold font-serif">Project Name</p>
          )}
          {!isSmallScreen && (
            <p className="text-lg font-bold font-serif">Total Hours</p>
          )}
          {!isSmallScreen && (
            <p className="text-lg font-bold font-serif">Members</p>
          )}
          {!isSmallScreen && (
            <p className="text-lg font-bold font-serif">Status</p>
          )}
          {!isSmallScreen && (
            <p className="text-lg font-bold font-serif">Actions</p>
          )}

          {isSmallScreen && (
            <p className="text-lg font-bold col-span-2 font-serif">Select</p>
          )}
          {isSmallScreen && (
            <p className="text-lg font-bold col-span-2 font-serif">
              Project Name
            </p>
          )}

          <p className="text-lg font-bold">
            <DeleteIcon
              fontSize="large"
              className={`${
                selectedProjects.length > 0
                  ? "text-red-600 cursor-pointer "
                  : "text-red-300 cursor-not-allowed"
              }`}
              onClick={
                selectedProjects.length > 0 ? handleDeleteProjects : undefined
              }
            />
          </p>
        </div>
      </div>

      {projectList.length === 0 ? (
        <p className="text-lg text-center font-bold">
          You currently have no projects
        </p>
      ) : (
        // show check box here which will be used to delete the project
        projectList.map((project, index) => (
          <div
            key={index}
            className="border-b-2 p-4 grid grid-cols-7 gap-4 items-center">
            <input
              type="checkbox"
              onChange={() => {
                // Handle selecting all projects for deletion
                toggleProjectSelection(index);
              }}
              checked={selectedProjects.includes(index)}
            />

            {!isSmallScreen && (
              <>
                <p className="text-lg col-span-1">{project.name}</p>
                <p className="text-lg col-span-1">{project.totalHours}</p>
                <p className="text-lg col-span-1">
                  {renderAvatars(project.projectMembers)}
                </p>
                <p className="text-lg col-span-1">{project.status}</p>
              </>
            )}

            {isSmallScreen && (
              <>
                <p className="text-lg col-span-4">{project.name}</p>
              </>
            )}
            <button
              onClick={() => handleViewProject(index)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded col-span-2">
              View Project
            </button>
          </div>
        ))
      )}

      <button
        onClick={() => handleCreateNewProject()}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded mt-4">
        Create New Project
      </button>

      {showPopUp && (
        <PopUpMenu
          message={`Are you sure you want to delete? This cannot be undone. `}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProjectMenu;
