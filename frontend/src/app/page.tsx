"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatMessage from "./components/chatMessage/chatMessage";
import { useStore } from "@/store";

export default function Home() {
  const [currentMessage, setCurrentMessage] = useState("");
  const { setSocket, getSocket } = useStore();

  useEffect(() => {
    const socket = io("ws://localhost:3001");
    socket.on("message", () => {
      setCurrentMessage(currentMessage);
    });
    setSocket(socket);
  }, []);

  const handlerSendMessage = () => {
    console.log("click");
    getSocket().emit("message", {
      data: currentMessage,
      clientId: getSocket().id,
    });
  };

  return (
    <ChatMessage
      handlerSendMessage={handlerSendMessage}
      setMessage={setCurrentMessage}
      currentMessage={currentMessage}
    />
  );
}
