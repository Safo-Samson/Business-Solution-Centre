import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ChatIcon from "@mui/icons-material/Chat";
import TelegramIcon from "@mui/icons-material/Telegram";
import { MdAdd } from "react-icons/md";

interface ChatRoomDetails {
  projectId: string;
  projectName: string;
  projectMembers: string[];
  chatRoomId: string;
  // Add other necessary details
}

interface ChatRoomsProps {
  chatRooms: ChatRoomDetails[];
}

const ChatRooms: React.FC<ChatRoomsProps> = () => {
  const [chatRooms, setChatRooms] = useState<ChatRoomDetails[]>([]);

  useEffect(() => {
    // Retrieve chat rooms from localStorage
    const storedChatRooms = localStorage.getItem("chatRooms");
    if (storedChatRooms) {
      const parsedChatRooms: ChatRoomDetails[] = JSON.parse(storedChatRooms);
      setChatRooms(parsedChatRooms);
    }
  }, []);

  return (
    <div className="container mx-auto mt-10 bg-stone-900 p-8 pb-40">
      <h2 className="text-3xl font-bold mb-6 font-serif text-white">
        <TelegramIcon fontSize="large" className="mr-2" />
        <span className="mx-2"> Chat Rooms</span>
        <TelegramIcon fontSize="large" className="mr-2" />
      </h2>
      {chatRooms.length === 0 && (
        <div className="text-white text-center">
          <h3 className="text-2xl font-bold mb-4">No chat rooms yet</h3>
          <p className="text-lg">Create a new project to get started</p>
          <Link to="/project-creation">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-4 rounded mt-10">
              Create New Project
              <MdAdd className="mx-10  text-6xl sm:text-6xl text-white" />
            </button>
          </Link>
        </div>
      )}
      {chatRooms.length > 0 && (
        <div className="text-white text-center">
          <h3 className="text-2xl font-bold mb-4 font-serif">
            Choose a Project Chat Room ({chatRooms.length})
          </h3>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {chatRooms.map((room, index) => (
          <Link key={index} to={`/project/${room.projectName}/chat-room`}>
            <div className="bg-green-200 rounded-lg p-6 shadow-md cursor-pointer transition duration-300 transform hover:scale-105">
              <ChatIcon fontSize="large" className="mr-2" />
              <h3 className="text-xl font-semibold mb-4 first-letter:uppercase">
                {room.projectName}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatRooms;
