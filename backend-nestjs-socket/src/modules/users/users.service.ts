import { ConflictException, Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';
import { jwtHelper } from 'src/helpers/jwt-helper';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: UserCreateDto) {
    const existUser = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (existUser) {
      throw new ConflictException('User already exists');
    }
    const { id, email, nickname } = await this.prisma.user.create({ data });

    const accessToken = await jwtHelper.encrypt({
      sub: id,
      email,
      nickname,
    });

    return {
      status: 200,
      message: 'user created with success',
      data: {
        email,
        nickname,
        accessToken,
      },
    };
  }
}
