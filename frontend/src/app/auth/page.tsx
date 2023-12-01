"use client";

import { Logo } from "@/app/components/sidebar/logo";
import { useStore } from "@/store";
import ErrorPopup from "../components/errorPopUp/errorPopUp";
import { LoginUserService } from "@/services/user-service";

export default function Login() {
  const formData = useStore((state: any) => state);
  const setFormValues = useStore((state) => state.setFormValues);
  const { error, setError } = useStore();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { email, password } = formData;

      const user: any = await LoginUserService({ email, password });
      console.log(user);
      if (user.response?.status == 401) {
        setError("Email ou senha incorretos!");
        return;
      }

      if (user.response?.status) {
        setError("Estamos com problemas, tente novamente mais tarde!");
        return;
      }

      localStorage.setItem("userToken", user.data.accessToken);
      localStorage.setItem("nickname", user.data.nickname);

      window.location.href = "/chat";
    } catch (error) {
      console.log(error);
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
      <div className=" items-center justify-center px-6 py-8  md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
        >
          <Logo className="flex" />
        </a>
        <div className="lg:mt-6/12 w-full bg-white rounded-lg shadow  mt-12 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Bem vindo!
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
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
                  onClick={handleSubmit}
                  className="w-full text-white font-bold  bg-slate-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg text-sm px-5 py-2.5 text-center mt-6"
                >
                  Entrar
                </button>
              </div>

              <p className="text-sm font-light text-gray-500 ">
                Ainda não tem uma conta?{" "}
                <a
                  href="/auth/sign-up"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Criar Conta
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
