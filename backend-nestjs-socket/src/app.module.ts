import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  controllers: [AppController],
  providers: [AppService, ChatGateway, RedisRepository, RedisService],
})
export class AppModule {}
