"use client";
import { useStore } from "@/store";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Send } from "lucide-react";
import { FindOneUser } from "@/services/user-service";

export default function ChatMessage() {
  const { setSocket, socket, currentRoom, setCurrentRoom, verifyUserSession } =
    useStore();
  const [currentMessage, setCurrentMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any>([]);
  const [user, setUser] = useState<any>(null);
  const userToken = localStorage.getItem("userToken");
  if (!userToken) {
    window.location.href = "/auth";
  }

  useEffect(() => {
    const session: any = verifyUserSession(userToken);

    session.then((res: any) => {
      if (!res.data.name) {
        window.location.href = "/auth";
      }
    });
    const user = FindOneUser({ userToken });

    user.then((values) => {
      setUser(values);
    });
  }, []);

  useEffect(() => {
    const socketInit = io("ws://localhost:3002");
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

      socket.on("changeRoom", (data) => {
        setChatMessages(data.messages);
        setCurrentRoom(data.room);
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
        nickname: user.nickname,
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
      <h1 className="font-bold text-2xl mb-12 text-center mt-12 lg:mt-4">
        Chat :{" "}
        <span className="font-semibold text-slate-700">
          {currentRoom
            ? currentRoom
            : "Nenhuma sala selecionada clique ao lado"}
        </span>
      </h1>
      <div className="max-w-2xl w-full h-full items-center justify-center  mt-12">
        <div className="messages-container overflow-y-auto flex-grow mb-6 bg-gray-200 rounded p-4">
          {chatMessages.map((msg: any, index: any) => (
            <p key={index} className="mb-2 flex">
              <img
                src={
                  user.photo ||
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
