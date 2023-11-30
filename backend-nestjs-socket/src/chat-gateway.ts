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
    this.server.to(data.room).emit('message', {
      clientId: data.clientId,
      message: data.data,
    });
  }

  @SubscribeMessage('joinRoom')
  async handleJoinRoom(@MessageBody() room: string): Promise<void> {
    this.server.join(room);

    const messages = await this.redisRepository.getMessagesByRoomChat(room);

    this.server.to(room).emit('getAllMessagesRoom', messages);
  }

  @SubscribeMessage('getAllMessagesRoom')
  async getAllMessagesRoom(room: string): Promise<void> {
    room = 'default';

    const messages = await this.redisRepository.getMessagesByRoomChat(room);

    this.server.emit('getAllMessagesRoom', messages);
  }
}
