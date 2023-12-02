"use client";

import { Logo } from "./logo";
import { RoomNavigation } from "./roomNavigation/room-navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Menu } from "lucide-react";

export const SideBar = () => {
  return (
    <Collapsible.Root className="fixed  left-0 top-0 right-0 data-[state=open]:bottom-0  lg:data-[state=closed]:bottom-0 z-20 bg-gray-500 lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8 flex flex-col gap-6 border-b">
      <div className="flex items-center justify-between">
        <Logo fill="white" />
        <Collapsible.Trigger asChild className="lg:hidden">
          <button className="bg-slate-600 hover:bg-blue-300 text-white font-medium rounded px-3 py-2">
            <Menu className="h-6 w-6" />
          </button>
        </Collapsible.Trigger>
      </div>

      <Collapsible.Content
        forceMount
        className="flex flex-col flex-1 gap-12 data-[state=closed]:hidden lg:data-[state=closed]:flex justify-between"
      >
        <RoomNavigation />

        <div className="mt-auto flex flex-col ">
          <div></div>
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
