import { Socket } from "socket.io-client";
import { create } from "zustand";

interface Store {
  socket: Socket | null;
  error: string | null;
  currentRoom: string;
  currentUser: any;
  setCurrentUser: (user: any) => void;
  setCurrentRoom: (room: string) => void;
  setSocket: (socket: Socket | null) => void;
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
    socket: null,
    isLogged: false,
    currentRoom: "",
    currentUser: null, // Add a new property to track the current user

    setCurrentUser: (user: any) => set({ currentUser: user }), // Set the current user
    setCurrentRoom: (room: string) => set({ currentRoom: room }),
    setError: (error: string | null) => set({ error }),
    setSocket: (socket: Socket | null) => set({ socket }),
    setFormValues: (formValues: Partial<FormValues>) => {
      set((state) => ({ ...state, ...formValues }));
    },
  };
});
