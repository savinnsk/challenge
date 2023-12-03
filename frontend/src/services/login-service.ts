import { axiosConfig } from "../config/axios.config";

interface UserLogin {
  email: string;
  password: string;
}

export const LoginService = async (data: UserLogin) => {
  try {
    const token = await axiosConfig.post(`login`, data, {});

    return token;
  } catch (err) {
    return err;
  }
};
