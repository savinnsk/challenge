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
    console.log('room', data.room);
    data.room = 'default';
    this.redisRepository.addMessageChat(data.room, data.clientId, data.data);
    // Broadcast the message to all connections in the room
    this.server.to(data.room).emit('message', {
      clientId: data.clientId,
      message: data.data,
    });
  }

  // @SubscribeMessage('joinRoom')
  // async handleJoinRoom(@MessageBody() room: string): Promise<void> {
  //   console.log('room1', room);
  //   this.server.join(room);

  //   const messages = await this.redisRepository.getMessagesByRoomChat(room);

  //   this.server.to(room).emit('getAllMessagesRoom', messages);
  // }
  @SubscribeMessage('getAllMessagesRoom')
  async getAllMessagesRoom(@MessageBody() data: any): Promise<void> {
    console.log('room2', data);
    //room = 'default';

    const messages = await this.redisRepository.getMessagesByRoomChat(data);

    this.server.emit('getAllMessagesRoom', messages);
  }
}
