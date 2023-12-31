import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';
import { CreateRoomDto } from './dto';
import { jwtHelper } from 'src/helpers/jwt-helper';
import { RedisRepository } from 'src/infra/redis-repository';

@Injectable()
export class RoomsService {
  constructor(
    private prismaService: PrismaService,
    private readonly redisRepository: RedisRepository,
  ) {}

  async create({
    data,
    userToken,
  }: {
    data: CreateRoomDto;
    userToken: string;
  }) {
    try {
      let userId;
      const userPayload: any = await jwtHelper.decrypt(userToken);

      if (userPayload.payload) {
        userId = userPayload.payload;
      } else {
        userId = userPayload;
      }

      Object.assign(data, { userId: userId.sub });

      return this.prismaService.room.create({ data });
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async listAllRooms({ userToken }: { userToken: string }) {
    try {
      let userId;
      const userPayload: any = await jwtHelper.decrypt(userToken);

      if (userPayload.payload) {
        userId = userPayload.payload;
      } else {
        userId = userPayload;
      }

      const rooms = await this.prismaService.room.findMany();

      const roomsWithOwnership = rooms.map((room) => ({
        id: room.id,
        name: room.name,
        welcomeMessage: room.welcomeMessage,
        owner: room.userId === userId.sub,
      }));

      return roomsWithOwnership;
    } catch (error) {
      return new InternalServerErrorException();
    }
  }

  async deleteRoom({ id, userToken }: { id: string; userToken: string }) {
    try {
      await jwtHelper.decrypt(userToken);

      const room = await this.prismaService.room.findUnique({ where: { id } });
      await this.redisRepository.deleteMessagesByRoomChat(room.name);
      return this.prismaService.room.delete({ where: { id: room.id } });
    } catch (error) {
      return new InternalServerErrorException();
    }
  }
}
