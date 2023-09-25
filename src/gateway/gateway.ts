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

  clients: Map<string, WebSocket> = new Map();

  handleConnection(socket: WebSocket) {
    let serialNumber: string;
    console.log('WebSocket client connected');
    // socket.on('ping', (data) => {
    //   console.log('Received a ping frame : ' + data);
    //   socket.pong(data);
    // });
    socket.on('message', (message) => {
      console.log(`Received message: ${message}`);
      const dataArray = message.toString().split(':');
      serialNumber = dataArray[dataArray.length - 1];
      this.clients.set(serialNumber, socket);
    });
    socket.on('close', () => {
      let serialNumber: string = null;
      for (const [key, value] of this.clients.entries()) {
        if (value === socket) {
          serialNumber = key;
          break;
        }
      }
      if (serialNumber) {
        console.log(
          `WebSocket client with identifier ${serialNumber} disconnected`,
        );
        this.clients.delete(serialNumber);
      } else {
        console.log('Unknown WebSocket client disconnected');
      }
    });
  }

  // handleDisconnect(socket: WebSocket) {
  //   let serialNumber: string = null;
  //   for (const [key, value] of this.clients.entries()) {
  //     console.log('looking for serial number');
  //     if (value === socket) {
  //       serialNumber = key;
  //       console.log(serialNumber);
  //       break;
  //     }
  //   }
  //   if (serialNumber) {
  //     console.log(
  //       `WebSocket client with identifier ${serialNumber} disconnected`,
  //     );
  //     this.clients.delete(serialNumber);
  //   } else {
  //     console.log('Unknown WebSocket client disconnected');
  //   }
  // }
  getSocketByserialNumber(serialNumber: string): WebSocket {
    return this.clients.get(serialNumber);
  }
}
