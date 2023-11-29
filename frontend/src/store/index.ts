import { create } from "zustand";

interface ChatStore {
  messages: string[];

  getMessages: () => string[];
  setMessage: (message: string) => void;
}

export const useStore = create<ChatStore>((set, get) => {
  return {
    messages: [],

    getMessages: () => get().messages,
    setMessage: (message: string) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, message] });
    },
  };
});
