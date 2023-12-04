"use client";

import { FindOneUser, UpdateUserService } from "@/services/user-service";
import { Logo } from "../sidebar/logo";
import { useStore } from "@/store";
import { UpdateUserFormData, updateUserSchema } from "@/schemas/form-schemas";
import { ZodError } from "zod";
import ErrorPopup from "../errorPopUp/errorPopUp";
import { useEffect } from "react";

export const UpdateUserForm = () => {
  const formData = useStore((state: any) => state);
  const setFormValues = useStore((state) => state.setFormValues);
  const { error, setError } = useStore();
  let userToken =
    typeof window !== "undefined" ? localStorage.getItem("userToken") : null;

  useEffect(() => {
    const user = FindOneUser({ userToken });
    user.then((user) => {
      Object.keys(user).forEach((field) => {
        setFormValues({ [field]: user[field] });
      });
    });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { name, nickname, email, password, photo } = formData;

      const data: UpdateUserFormData = updateUserSchema.parse({
        name,
        nickname,
        email,
        password,
        photo,
      });

      const user: any = await UpdateUserService({ data, userToken });

      if (user.response?.status == 409) {
        setError("Email ou Nickname já está em uso!");
        return;
      }

      if (user.response?.status) {
        setError("Estamos com problemas, tente novamente mais tarde!");
        return;
      }

      localStorage.setItem("nickname", user.nickname);

      window.location.href = "/chat";
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join("\n");
        setError(errorMessage);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues({ [name]: value });
  };

  const closeErrorPopup = () => {
    setError(null);
  };

  return (
    <section className=" rounded ">
      {error && <ErrorPopup message={error} onClose={closeErrorPopup} />}
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
              Editar sua conta!
            </h1>
            <form className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Nome
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="user"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Apelido/Nickname
                </label>
                <input
                  type="text"
                  name="nickname"
                  id="nickname"
                  value={formData.nickname}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="user1234"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Seu Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="seuemail@email.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  url Foto
                </label>
                <input
                  type="text"
                  name="photoUrl"
                  id="photoUrl"
                  value={formData.photo}
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="http://photo.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                />

                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="w-full text-white font-bold  bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center mt-6"
                >
                  Editar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
