"use client";

import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import ConfirmationModal from "../../modalConfirmation/modalComfirmation";
import { deleteRoomService } from "@/services/room-service";
export function RoomNavigation() {
  const { rooms, fetchRooms, verifyUserSession } = useStore();

  let userToken = localStorage.getItem("userToken");
  const { socket, setCurrentRoom, currentRoom } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("changeRoom", (newRoom) => {
        setCurrentRoom(newRoom);
      });
      socket.on("leaveRoom", () => {
        setCurrentRoom("");
      });
      return () => {
        if (socket) {
          socket.off("changeRoom");
        }
      };
    }
  }, [socket]);

  const handleRoomChange = (newRoom: string) => {
    if (socket) {
      if (currentRoom) socket.emit("leaveRoom", currentRoom);
      socket.emit("changeRoom", newRoom);
    }
  };

  const handleConfirmDeleteRoom = async (roomId: string) => {
    const response: any = await deleteRoomService({ roomId, userToken });

    if (response.status == 200) {
      fetchRooms(userToken);
      window.location.href = "/chat";
    }
    setIsModalOpen(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleDeleteRoom = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const session = verifyUserSession(userToken);
    session.then((res: any) => {
      if (res.status != 200) {
        window.location.href = "/auth";
      }
    });

    fetchRooms(userToken);
  }, [fetchRooms]);
  return (
    <nav className="space-y-3 ">
      <p className="m-2 font-extrabold  text-white">SALAS DE CHAT</p>

      {rooms.map((room: any) => (
        <p className="flex" key={room.id}>
          <button
            onClick={() => handleRoomChange(room.name)}
            className="flex bg-slate-600 hover:bg-slate-500  items-center gap-3 rounded px-3 py-2 "
          >
            <MessageSquare className="text-white" />
            <span className="font-medium text-white ">{room.name}</span>
          </button>
          {room.owner && (
            <button
              onClick={handleDeleteRoom}
              className="text-white bg-red-400 rounded hover:bg-red-300  p-2"
            >
              <Trash2 />
            </button>
          )}

          <ConfirmationModal
            message={`Tem certeza que deseja deletar a sala ${room.name}?`}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={() => handleConfirmDeleteRoom(room.id)}
          />
        </p>
      ))}
    </nav>
  );
}
