"use client";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState<any>(undefined);
  const [message, setMessage] = useState("");
  const [roomName, setRooName] = useState("");

  const handlerSendMessage = () => {
    console.log("click");
    socket.emit("message", { data: message });
  };

  socket.on("message", ({ data }: any) => {
    console.log("truee", data);
  });

  useEffect(() => {
    const socket = io("http://localhost:3001");
    setSocket(socket);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-8  text-slate-900 dark:text-slate-100 h-screen flex flex-col items-center text-center ">
      <div className="max-w-2xl">
        <h1 className="font-bold text-3xl sm:text3xl lg:text-5xl">
          bg-slate-50 dark:bg-slate-900 p-8 text-slate-900 dark:text-slate-100
          h-screen flex flex-col items-center text-center
        </h1>

        <input
          type="text"
          name="message"
          onChange={(e) => setMessage(e.target.value)}
          className="bg-slate-50 dark:bg-slate-900 p-8  text-slate-900 dark:text-slate-100 outline outline-offset-2 flex-1  outline-2  rounded px-2 py-1 m-3"
        ></input>

        <button
          onClick={handlerSendMessage}
          className="bg-sky-500 dark:bg-sky-400 text-white dark:bg-text-white enabled px-4 py-2 rounded-md font-medium mt-4 enabled:hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
