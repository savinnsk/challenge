import { create } from "zustand";

interface ChatStore {
  messages: string[];
  room: string | null;
  isLoading: boolean;
  getMessages: () => string[];
  sendMessage: (message: string) => void;
  setRoom: (room: string) => void;
}

export const useStore = create<ChatStore>((set, get) => {
  return {
    messages: [],
    room: null,
    isLoading: false,

    getMessages: () => get().messages,

    sendMessage: (message: string) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, message] });
    },

    setRoom: (room: string) => set({ room }),
  };
});
