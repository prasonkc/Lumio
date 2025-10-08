import React from "react";
import ChatBubble from "./ChatBubble";
import { Send } from "lucide-react";

const ChatSection = () => {
  return (
    <div className="bg-gray-700 w-2/3 min-h-screen p-3 relative">
      <ChatBubble
        isSender={false}
        text="Hello World"
        avatarUrl="https://media.istockphoto.com/id/814423752/photo/eye-of-model-with-colorful-art-make-up-close-up.jpg?s=612x612&w=0&k=20&c=l15OdMWjgCKycMMShP8UK94ELVlEGvt7GmB_esHWPYE="
      />
      
      <ChatBubble
        isSender={true}
        text="Hello World"
        avatarUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLbiTUHsTC_wxMaax5F7F4-QjbiH3PKDpvHg&s"
      />

{/* Typing Section */}
<div className="absolute bottom-0 w-full flex items-center justify-center p-5 bg-transparent">
  <div className="flex items-center w-[70%] bg-gray-600 rounded-full pr-6 pl-8 py-5">
    <input
      type="text"
      placeholder="Message..."
      className="flex-1 bg-transparent outline-none text-white placeholder-gray-300"
    />
    <button className="ml-2 text-blue-400 hover:text-blue-500 cursor-pointer">
      <Send className="w-6 h-6" />
    </button>
  </div>
</div>

    </div>
  );
};

export default ChatSection;
