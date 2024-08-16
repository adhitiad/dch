"use client";

import { database } from "@/lib/firebaseConfig";
import { onValue, push, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";

interface Message {
  user: string;
  text: string;
}

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const messagesRef = ref(database, `chats/${params.chatId}/messages`);
    onValue(messagesRef, (snapshot) => {
      const newMessages: Message[] = [];
      snapshot.forEach((childSnapshot) => {
        newMessages.push(childSnapshot.val());
      });
      setMessages(newMessages);
    });
  }, [params.chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = messageInputRef.current?.value;
    if (message) {
      const messagesRef = ref(database, `chats/${params.chatId}/messages`);
      push(messagesRef, {
        user: "Kamu", // Ganti dengan sistem login
        text: message,
      });
      messageInputRef.current.value = "";
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.user === "Kamu"
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 self-start"
            }`}
          >
            <p className="font-bold">{msg.user}</p>
            <p>{msg.text}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="p-4 bg-gray-100">
        <input
          ref={messageInputRef}
          type="text"
          placeholder="Ketik pesan..."
          className="flex-grow p-2 rounded-l-lg border border-gray-300 focus:outline-none"
        />
        <button
          type="submit"
          className="p-2 rounded-r-lg bg-blue-500 text-white"
        >
          Kirim
        </button>
      </form>
    </div>
  );
}
