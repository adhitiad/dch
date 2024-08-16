"use client";

import { client } from "@/lib/ably";
import {
  AblyProvider,
  ChannelProvider,
  useChannel,
  useConnectionStateListener,
} from "ably/react";
import React, { useState } from "react";

const ChatPage: React.FC = () => {
  return (
    <>
      <AblyProvider client={client}>
        <ChannelProvider channelName="get-started">
          <AblyPubSub />
        </ChannelProvider>
      </AblyProvider>
    </>
  );
};

const AblyPubSub: React.FC = () => {
  const [messages, setMessages] = useState([]);

  useConnectionStateListener("connected", () => {
    console.log("Connected to Ably!");
  });

  // Create a channel called 'get-started' and subscribe to all messages with the name 'first' using the useChannel hook
  const { channel } = useChannel("get-started", "first", (message: any) => {
    setMessages(
      (previousMessages: any[]) => [...previousMessages, message] as never[]
    );
  });
  return (
    <div>
      <button
        onClick={() => {
          channel.publish("first", "Here is my first message!");
        }}
      >
        Publish
      </button>
      {messages.map((message: any) => {
        return <p key={message.id}>{message.data}</p>;
      })}
    </div>
  );
};

export default ChatPage;
