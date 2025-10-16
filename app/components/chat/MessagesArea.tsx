import React from "react";
import ChatBubble from "../ChatBubble";

interface MessagesAreaProps {
  messages: { text: string; isSender: boolean; sender: string }[];
}

const MessagesArea: React.FC<MessagesAreaProps> = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-3 mb-24 mt-2">
      {messages.map((m, i) => (
        <ChatBubble key={i} text={m.text} isSender={m.isSender} name={m.sender} />
      ))}
    </div>
  );
};

export default MessagesArea;
