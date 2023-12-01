import { CreateUserService } from "@/services/user-service";
import { Logo } from "../sidebar/logo";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";

export const CreateUserForm = () => {
  const formData = useStore((state: any) => state);
  const setFormValues = useStore((state) => state.setFormValues);
  const navigate = useNavigate();
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const user = await CreateUserService(formData);

      console.log("User created successfully:", user);
      localStorage.setItem("userToken", user.accessToken);
      localStorage.setItem("nickname", user.nickname);
      navigate("/chat");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormValues({ [name]: value });
  };

  return (
    <section className="bg-gray-50 ">
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
                  Apelido/Nickname
                </label>
                <input
                  type="text"
                  name="nick"
                  id="nick"
                  value={formData.nick}
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
