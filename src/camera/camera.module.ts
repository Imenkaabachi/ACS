import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { Camera } from './entities/camera.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Gate } from 'src/gate/entities/gate.entity';
import {HttpModule, HttpService} from "@nestjs/axios";

@Module({
  controllers: [CameraController],
  imports: [TypeOrmModule.forFeature([Camera]),HttpModule],
  providers: [CameraService],
})
export class CameraModule {}
