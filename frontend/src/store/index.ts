import { create } from "zustand";
import { io, Socket } from "socket.io-client";

interface ChatStore {
  socket: Socket | any;
  messages: string[];

  getMessages: () => string[];
  setMessage: (message: string) => void;
  setSocket: (socket: Socket) => void;
  getSocket: () => Socket | any;
}

export const useStore = create<ChatStore>((set, get) => {
  return {
    messages: [],
    socket: null,

    getMessages: () => get().messages,
    setMessage: (message: string) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, message] });
    },
    setSocket: (socket: any) => set({ socket: socket }),
    getSocket: () => get().socket,
  };
});
