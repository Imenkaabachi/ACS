import { Camera } from 'src/camera/entities/camera.entity';
import { Controller } from 'src/controller/entities/controller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { Gate } from './entities/gate.entity';
import { GateService } from './gate.service';
import { GateController } from './gate.controller';
import { Module } from '@nestjs/common';
import { Job } from './entities/job.entity';

@Module({
  controllers: [GateController],
  imports: [
    TypeOrmModule.forFeature([Gate, Monitoring, Camera, Controller, Job]),
  ],
  providers: [GateService],
})
export class GateModule {}
