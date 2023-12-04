import { axiosConfig } from "../config/axios.config";

export const deleteRoomService = async ({
  roomId,
  userToken,
}: {
  roomId: string;
  userToken: string | null;
}) => {
  try {
    const response = await axiosConfig.delete(`rooms/${roomId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });

    return response;
  } catch (err) {
    return err;
  }
};

export const createRoomService = async (data: {
  name: string;
  userToken: string | null;
  welcomeMessage?: string;
}) => {
  try {
    const { name, welcomeMessage } = data;
    const response = await axiosConfig.post(
      `rooms/`,
      { name, welcomeMessage },
      {
        headers: {
          Authorization: `Bearer ${data.userToken}`,
        },
      }
    );

    return response;
  } catch (err) {
    return err;
  }
};

export const fetchRoomsService = async (userToken: string | null) => {
  try {
    const response = await axiosConfig.get("/rooms", {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return error;
  }
};
