import { axiosConfig } from "../config/axios.config";

interface UserCreateDto {
  name: string;
  nickname: string;
  email: string;
  password: string;
  photoUrl?: string;
}

interface UserUpdateDto {
  name?: string;
  nickname?: string;
  email?: string;
  password?: string;
  photoUrl?: string;
}

interface UserLoginDto {
  email: string | any;
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

export const UpdateUserService = async ({
  data,
  userToken,
}: {
  data: UserUpdateDto;
  userToken: string | null;
}) => {
  try {
    const response = await axiosConfig.put(`users`, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

export const FindOneUser = async ({
  userToken,
}: {
  userToken: string | null;
}) => {
  try {
    const response = await axiosConfig.get(`users`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response.data;
  } catch (err) {
    return err;
  }
};

export const LoginUserService = async (data: any) => {
  try {
    const response = await axiosConfig.post(`login`, data, {});

    return response;
  } catch (err) {
    return err;
  }
};
