import React, { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { Send } from "lucide-react";
import io from "socket.io-client";

// initialize socket server
const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

interface ChatProps {
  roomId: string;
  name: string;
}
const ChatSection: React.FC<ChatProps> = ({ roomId, name }) => {
  const [message, setMessage] = useState("");
  // Set messages array
  const [messages, setMessages] = useState<
    { text: string; isSender: boolean; sender: string }[]
  >([]);

  useEffect(() => {
    // Connect to server
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    // Connect to a room
    socket.emit("join-room", roomId);

    socket.on(
      "new-message",
      ({ sender, message }: { sender: string; message: string }) => {
        setMessages((prev) => [
          ...prev,
          { text: message, isSender: sender === name, sender },
        ]);
      }
    );
  }, [roomId]);

  const sendMessage = () => {
    // Dont send empty messages
    if (!message.trim()) return;
    socket?.emit("send-message", { roomId, message: message, sender: name });
    // setMessages((prev) => [...prev, { text: msg, isSender: false" }]);
    setMessage("");
  };

  return (
    <div className="flex flex-col justify-between bg-gray-900 w-2/3 min-h-screen px-6 relative">
      <div className="flex items-center justify-between bg-gray-800 px-3 py-2 border-b border-gray-700 rounded-t-2xl shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
            {name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-white font-semibold text-lg">{name}</h2>
            <p className="text-xs text-green-400">online</p>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-24 mt-2">
        {messages.map((m, i) => (
          <ChatBubble
            key={i}
            text={m.text}
            isSender={m.isSender}
            name={m.sender}
          />
        ))}
      </div>

      {/* Input bar */}
      <div className="absolute bottom-0 left-0 w-full px-6 pb-6">
        <div className="flex items-center bg-gray-800 rounded-full px-6 py-3 shadow-lg">
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-400"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="ml-3 text-blue-500 hover:text-blue-400 transition"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
