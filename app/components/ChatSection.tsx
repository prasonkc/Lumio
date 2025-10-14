import React, { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { Send } from "lucide-react";
import io from "socket.io-client";

// initialize socket server
const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

interface ChatProps {
  roomId: string,
  name: string;
}
const ChatSection: React.FC<ChatProps> = ({ roomId, name }) => {
  const [message, setMessage] = useState("");
  // Set messages array
  const [messages, setMessages] = useState<
    { text: string; isSender: boolean }[]
  >([]);

  useEffect(() => {
    // Connect to server
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    // Connect to a room
    socket.emit("join-room", roomId);

    socket.on("new-message", (newMessage) => {
      setMessages((prev) => [...prev, { text: newMessage, isSender: true }]);
    });
  }, [roomId]);

  const sendMessage = () => {
    // Dont send empty messages
    if (!message.trim()) return;
    socket?.emit("send-message", { roomId, message: message });
    // setMessages((prev) => [...prev, { text: msg, isSender: false" }]);
    setMessage("");
  };

return (
    <div className="flex flex-col justify-between bg-gray-900 w-2/3 min-h-screen p-6 relative">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto space-y-3 mb-24">
        {messages.map((m, i) => (
          <ChatBubble
            key={i}
            text={m.text}
            isSender={m.isSender}
            name={name}
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
