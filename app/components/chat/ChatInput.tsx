import React from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  setMessage: (msg: string) => void;
  sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ message, setMessage, sendMessage }) => {
  return (
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
  );
};

export default ChatInput;
