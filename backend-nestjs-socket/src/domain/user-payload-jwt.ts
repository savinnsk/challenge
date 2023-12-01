export interface UserPayloadJwt {
  sub: string;
  email: string;
  nickname: string;
  payload?: any;
}
