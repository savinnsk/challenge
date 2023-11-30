import { Socket } from "socket.io-client";
import { create } from "zustand";

interface Message {
  message: string;
  clientId: string;
}
interface ChatStore {
  messages: Message[];
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
  getMessages: () => Message[];
  setMessages: (messages: Message[]) => void;
}

export const useStore = create<ChatStore>((set, get) => {
  return {
    messages: [],
    socket: null,

    setSocket: (socket: Socket) => set({ socket }),
    getMessages: () => get().messages,
    setMessages: (messages: Message[]) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, ...messages] });
    },
  };
});
