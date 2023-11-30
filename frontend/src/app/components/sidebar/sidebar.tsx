import { Logo } from "./logo";
import { RoomNavigation } from "./roomNavigation/room-navigation";

export const SideBar = () => {
  return (
    <aside className="fixed h-screen left-0 top-0 right-0  bottom-0 z-20 bg-white  lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8  flex flex-col gap-6 border-b  border-zinc-200 ">
      <Logo />

      <RoomNavigation />

      <div className="mt-auto mb-20 flex flex-col gap-6">
        {/* <div>
          <a
            href=""
            className=" hover:bg-blue-300 bg-blue-500 items-center gap-3 rounded px-3 py-2 m-5"
          >
            <span className="font-medium text-white ">Adicionar Sala</span>
          </a>
        </div> */}

        <div>
          <a
            href=""
            className=" hover:bg-blue-300 bg-red-400 items-center gap-3 rounded px-3 py-2 m-5"
          >
            <span className="font-medium text-white ">Sair</span>
          </a>
        </div>
      </div>
    </aside>
  );
};
