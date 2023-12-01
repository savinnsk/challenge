import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ChatGateway } from './chat-gateway';
import { RedisService } from './config/redis';
import { RedisRepository } from './infra/redis-repository';
import { UsersModule } from './modules/users/users.module';
import authEnv from './config/auth.env';
import { AuthModule } from './modules/authentication/auth.module';
import { ConfigModule } from '@nestjs/config';

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
  ],
  controllers: [],
  providers: [ChatGateway, RedisRepository, RedisService],
})
export class AppModule {}
