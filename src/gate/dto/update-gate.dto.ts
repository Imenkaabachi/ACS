import { PartialType } from '@nestjs/mapped-types';
import { CreateGateDto } from './create-gate.dto';
import { Alarm } from 'src/generics/enums/alarm';
import { Controller } from 'src/controller/entities/controller.entity';
import { Camera } from 'src/camera/entities/camera.entity';
import { Status } from 'src/generics/enums/status';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { Job } from '../entities/job.entity';

export class UpdateGateDto extends PartialType(CreateGateDto) {
  alarm: Alarm;
  openDate: string;
  status: Status;
  monitoring: Monitoring;
  controller: Controller;
  camera: Camera;
  jobs: Job[];
}
