import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ChatGateway } from './chat-gateway';
import { RedisService } from './config/redis';
import { RedisRepository } from './infra/redis-repository';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      RedisService,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [ChatGateway, RedisRepository, RedisService],
})
export class AppModule {}
