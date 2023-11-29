import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import * as Redis from 'ioredis';

import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server;
  private redisClient: Redis.Redis;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    console.log(message);
    this.server.emit('message', message);
  }
}
