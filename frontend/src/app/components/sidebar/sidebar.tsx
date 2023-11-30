import { Logo } from "./logo";
import { RoomNavigation } from "./roomNavigation/room-navigation";

export const SideBar = () => {
  return (
    <aside className=" border-r border-zinc-200 px-5 py-8 space-y-6">
      <Logo />

      <RoomNavigation />
    </aside>
  );
};
