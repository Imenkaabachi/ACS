import { Module, forwardRef } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { Camera } from './entities/camera.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Controller } from 'src/controller/entities/controller.entity';

import { HttpModule, HttpService } from '@nestjs/axios';
import { ControllerModule } from 'src/controller/controller.module';
import { ControllerService } from 'src/controller/controller.service';
import { Gateway } from 'src/gateway/gateway';
import { GatewayModule } from 'src/gateway/gateway.module';

@Module({
  controllers: [CameraController],
  imports: [
    TypeOrmModule.forFeature([Camera, Controller]),
    HttpModule,
    forwardRef(() => ControllerModule),
    GatewayModule,
  ],
  providers: [CameraService, ControllerService, Gateway],
})
export class CameraModule {}
