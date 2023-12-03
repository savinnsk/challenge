import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { RedisRepository } from './infra/redis-repository';
import { Socket } from 'socket.io';

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

  @SubscribeMessage('changeRoom')
  async handleChangeRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    client.join(data);
    const messages = await this.redisRepository.getMessagesByRoomChat(data);
    const data2 = {
      room: data,
      messages: messages,
    };
    client.emit('changeRoom', data2);
  }

  @SubscribeMessage('getAllMessagesRoomByClient')
  async getAllMessagesRoomByClient(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    const messages = await this.redisRepository.getMessagesByRoomChat(data);

    client.to(data).emit('getAllMessagesRoomByClient', messages);
  }

  @SubscribeMessage('getAllMessagesRoom')
  async getAllMessagesRoom(@MessageBody() data: any): Promise<void> {
    const messages = await this.redisRepository.getMessagesByRoomChat(data);
    this.server.to(data).emit('getAllMessagesRoom', messages);
  }

  @SubscribeMessage('leaveRoom')
  async leaveRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    client.leave(data);
    client.emit('leftRoom', data);
  }
}
