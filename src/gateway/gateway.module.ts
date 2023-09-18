import { Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { WebSocketServer } from 'ws';

@Module({
  providers: [Gateway],
})
export class GatewayModule {}
