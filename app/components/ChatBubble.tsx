import React from "react";

interface ChatBubbleProps {
  text: string;
  isSender?: boolean;
  name?: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ text, isSender = false, name }) => {
  return (
    <div
      className={`flex flex-col w-full my-2 ${
        isSender ? "items-end" : "items-start"
      }`}
    >
      {/* Name above bubble */}
      {name && (
        <p
          className={`text-xs mb-1 ${
            isSender ? "text-blue-400 text-right" : "text-zinc-400 text-left"
          }`}
        >
          {name}
        </p>
      )}

      {/* Message bubble */}
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm sm:text-base break-words shadow-md
          ${
            isSender
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-zinc-800 text-zinc-100 rounded-bl-none"
          }`}
      >
        {text}
      </div>
    </div>
  );
};

export default ChatBubble;
