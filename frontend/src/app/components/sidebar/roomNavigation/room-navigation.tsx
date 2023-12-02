"use client";

import { useStore } from "@/store";
import { RoomItem } from "./room-item";
import { useEffect } from "react";

export function RoomNavigation() {
  const { rooms, fetchRooms, verifyUserSession } = useStore();

  let userToken = localStorage.getItem("userToken");

  useEffect(() => {
    const session = verifyUserSession(userToken);
    session.then((res: any) => {
      if ((res.status = !200)) {
        window.location.href = "/auth";
      }
    });

    fetchRooms(userToken);
  }, [fetchRooms]);
  return (
    <nav className="space-y-3  ">
      <p className="m-2 font-extrabold  text-white">SALAS DE CHAT</p>
      {rooms.map((room: any) => (
        <RoomItem title={room.name} key={room.id} />
      ))}
    </nav>
  );
}
