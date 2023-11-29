import { create } from "zustand";

interface ChatStore {
  messages: string[];
  room: string | null;
}

export const useStore = create<ChatStore>((set, get) => {
  return {
    messages: [],
    room: null,

    getMessages: () => get().messages,

    sendMessage: (message: string) => {
      const currentMessages = get().messages;
      set({ messages: [...currentMessages, message] });
    },

    setRoom: (room: string) => set({ room }),
  };
});
