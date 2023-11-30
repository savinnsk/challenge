"use client";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function ChatMessage() {
  const { setSocket, socket, setMessages } = useStore();
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any>([]);

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
      socket.emit("getAllMessagesRoom", "default");
    }
  };

  const handlerSendMessage = () => {
    if (socket) {
      socket.emit("message", {
        data: currentMessage,
        clientId: socket.id,
      });
      handlerEnterAtRoom();
      setCurrentMessage("");
    }
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-4 md:p-8 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col ">
      <h1 className="font-bold  text-2xl mb-12 text-center">Chat: Geral</h1>
      <div className="max-w-2xl w-full  h-full items-center justify-center m-auto">
        <div className="messages-container overflow-y-auto flex-grow mb-6 bg-slate-200 rounded">
          {chatMessages.map((msg: any, index: any) => (
            <p key={index} className="mb-2">
              <span className="font-bold">{msg.clientId}</span> : {msg.message}
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
            className="flex-1 p-3 border border-slate-300 rounded mx-6"
          />

          <button
            onClick={handlerSendMessage}
            className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded font-medium"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
