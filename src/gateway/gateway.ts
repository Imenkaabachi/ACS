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
  // @SubscribeMessage('message')
  // TrackingEvent(@MessageBody() body: string, @ConnectedSocket() socket): void {
  //   // this.clients[body] = socket;
  //   // console.log(this.clients);
  //   console.log(body);
  // }
}

// @WebSocketGateway()
// export class Gateway {
//   @WebSocketServer()
//   private clients: Map<string, Socket> = new Map();
//   handleConnection(client: Socket) {
//     console.log('connected');
//     console.log(client);
//     client.send('hello');
//   }

//   getSocketBySerialNumber(serialNumber: string): Socket {
//     if (!this.clients[serialNumber]) {
//       throw new NotFoundException('not registred socket!');
//     }
//     return this.clients[serialNumber];
//   }
//   @SubscribeMessage('message')
//   TrackingEvent(
//     @MessageBody() body: string,
//     @ConnectedSocket() socket: Socket,
//   ) {
//     // this.clients[body] = socket;
//     // console.log(this.clients);
//     console.log(body);
//   }
// }
// @WebSocketGateway()
// export class WebsocketsGateway implements OnGatewayConnection {
//   @WebSocketServer()
//   server: Server;

//   handleConnection(client: WebSocket, ...args: any[]) {
//     console.log('WebSocket client connected');

//     client.on('message', (message: string) => {
//       console.log(`Received message: ${message}`);
//       client.send('wa33');
//       client.send(`Server received: ${message}`);
//     });

//     client.on('close', () => {
//       console.log('WebSocket client disconnected');
//     });
//   }
// }
