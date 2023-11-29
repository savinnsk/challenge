import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis';

@Injectable()
export class RedisRepository {
  constructor(private readonly redis: RedisService) {}

  async getMessagesByRoomChat(room: string) {
    const messages = await this.redis.lrange(room, 0, -1);
    return messages.map((message) => JSON.parse(message));
  }

  async addMessageChat(room: string, clientId: string, message: string) {
    try {
      console.log(clientId);
      const jsonMessage = JSON.stringify({ clientId, message });
      await this.redis.rpush(room, jsonMessage);
    } catch (e) {
      console.log(e);
    }
  }
}
