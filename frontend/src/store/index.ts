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
  setMessages: (messages: any) => void;
  setFormValues: (formValues: Partial<FormValues>) => void;
}

interface FormValues {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export const useStore = create<ChatStore>((set, get) => {
  return {
    name: "",
    nickname: "",
    email: "",
    password: "",
    messages: [],
    socket: null,

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
