"use client";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "lucide-react";

export default function ChatMessage() {
  const { setSocket, socket, currentRoom } = useStore();
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any>([]);

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
        setChatMessages((prevMessages: any) => [...prevMessages, message]);
      });
      socket.on("getAllMessagesRoom", (messages) => {
        setChatMessages(messages);
      });

      socket.on("getAllMessagesRoomByClient", (messages) => {
        setChatMessages(messages);
      });

      socket.on("disconnect", (userId) => {
        setSocket(null);
      });
    }
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
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
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handlerSendMessage();
    }
  };
  return (
    <div className="bg-gray-300 p-4 md:p-8 text-gray-800 min-h-screen flex flex-col justify-between">
      <h1 className="font-bold text-2xl mb-12 text-center mt-12">
        Chat :{" "}
        <span className="font-semibold text-pink-900">
          {currentRoom ? currentRoom : "Clique em alguma sala"}
        </span>
      </h1>
      <div className="max-w-2xl w-full h-full items-center justify-center  mt-12">
        <div className="messages-container overflow-y-auto flex-grow mb-6 bg-gray-200 rounded p-4 ">
          {chatMessages.map((msg: any, index: any) => (
            <p key={index} className="mb-2 flex">
              <img
                src={
                  msg.profilePhotoUrl ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGdAOWdZSbW8kVEqzA2noZPKVaMCZZZZ2tpA&usqp=CAU"
                }
                alt="Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="font-bold text-blue-700">{msg.nickname}</span> :{" "}
              {msg.message}
            </p>
          ))}
        </div>
        {currentRoom.length > 1 && (
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center mt-auto">
            <input
              type="text"
              name="message"
              value={currentMessage}
              onKeyUp={handleKeyPress}
              onChange={(e) => setCurrentMessage(e.target.value)}
              placeholder="Digite sua mensagem..."
              className="flex-1 p-3 border border-gray-300 rounded mx-6 focus:outline-none focus:ring focus:border-blue-400"
            />

            <button
              onClick={handlerSendMessage}
              className="bg-slate-500  hover:bg-blue-400 text-white px-4 py-2 rounded font-medium"
            >
              <Send />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
