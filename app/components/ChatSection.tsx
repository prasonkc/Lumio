import React, { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import { Send } from "lucide-react";
import io from "socket.io-client";

// initialize socket server
const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"],
});

const ChatSection = () => {
  const [msg, setMsg] = useState("");
  // Set messages array
  const [messages, setMessages] = useState<
    { text: string; isSender: boolean }[]
  >([]);

  useEffect(() => {
    // Connect to server
    socket.on("connect", () => {
      console.log("connected", socket.id);
    });

    socket.on("new-message", (newMsg) => {
      console.log("New message:", newMsg);
      setMessages((prev) => [...prev, { text: newMsg, isSender: true }]);
    });
  }, []);

  const sendMessage = () => {
    // Dont send empty messages
    if (!msg.trim()) return;
    socket?.emit("send-message", msg);
    // setMessages((prev) => [...prev, { text: msg, isSender: false }]);
    setMsg("");
  };

  return (
    <div className="bg-gray-700 w-2/3 min-h-screen p-3 relative">
      {/* Chats */}
      {messages.map((m, index) => (
        <ChatBubble
          key={index}
          isSender={m.isSender}
          text={m.text}
          avatarUrl={
            m.isSender
              ? "https://i.pravatar.cc/40?u=sender"
              : "https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
          }
        />
      ))}

      {/* Typing Section */}
      <div className="absolute bottom-0 w-full flex items-center justify-center p-5 bg-transparent">
        <div className="flex items-center w-[70%] bg-gray-600 rounded-full pr-6 pl-8 py-5">
          <input
            type="text"
            placeholder="Message..."
            className="flex-1 bg-transparent outline-none text-white placeholder-gray-300"
            onChange={(e) => {
              setMsg(e.target.value);
            }}
            value={msg}
          />
          <button
            className="ml-2 text-blue-400 hover:text-blue-500 cursor-pointer"
            onClick={sendMessage}
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSection;
