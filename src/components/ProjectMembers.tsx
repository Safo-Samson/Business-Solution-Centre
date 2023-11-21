import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import PopupMenu from "./PopUpMenu";

interface Member {
  email: string;
  skill: string;
}

interface projectMembersProps {
  addMembers: (members: string[]) => void;
}

const ProjectMembers: React.FC<projectMembersProps> = ({ addMembers }) => {
  const [showMembers, setShowMembers] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const [selectedMemberToRemove, setSelectedMemberToRemove] = useState<
    string | null
  >(null);

  const skills = [
    "media",
    "health",
    "accountancy",
    "public relation",
    "computer science",
  ];

  const dummyMembers: Member[] = [
    { email: "john.smith@lsbu.ac.uk", skill: "media" },
    { email: "emma.jones@lsbu.ac.uk", skill: "health" },
    { email: "michael.brown@lsbu.ac.uk", skill: "accountancy" },
    { email: "olivia.wilson@lsbu.ac.uk", skill: "public relation" },
    { email: "david.moore@lsbu.ac.uk", skill: "computer science" },
    { email: "sophia.taylor@lsbu.ac.uk", skill: "media" },
    { email: "james.anderson@lsbu.ac.uk", skill: "health" },
    { email: "lily.jackson@lsbu.ac.uk", skill: "accountancy" },
    { email: "william.thomas@lsbu.ac.uk", skill: "public relation" },
    { email: "mia.white@lsbu.ac.uk", skill: "computer science" },
    { email: "charles.harris@lsbu.ac.uk", skill: "media" },
    { email: "amelia.martin@lsbu.ac.uk", skill: "health" },
    { email: "benjamin.lee@lsbu.ac.uk", skill: "accountancy" },
    { email: "ava.thompson@lsbu.ac.uk", skill: "public relation" },
    { email: "henry.garcia@lsbu.ac.uk", skill: "computer science" },
  ];

  const handleShowMembers = () => {
    setShowMembers(!showMembers);
  };

  const handleSkillChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSkill(e.target.value);
  };

  const handleMemberClick = (email: string) => {
    if (!selectedMembers.find((member) => member.email === email)) {
      const memberToAdd = dummyMembers.find((member) => member.email === email);
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
      <button
        onClick={handleShowMembers}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Assign project members
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
                {dummyMembers
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

export default ProjectMembers;
