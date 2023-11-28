import React, { useState } from "react";
import { useParams } from "react-router-dom";

interface ProjectChatRoomProps {
  projectList: any[];
}

const ProjectChatRoom: React.FC<ProjectChatRoomProps> = ({ projectList }) => {
  const { projectId } = useParams<{ projectId: string }>();

  // Find the project based on chatId
  const selectedProject = projectList.find(
    (project) => project.name === projectId
  );

  if (!selectedProject) {
    // Handle case where the project is not found
    return (
      <div>
        <h2>Chat room not found</h2>
      </div>
    );
  }

  const { projectMembers, name: projectName } = selectedProject;
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    // Simulate sending a message, here you might use a backend service to store messages
    const sender = "Current User"; // For demo purposes, replace this with the sender's name or ID
    const message = { sender, text: newMessage };
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-violet-50">
      <div className="flex items-center justify-between p-4 border-b bg-green-200">
        <div className="flex items-center">
          <div className="bg-gray-300 w-10 h-10 rounded-full flex items-center justify-center mr-3">
            <span className="font-bold text-sm">{projectName.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-semibold font-serif">{projectName}</h2>
        </div>
        <div className="flex items-center space-x-4">
          {projectMembers.slice(0, 3).map((member, index) => (
            <div
              key={index}
              className={`w-8 h-8 bg-blue-500 rounded-full text-white flex items-center justify-center font-bold ${
                index > 0 ? "-ml-3" : ""
              }`}>
              {member.charAt(0)}
            </div>
          ))}
          {projectMembers.length > 3 && (
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              +{projectMembers.length - 3}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.sender === "Current User" ? "justify-end" : ""
              }`}>
              <div
                className={`${
                  message.sender === "Current User"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800 mr-auto"
                } px-4 py-2 rounded-lg`}>
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={handleMessageSubmit}
        className="flex items-center justify-between bg-white p-4 border-t">
        <input
          type="text"
          placeholder="Type your message..."
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button
          type="submit"
          className="ml-4 bg-blue-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-600">
          Send
        </button>
      </form>
    </div>
  );
};

export default ProjectChatRoom;
