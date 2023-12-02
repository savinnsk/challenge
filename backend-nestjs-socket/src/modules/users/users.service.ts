import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserCreateDto, UserUpdateDto } from './dto';
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

    const nicknameExist = await this.prisma.user.findFirst({
      where: {
        nickname: data.nickname,
      },
    });

    if (existUser || nicknameExist) {
      throw new ConflictException('User already exists');
    }
    const { id, email, nickname } = await this.prisma.user.create({ data });

    if (!id) {
      throw new InternalServerErrorException('Internal Error');
    }

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

  async update({
    data,
    userToken,
  }: {
    data: UserUpdateDto;
    userToken: string;
  }) {
    try {
      const userId = await jwtHelper.decrypt(userToken);
      const user = await this.prisma.user.update({
        data,
        where: {
          id: userId,
        },
      });

      return {
        message: 'user updated success',
        nickname: user.name,
      };
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
