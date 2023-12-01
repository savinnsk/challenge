import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { RedisRepository } from './infra/redis-repository';

@WebSocketGateway({ cors: true })
export class ChatGateway {
  @WebSocketServer()
  server;

  constructor(private readonly redisRepository: RedisRepository) {}

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: any): Promise<void> {
    this.redisRepository.addMessageChat(
      data.room,
      data.clientId,
      data.nickname,
      data.data,
    );

    this.server.to(data.room).emit('message', {
      room: data.room,
      nickname: data.nickname,
      clientId: data.clientId,
      message: data.data,
    });
  }

  @SubscribeMessage('getAllMessagesRoom')
  async getAllMessagesRoom(@MessageBody() data: any): Promise<void> {
    const messages = await this.redisRepository.getMessagesByRoomChat(data);

    this.server.emit('getAllMessagesRoom', messages);
  }
}
