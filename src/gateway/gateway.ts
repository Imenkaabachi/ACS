import { NotFoundException } from '@nestjs/common';
import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import WebSocket, { Server } from 'ws';

@WebSocketGateway()
export class Gateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private clients: Map<string, WebSocket> = new Map();
  // afterInit(server: WebSocket.Server) {
  //   console.log('WebSocket server is initialized');
  //   this.server = server; // Assign the WebSocket server to the class property
  // }
  handleConnection(socket: WebSocket) {
    let serialNumber: string;
    console.log('WebSocket client connected');

    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
      const dataArray = message.toString().split(':');
      serialNumber = dataArray[dataArray.length - 1];
      this.clients.set(serialNumber, socket);
    });

    socket.on('close', () => {
      console.log('in close');
    });
  }
  getSocketByserialNumber(serialNumber: string): WebSocket {
    return this.clients.get(serialNumber);
  }
}
