import { axiosConfig } from "@/config/axios.config";
import { Socket } from "socket.io-client";
import { create } from "zustand";

interface Store {
  socket: Socket | null;
  setSocket: (socket: Socket | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  currentRoom: string;
  setCurrentRoom: (room: string) => void;
  currentUser: any;
  setCurrentUser: (user: any) => void;
  rooms: [];
  fetchRooms: (userToken: string | null) => void;
  setFormValues: (formValues: Partial<FormValues>) => void;
  userToken: string | null;
  setUserToken: (token: string | null) => void;
}

interface FormValues {
  name: string;
  nickname: string;
  email: string;
  password: string;
  photoUrl: string;
}

export const useStore = create<Store>((set, get) => {
  return {
    name: "",
    nickname: "",
    email: "",
    password: "",
    photo: "",
    error: null,
    socket: null,
    isLogged: false,
    currentRoom: "",
    currentUser: null,
    userToken: null,
    rooms: [],

    setCurrentUser: (user: any) => set({ currentUser: user }), // Set the current user
    setCurrentRoom: (room: string) => set({ currentRoom: room }),
    setError: (error: string | null) => set({ error }),
    setSocket: (socket: Socket | null) => set({ socket }),
    setFormValues: (formValues: Partial<FormValues>) => {
      set((state) => ({ ...state, ...formValues }));
    },
    fetchRooms: async (userToken: string | null) => {
      try {
        const response = await axiosConfig.get("/rooms", {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        set({ rooms: response.data });
      } catch (error) {
        console.error("Error fetching rooms:", error);
        return error;
      }
    },
    setUserToken: (token: string | null) => set({ userToken: token }),
  };
});
