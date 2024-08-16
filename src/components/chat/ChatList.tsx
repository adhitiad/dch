import React from "react";
import { Chat } from "./Chat";

interface ChatListProps {
  chats: {
    id: string;
    sender: string;
    message: string;
    timestamp: number;
  }[];
}

export const ChatList: React.FC<ChatListProps> = ({ chats }) => {
  return (
    <div className="flex flex-col-reverse overflow-y-auto px-4">
      {chats.map((chat) => (
        <Chat
          key={chat.id}
          sender={chat.sender}
          message={chat.message}
          timestamp={chat.timestamp}
          isSender={chat.sender === "Anda"}
        />
      ))}
    </div>
  );
};
