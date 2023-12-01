"use client";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "lucide-react";

export default function ChatMessage() {
  const { setSocket, socket, setMessages, currentRoom } = useStore();
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const nickname = localStorage.getItem("nickname");

  if (!nickname) {
    window.location.href = "/auth";
  }

  useEffect(() => {
    const socketInit = io("ws://localhost:3001");
    setSocket(socketInit);

    return () => {
      socketInit.disconnect();
    };
  }, [setSocket]);

  useEffect(() => {
    if (socket) {
      socket.on("message", (message) => {
        setMessages((prevMessages: any) => [...prevMessages, message]);
      });
      socket.on("getAllMessagesRoom", (messages) => {
        setChatMessages(messages);
      });
    }
  }, [socket]);

  useEffect(() => {
    setCurrentMessage("");
  }, [chatMessages]);

  const handlerEnterAtRoom = () => {
    if (socket) {
      socket.emit("getAllMessagesRoom", currentRoom);
    }
  };

  const handlerSendMessage = () => {
    if (socket) {
      socket.emit("message", {
        room: currentRoom,
        data: currentMessage,
        nickname: nickname,
        clientId: socket.id,
      });
      handlerEnterAtRoom();
      setCurrentMessage("");
    }
  };

  return (
    <div className="bg-gray-100 p-4 md:p-8 text-gray-800 min-h-screen flex flex-col">
      <h1 className="font-bold text-2xl mb-12 text-center">
        Chat :{" "}
        <span className="font-semibold text-green-700">
          {currentRoom
            ? currentRoom
            : "Nenhuma sala selecionada clique ao lado"}
        </span>
      </h1>
      <div className="max-w-2xl w-full h-full items-center justify-center m-auto">
        <div className="messages-container overflow-y-auto flex-grow mb-6 bg-gray-200 rounded p-4">
          {chatMessages.map((msg: any, index: any) => (
            <p key={index} className="mb-2">
              <span className="font-bold text-blue-700">{msg.nickname}</span> :{" "}
              {msg.message}
            </p>
          ))}
        </div>

        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center">
          <input
            type="text"
            name="message"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="Digite sua mensagem..."
            className="flex-1 p-3 border border-gray-300 rounded mx-6 focus:outline-none focus:ring focus:border-blue-400"
          />

          <button
            onClick={handlerSendMessage}
            className="bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded font-medium"
          >
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
}
