import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis';

@Injectable()
export class RedisRepository {
  constructor(private readonly redis: RedisService) {}

  async getMessagesByRoomChat(room: string) {
    const messages = await this.redis.lrange(room, 0, -1);
    const result = messages.map((message) => JSON.parse(message));

    return result;
  }

  async addMessageChat(
    room: string,
    clientId: string,
    nickname: string,
    message: string,
  ) {
    try {
      const jsonMessage = JSON.stringify({ clientId, message, nickname });
      await this.redis.rpush(room, jsonMessage);
    } catch (e) {
      console.log(e);
    }
  }
}
