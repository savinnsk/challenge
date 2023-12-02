"use client";

import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { MessageSquare, Trash2 } from "lucide-react";
import ConfirmationModal from "../../modalConfirmation/modalComfirmation";
import { deleteRoomService } from "@/services/room-service";
export function RoomNavigation() {
  const { rooms, fetchRooms, verifyUserSession } = useStore();

  let userToken = localStorage.getItem("userToken");
  const { socket, setCurrentRoom } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerEnterAtRoom = (room: string) => {
    setCurrentRoom(room);
    if (socket) {
      socket.emit("getAllMessagesRoomByClient", room);
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
            onClick={() => handlerEnterAtRoom(room.name)}
            className="flex bg-slate-600 hover:bg-slate-500  items-center gap-3 rounded px-3 py-2 "
          >
            <MessageSquare className="text-white" />
            <span className="font-medium text-white ">{room.name}</span>
          </button>
          {room.owner && (
            <button
              onClick={handleDeleteRoom}
              className="text-white bg-red-400 rounded hover:bg-red-300  p-4"
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
