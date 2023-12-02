import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';
import { CreateRoomDto } from './dto';
import { jwtHelper } from 'src/helpers/jwt-helper';

@Injectable()
export class RoomsService {
  constructor(private prismaService: PrismaService) {}

  async create({
    data,
    userToken,
  }: {
    data: CreateRoomDto;
    userToken: string;
  }) {
    try {
      const user = await jwtHelper.decrypt(userToken);

      Object.assign(data, { userId: user.sub });

      return this.prismaService.room.create({ data });
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
