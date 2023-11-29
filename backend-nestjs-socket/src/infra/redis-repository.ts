import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis';

@Injectable()
export class RedisRepository {
  constructor(private readonly redis: RedisService) {}

  async getMessagesChat() {
    const messages = await this.redis.get('messages');
    if (!messages) return null;

    return JSON.parse(messages);
  }

  async addMessageChat(key: string, value: any, exp?: number) {
    const stringValue = JSON.stringify(value);
    await this.redis.set(key, stringValue, 'EX', exp);
  }
}
