import { Injectable } from '@nestjs/common';
import { RedisService } from 'src/config/redis';

@Injectable()
export class RedisUserRepository {
  constructor(private readonly redis: RedisService) {}

  async findMany() {
    const users = await this.redis.get('users');
    if (!users) return null;

    return JSON.parse(users);
  }

  async create(key: string, value: any, exp?: number) {
    const stringValue = JSON.stringify(value);
    await this.redis.set(key, stringValue, 'EX', exp);
  }
}
