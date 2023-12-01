import { Socket } from "socket.io-client";
import { create } from "zustand";

interface Message {
  message: string;
  clientId: string;
}
interface Store {
  messages: Message[];
  socket: Socket | null;
  error: string | null;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
  setSocket: (socket: Socket) => void;
  getMessages: () => Message[];
  setMessages: (messages: any) => void;
  setFormValues: (formValues: Partial<FormValues>) => void;
  setError: (error: string | null) => void;
}

interface FormValues {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export const useStore = create<Store>((set, get) => {
  return {
    name: "",
    nickname: "",
    email: "",
    password: "",
    error: null,
    messages: [],
    socket: null,
    isLogged: false,
    currentRoom: "",

    setCurrentRoom: (room: string) => set({ currentRoom: room }),
    setError: (error: string | null) => set({ error }),
    setSocket: (socket: Socket) => set({ socket }),
    getMessages: () => get().messages,
    setMessages: (messages: Message[]) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, ...messages] });
    },
    setMessage: (message: Message) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, message] });
    },
    setFormValues: (formValues: Partial<FormValues>) => {
      set((state) => ({ ...state, ...formValues }));
    },
  };
});
