import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ChatGateway } from './chat-gateway';
import { RedisService } from './config/redis';
import { RedisRepository } from './infra/redis-repository';
import { UsersModule } from './modules/users/users.module';
import authEnv from './config/auth.env';
import { AuthModule } from './modules/authentication/auth.module';
import { ConfigModule } from '@nestjs/config';
import { RoomsModule } from './modules/rooms/rooms.module';
import { RoomsModule } from './modules/rooms/rooms.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      RedisService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [authEnv],
    }),
    UsersModule,
    AuthModule,
    RoomsModule,
  ],
  controllers: [],
  providers: [ChatGateway, RedisRepository, RedisService],
})
export class AppModule {}
