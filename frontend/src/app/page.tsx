import { useEffect, useState } from "react";
import { io } from "socket.io-client";

export default function Home() {
  const [socket, setSocket] = useState(undefined);

  useEffect(() => {
    const socket = io("http://localhost:3000");
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-900 p-8  text-slate-900 dark:text-slate-100 h-screen flex flex-col items-center text-center ">
      <div className="max-w-2xl">
        <h1 className="font-bold text-3xl sm:text3xl lg:text-5xl">
          bg-slate-50 dark:bg-slate-900 p-8 text-slate-900 dark:text-slate-100
          h-screen flex flex-col items-center text-center
        </h1>
        <p mt-4>hello hello hello</p>

        <button className="bg-sky-500 dark:bg-sky-400 text-white dark:bg-text-white enabled px-4 py-2 rounded-md font-medium mt-4 enabled:hover:bg-sky-600 disabled:opacity-60 disabled:cursor-not-allowed">
          Sign in
        </button>
      </div>
    </div>
  );
}
