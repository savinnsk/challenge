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
