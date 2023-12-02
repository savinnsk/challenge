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

  async listAllRooms({ userToken }: { userToken: string }) {
    try {
      const user: any = await jwtHelper.decrypt(userToken);

      const rooms = await this.prismaService.room.findMany();

      const roomsWithOwnership = rooms.map((room) => ({
        id: room.id,
        name: room.name,
        welcomeMessage: room.welcomeMessage,
        owner: room.userId === user.sub,
      }));

      return roomsWithOwnership;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async deleteRoom({ id, userToken }: { id: string; userToken: string }) {
    try {
      await jwtHelper.decrypt(userToken);

      this.prismaService.room.delete({ where: { id } });
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
