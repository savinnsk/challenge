"use client";

import { useState } from "react";
import { Logo } from "../sidebar/logo";

interface CreateChatFromProps {
  onClose: () => void;
}

export const CreateChatForm = ({ onClose }: CreateChatFromProps) => {
  const [name, setName] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  function handleSubmit() {}

  return (
    <section className=" rounded bg-gray-900 fixed inset-0 flex items-center justify-center bg-opacity-60 ">
      <div className=" items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <Logo className="flex" />
        </a>
        <div className=" lg:mt-6/12 w-full  bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Criar Chat!
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nome do Chat
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Mensagem de Boas vindas
                </label>
                <input
                  type="text"
                  name="welcomeMessage"
                  id="welcomeMessage"
                  value={welcomeMessage}
                  onChange={(e) => {
                    setWelcomeMessage(e.target.value);
                  }}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="w-full text-white font-bold  bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center mt-6"
              >
                Criar
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full text-white font-bold bg-gray-500 hover:bg-gray-600 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5"
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
