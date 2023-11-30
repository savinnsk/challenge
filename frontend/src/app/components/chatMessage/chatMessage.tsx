"use client";

import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
export default function ChatMessage() {
  const { setSocket, socket, setMessages } = useStore();
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any>([]);

  useEffect(() => {
    let socketInit = io("ws://localhost:3001");
    setSocket(socketInit);

    socketInit.emit("joinRoom", "default");
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
    <div className="bg-slate-50 dark:bg-slate-900 p-8  text-slate-900 dark:text-slate-100 h-screen flex flex-col items-center text-center ">
      <div className="max-w-2xl">
        <h1 className="font-bold text-3xl sm:text3xl lg:text-5xl">
          Assunto : Camisa Do Pelé
        </h1>

        <div className="messages-container">
          {chatMessages.map((msg: any, index: any) => (
            <p key={index}>
              {" "}
              {msg.clientId} : {msg.message}
            </p>
          ))}
        </div>

        <input
          type="text"
          name="message"
          value={currentMessage}
          onChange={(e) => {
            e.persist();
            setCurrentMessage(e.target.value);
          }}
          className="bg-slate-50 dark:bg-slate-900 p-8  text-slate-900 dark:text-slate-100 outline outline-offset-2 flex-1  outline-2  rounded px-2 py-1 m-3"
        ></input>

        <button
          onClick={handlerSendMessage}
          className="bg-sky-500 dark:bg-sky-400 text-white dark:bg-text-white enabled px-4 py-2 rounded-md font-medium mt-4 enabled:hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
        <button
          onClick={handlerEnterAtRoom}
          className="bg-sky-500 dark:bg-sky-400 text-white dark:bg-text-white enabled px-4 py-2 rounded-md font-medium mt-4 enabled:hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          entrar
        </button>
      </div>
    </div>
  );
}
