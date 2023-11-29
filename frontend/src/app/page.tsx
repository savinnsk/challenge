"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ChatMessage from "./components/chatMessage/chatMessage";

export default function Home() {
  const [socket, setSocket] = useState<any>(undefined);
  const [messages, setMessage] = useState("");
  const [roomName, setRooName] = useState("");

  const handlerSendMessage = () => {
    console.log("click");
    socket.emit("message", { data: messages, clientId: socket.id });
  };

  useEffect(() => {
    const socket = io("ws://localhost:3001");
    socket.on("message", () => {
      setMessage(messages);
    });
    console.log("socket", socket);
    setSocket(socket);
  }, []);

  return (
    <ChatMessage
      handlerSendMessage={handlerSendMessage}
      setMessage={setMessage}
    />
  );
}
