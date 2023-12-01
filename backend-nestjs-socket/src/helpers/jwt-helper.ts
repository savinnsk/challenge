import authConfig from 'src/config/auth.env';
import { verify, sign } from 'jsonwebtoken';
import { UserPayloadJwt } from 'src/domain/user-payload-jwt';

export const jwtHelper = {
  decrypt: async (value: string): Promise<string> => {
    const accessToken = await verify(value, authConfig().jwtSecret);
    return accessToken as string;
  },

  encrypt: async (payload: UserPayloadJwt): Promise<string> => {
    const accessToken = await sign({ payload }, authConfig().jwtSecret, {
      expiresIn: authConfig().jwtExpiresIn,
    });
    return accessToken;
  },
};
