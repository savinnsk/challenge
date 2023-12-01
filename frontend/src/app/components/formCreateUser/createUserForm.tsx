"use client";

import { CreateUserService } from "@/services/user-service";
import { Logo } from "../sidebar/logo";
import { useStore } from "@/store";
import { CreateUserFormData, createUserSchema } from "@/schemas/form-schemas";
import { ZodError } from "zod";
import ErrorPopup from "../errorPopUp/errorPopUp";

export const CreateUserForm = () => {
  const formData = useStore((state: any) => state);
  const setFormValues = useStore((state) => state.setFormValues);
  const { error, setError } = useStore();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { name, nickname, email, password } = formData;

      const data: CreateUserFormData = createUserSchema.parse({
        name,
        nickname,
        email,
        password,
      });
      const user = await CreateUserService({ name, nickname, email, password });

      localStorage.setItem("userToken", user.accessToken);
      localStorage.setItem("nickname", user.nickname);

      window.location.href = "/chat";
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessage = error.errors.map((err) => err.message).join("\n");
        setError(errorMessage);
      } else {
        console.error("Error creating user:", error);
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
    <section className="bg-gray-50 ">
      {error && <ErrorPopup message={error} onClose={closeErrorPopup} />}
      <div className=" items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <Logo className="flex" />
        </a>
        <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Vamos lá! Criar sua conta!
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit}
              action="#"
            >
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
                  required
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
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Senha
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />

                <button
                  type="submit"
                  className="w-full text-white font-bold  bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center mt-6"
                >
                  Criar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
