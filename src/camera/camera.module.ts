import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { Camera } from './entities/camera.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CameraController],
  imports: [TypeOrmModule.forFeature([Camera])],
  providers: [CameraService],
})
export class CameraModule {}
