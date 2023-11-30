import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';

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
      throw new Error('User already exists');
    }
    const user = await this.prisma.user.create({ data });

    return user;
  }
}
