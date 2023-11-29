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
    data.room = 'default';
    this.redisRepository.addMessageChat(data.room, data.clientId, data.data);
    const messages = await this.redisRepository.getMessagesByRoomChat(
      data.room,
    );
    this.server.emit('message', messages);
  }

  @SubscribeMessage('getAllMessagesRoom')
  async getAllMessagesRoom(room: string): Promise<void> {
    room = 'default';

    const messages = await this.redisRepository.getMessagesByRoomChat(room);
    this.server.emit('getAllMessagesRoom', messages);
  }
}
