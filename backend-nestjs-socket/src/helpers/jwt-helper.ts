import authConfig from 'src/config/auth.env';
import { verify, sign } from 'jsonwebtoken';
import { UserPayloadJwt } from 'src/domain/user-payload-jwt';

export const jwtHelper = {
  decrypt: async (value: string): Promise<string> => {
    try {
      const user: any = await verify(value, authConfig().jwtSecret);

      return user.payload as string;
    } catch (error) {
      console.log(error);
    }
  },

  encrypt: async (payload: UserPayloadJwt): Promise<string> => {
    try {
      const accessToken = await sign({ payload }, authConfig().jwtSecret, {
        expiresIn: authConfig().jwtExpiresIn,
      });
      return accessToken;
    } catch (e) {
      console.log(e);
    }
  },
};
