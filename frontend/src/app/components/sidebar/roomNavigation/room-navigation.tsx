import { RoomItem } from "./room-item";

export function RoomNavigation() {
  return (
    <nav className="space-y-3  ">
      <p className="m-2 font-extrabold  text-white">SALAS DE CHAT</p>
      <RoomItem title={"Geral"} />
      <RoomItem title={"Flamengo"} />
    </nav>
  );
}
