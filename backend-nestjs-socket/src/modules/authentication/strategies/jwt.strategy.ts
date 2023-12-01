import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface UserToken {
  sub: string;
  email: string;
  nickname: string;
  payload?: any;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwtSecret'),
    });
  }

  async validate(payload: UserToken) {
    const { sub, email, nickname } =
      payload.sub != null ? payload : payload.payload;
    return { sub, email, nickname };
  }
}
