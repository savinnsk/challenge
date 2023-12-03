import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { PrismaService } from 'src/infra/database/prisma/prisma-service';
import { RedisRepository } from 'src/infra/redis-repository';
import { RedisService } from 'src/config/redis';

@Module({
  controllers: [RoomsController],
  providers: [RoomsService, PrismaService, RedisRepository, RedisService],
})
export class RoomsModule {}
