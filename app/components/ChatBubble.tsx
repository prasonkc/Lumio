import React from "react";

interface ChatBubbleProps {
  text: string;
  isSender?: boolean;
  avatarUrl: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  text,
  isSender = false,
  avatarUrl,
}) => {
  return (
    <div
      className={`flex w-full my-2 items-end ${
        isSender ? "justify-end" : "justify-start"
      }`}
    >
      {/* Avatar (receiver side) */}
      {!isSender && (
        <div className="w-8 h-8 mr-2">
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}

      {/* Chat bubble */}
      <div
        className={`max-w-[70%] px-4 py-2 rounded-2xl text-white text-sm sm:text-base break-words shadow-md
        ${
          isSender
            ? "bg-blue-600 rounded-br-none"
            : "bg-blue-500 rounded-bl-none"
        }`}
      >
        {text}
      </div>

      {/* Avatar (sender side) */}
      {isSender && (
        <div className="w-8 h-8 ml-2">
          <img
            src={avatarUrl}
            alt="User avatar"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
