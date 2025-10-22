import React, { useEffect, useState } from "react";
import { socket } from "./socket";
import MessagesArea from "./MessagesArea";
import ChatInput from "./ChatInput";
import { Menu, X } from "lucide-react";


interface ChatProps {
  roomId: string;
  name: string;
  currentChat: string;
  hamburgOpen: boolean;
  setHamburgOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ChatSection: React.FC<ChatProps> = ({ roomId, name, currentChat, hamburgOpen, setHamburgOpen }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: string; isSender: boolean; sender: string }[]
  >([]);

  // Join room
  useEffect(() => {
    console.log("Joining room:", roomId);
    socket.emit("join-room", roomId);
  }, [roomId]);

  // Load messages from localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chat_${roomId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([]);
    }
  }, [roomId]);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(`chat_${roomId}`, JSON.stringify(messages));
  }, [messages, roomId]);

  // Listen for new messages
  useEffect(() => {
    const handleNewMessage = ({
      sender,
      message,
      roomId: incomingRoomId,
    }: {
      sender: string;
      message: string;
      roomId: string;
    }) => {
      if (incomingRoomId !== roomId) return;
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isSender: sender.trim().toLowerCase() === name.trim().toLowerCase(),
          sender,
        },
      ]);
    };

    socket.on("new-message", handleNewMessage);

    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [roomId, name]);

  const sendMessage = () => {
    if (!message.trim()) return;
    socket.emit("send-message", { roomId, message, sender: name });
    setMessage("");
  };

  return (
    <div className="flex flex-col justify-between bg-gray-900 md:w-2/3 min-h-screen px-6 relative w-full">
      <div className="flex items-center justify-between bg-gray-800 px-3 py-2 border-b border-gray-700 rounded-t-2xl shadow-md">
        {/* Nav panel */}
        <div className="flex justify-between md:justify-start items-center space-x-3">
          {/* icon */}
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
            {currentChat.charAt(0).toUpperCase()}
          </div>
          {/* name */}
          <div>
            <h2 className="text-white font-semibold text-lg">
              {currentChat || "No chats selected"}
            </h2>
            <p className="text-xs text-green-400">online</p>
          </div>
        </div>
          {/* Hamburger */}
          <div onClick={(e) => {setHamburgOpen(!hamburgOpen)}}>
            {hamburgOpen ? <X size={30}/> : <Menu size={30}/>}
          </div>
      </div>

      <MessagesArea messages={messages} />
      <ChatInput
        message={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default ChatSection;
