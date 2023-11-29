"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatMessage from "./components/chatMessage/chatMessage";
import { useStore } from "@/store";

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState("");

  const socket = io("ws://localhost:3001");

  useEffect(() => {
    socket.on("message", () => {
      setCurrentMessage(currentMessage);
    });
  }, []);

  const handlerSocket = () => {};

  const handlerSendMessage = () => {
    console.log("click");
    socket.emit("message", {
      data: currentMessage,
      clientId: socket.id,
    });
  };

  const getMessages = () => {
    socket.emit("getAllMessagesRoom", "default");
    socket.on("getAllMessagesRoom", (messages) => {
      console.log("Received messages:", messages);
    });
  };
  getMessages();
  return (
    <ChatMessage
      handlerSendMessage={handlerSendMessage}
      setMessage={setCurrentMessage}
      currentMessage={currentMessage}
    />
  );
}
