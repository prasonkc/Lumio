import React from "react";
import ChatBubble from "./ChatBubble";

const ChatSection = () => {
  return (
    <div className="bg-gray-700 w-2/3 min-h-screen p-3">
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
    </div>
  );
};

export default ChatSection;
