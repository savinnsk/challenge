"use client";

import { useState } from "react";
import { Logo } from "./logo";
import { RoomNavigation } from "./roomNavigation/room-navigation";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Menu, Pencil, MessageSquarePlus } from "lucide-react";
import { CreateChatForm } from "../createChatFotm/createChatForm";

export const SideBar = () => {
  const [isCreateChatModalOpen, setCreateChatModalOpen] = useState(false);

  const openCreateChatModal = () => {
    setCreateChatModalOpen(true);
  };

  const closeCreateChatModal = () => {
    setCreateChatModalOpen(false);
  };

  return (
    <Collapsible.Root className="fixed items-center left-0 top-0 right-0 data-[state=open]:bottom-0  lg:data-[state=closed]:bottom-0 z-20 bg-gray-500 lg:right-auto lg:w-80 lg:border-r lg:px-5 lg:py-8 flex flex-col gap-6 border-b">
      <div className="flex items-center justify-between">
        <Logo fill="white" />
        <Collapsible.Trigger asChild className="lg:hidden ml-2">
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

        <div className="mb-8 flex flex-col gap-2 font-bold">
          <a href="auth/update">
            <button className="bg-slate-600 hover:bg-slate-500 text-white  rounded px-3 py-2 flex justify-between ">
              Editar Perfil <Pencil />
            </button>
          </a>
          <button
            onClick={openCreateChatModal}
            className="bg-slate-600 hover:bg-slate-500 text-white rounded px-3 py-2 flex justify-between"
          >
            Criar Chat <MessageSquarePlus />
          </button>

          {isCreateChatModalOpen && (
            <CreateChatForm onClose={closeCreateChatModal} />
          )}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
};
