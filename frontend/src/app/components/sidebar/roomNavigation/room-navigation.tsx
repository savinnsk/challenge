import { RoomItem } from "./room-item";

export function RoomNavigation() {
  return (
    <nav className="space-y-0.5 ">
      <p className="m-2 font-bold text-gray-700">SALAS DE CHAT</p>

      <RoomItem title={"Geral"} />
    </nav>
  );
}
