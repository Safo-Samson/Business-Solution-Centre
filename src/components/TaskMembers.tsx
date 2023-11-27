import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import PopupMenu from "./PopUpMenu";

interface Member {
  email: string;
  skill: string;
}

interface TaskMembersProps {
  addMembers: (members: string[]) => void;
  taskMembers: Member[];
}

const TaskMembers: React.FC<TaskMembersProps> = ({
  taskMembers,
  addMembers,
}) => {
  const [showMembers, setShowMembers] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [selectedMemberToRemove, setSelectedMemberToRemove] = useState<
    string | null
  >(null);

  const skills = [
    "Systems Thinking",
    "Risk Management",
    "Process Optimization",
    "Accounting",
    "Market Research",
    "Psychological mapping",
    "Budgeting",
  ];

  taskMembers = [
    { email: "john.smith@lsbu.ac.uk", skill: "Systems Thinking" },
    { email: "emma.jones@lsbu.ac.uk", skill: "Risk Management" },
    { email: "michael.brown@lsbu.ac.uk", skill: "Process Optimization" },
    { email: "olivia.wilson@lsbu.ac.uk", skill: "Accounting" },
    { email: "david.moore@lsbu.ac.uk", skill: "Market Research" },
    { email: "sophia.taylor@lsbu.ac.uk", skill: "Psychological mapping" },
    { email: "james.anderson@lsbu.ac.uk", skill: "Budgeting" },
    { email: "lily.jackson@lsbu.ac.uk", skill: "Public Relations" },
    { email: "william.thomas@lsbu.ac.uk", skill: "Computer Science" },
    { email: "mia.white@lsbu.ac.uk", skill: "Market Research" },
    { email: "charles.harris@lsbu.ac.uk", skill: "Systems Thinking" },
    { email: "amelia.martin@lsbu.ac.uk", skill: "Risk Management" },
    { email: "benjamin.lee@lsbu.ac.uk", skill: "Process Optimization" },
    { email: "ava.thompson@lsbu.ac.uk", skill: "Accounting" },
    { email: "henry.garcia@lsbu.ac.uk", skill: "Market Research" },
  ];
  const handleShowMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(e.target.value);
  };

  const handleMemberClick = (email: string) => {
    if (!selectedMembers.find((member) => member.email === email)) {
      const memberToAdd = taskMembers.find((member) => member.email === email);
      if (memberToAdd) {
        setSelectedMembers([...selectedMembers, memberToAdd]);
        addMembers([...selectedMembers.map((member) => member.email), email]);
      }
    }
  };

  const handleRemoveMember = (email: string) => {
    setSelectedMemberToRemove(email);
  };
  const handleCancelRemove = () => {
    setSelectedMemberToRemove(null);
  };

  const handleConfirmRemove = () => {
    const updatedMembers = selectedMembers.filter(
      (member) => member.email !== selectedMemberToRemove
    );
    setSelectedMembers(updatedMembers);
    setSelectedMemberToRemove(null);

    const updatedEmails = updatedMembers.map((member) => member.email);
    addMembers(updatedEmails);
  };

  return (
    <div className="flex items-start justify-start flex-col">
      {selectedMembers.length > 0 && (
        <div className="mt-4">
          <h2 className="font-medium">Selected Members for the Project:</h2>
          <ul>
            {selectedMembers.map((member, index) => (
              <li key={index} className="flex items-center mr-2 mb-2 ">
                {member.email}
                <span
                  onClick={() => handleRemoveMember(member.email)}
                  className="text-red-500 cursor-pointer ml-2">
                  <FaTimes />
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center mr-2 mb-2 mt-10">
            <div className="font-medium pr-2"> Total members :</div>
            {selectedMembers.length}
          </div>
        </div>
      )}
      <button
        onClick={handleShowMembers}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-end justify-end  ml-4 mt-2 mb-4">
        Add Task members
      </button>
      {showMembers && (
        <div className="mt-4">
          <h2 className="font-medium">Select Skill:</h2>
          <select
            value={selectedSkill || ""}
            onChange={handleSkillChange}
            className="border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500">
            <option value="">Select a skill</option>
            {skills.map((skill, idx) => (
              <option key={idx} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {selectedSkill && (
            <div className="mt-4">
              <h2 className="font-medium">
                Project Members for {selectedSkill}:
              </h2>
              <ul className="cursor-pointer ">
                {taskMembers
                  .filter((member) => member.skill === selectedSkill)
                  .map((filteredMember, index) => (
                    <li
                      className="hover:bg-green-200 rounded-md p-2"
                      key={index}
                      onClick={() => handleMemberClick(filteredMember.email)}>
                      {filteredMember.email}
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {selectedMemberToRemove && (
        <div className="mt-4">
          <PopupMenu
            message={`Are you sure you want to remove ${selectedMemberToRemove}?`}
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
          />
        </div>
      )}
    </div>
  );
};

export default TaskMembers;
