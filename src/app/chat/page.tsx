"use client";

import { ChatInput } from "@/components/chat/ChatInput";
import { ChatList } from "@/components/chat/ChatList";
import { db } from "@/lib/firebaseConfig";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const ChatPage: React.FC = () => {
  const [chats, setChats] = useState<
    { id: string; sender: string; message: string; timestamp: number }[]
  >([]);

  const handleSendChat = async (message: string) => {
    try {
      // Referensi ke koleksi "chats" di Firestore
      const chatsRef = collection(db, "chats");

      // Menambahkan pesan baru ke Firestore
      await addDoc(chatsRef, {
        sender: "Anda", // Ganti dengan ID pengguna atau informasi lain
        message: message,
        timestamp: new Date().getTime(), // Menggunakan timestamp client sebagai number
      });
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  useEffect(() => {
    // Query untuk mengambil pesan dari Firestore, diurutkan berdasarkan timestamp
    const q = query(collection(db, "chats"), orderBy("timestamp"));

    // Listener untuk perubahan real-time pada koleksi "chats"
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const updatedChats = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp.toDate(), // Mengonversi timestamp Firestore ke Date
      }));
      setChats(updatedChats as any);
    });

    // Membersihkan listener ketika komponen di-unmount
    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-gray-100 h-full flex flex-col">
      <div className="flex-grow p-4 overflow-y-auto">
        <ChatList chats={chats} />
      </div>

      <ChatInput onSend={handleSendChat} />
    </div>
  );
};

export default ChatPage;
