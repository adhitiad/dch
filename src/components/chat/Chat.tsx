import React from "react";

interface ChatProps {
  sender: string;
  message: string;
  timestamp: number;
  isSender: boolean;
}

export const Chat: React.FC<ChatProps> = ({
  sender,
  message,
  timestamp,
  isSender,
}) => {
  const date = new Date(timestamp);
  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const containerClass = isSender
    ? "flex justify-end mb-2"
    : "flex justify-start mb-2";

  const chatContentClass = isSender
    ? "bg-blue-500 text-white p-3 rounded-lg rounded-br-none max-w-xs"
    : "bg-gray-200 p-3 rounded-lg rounded-bl-none max-w-xs";

  return (
    <div className={containerClass}>
      <div className={chatContentClass}>
        <p className="text-sm font-medium">{isSender ? "Anda" : sender}</p>
        <p className="text-sm">{message}</p>
        <p className="text-xs text-gray-400">{time}</p>
      </div>
    </div>
  );
};
