import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}
  async execute({
    user,
  }: any): Promise<{ accessToken: string; nickname: string }> {
    const payload = {
      email: user.email,
      sub: user.id,
      nickname: user.nickname,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      nickname: user.nickname,
    };
  }
}
