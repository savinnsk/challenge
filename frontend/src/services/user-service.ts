import { axiosConfig } from "../config/axios.config";

interface UserCreateDto {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export const CreateUserService = async (data: UserCreateDto) => {
  try {
    const user = await axiosConfig.post(`users`, data, {});

    return user.data;
  } catch (err) {
    return err;
  }
};
