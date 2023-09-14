import { NotFoundException } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class Gateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, Socket> = new Map();

  handleConnection(client: Socket) {
    console.log('connected');
    console.log(client);
    client.send('hello');
  }

  getSocketBySerialNumber(serialNumber: string): Socket {
    if (!this.clients[serialNumber]) {
      throw new NotFoundException('not registred socket!');
    }
    return this.clients[serialNumber];
  }

  @SubscribeMessage('message')
  TrackingEvent(
    @MessageBody() body: string,
    @ConnectedSocket() socket: Socket,
  ) {
    // this.clients[body] = socket;
    // console.log(this.clients);
    console.log(body);
  }
}
