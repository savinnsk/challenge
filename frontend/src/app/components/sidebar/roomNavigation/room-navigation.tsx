import { RoomItem } from "./room-item";

export function RoomNavigation() {
  return (
    <nav className="space-y-0.5 ">
      <p className="m-2 font-bold  text-green-500">SALAS DE CHAT</p>

      <RoomItem title={"Geral"} />
      <RoomItem title={"Flamengo"} />
    </nav>
  );
}
