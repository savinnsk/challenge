import { axiosConfig } from "../config/axios.config";

interface UserCreateDto {
  name: string;
  nickname: string;
  email: string;
  password: string;
}

export const CreateUserService = async (data: UserCreateDto) => {
  try {
    const response = await axiosConfig.post(`users`, data, {});

    return response.data.data;
  } catch (err) {
    return err;
  }
};
