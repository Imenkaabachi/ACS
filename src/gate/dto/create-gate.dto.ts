import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { Camera } from 'src/camera/entities/camera.entity';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { Job } from '../entities/job.entity';
import { Alarm } from 'src/generics/enums/alarm';
import { Status } from 'src/generics/enums/status';

export class CreateGateDto {
  alarm: Alarm;
  type: string;
  openDate: string;
  status: Status;
  monitoring: Monitoring;
  controller: Controller;
  cameras: Camera[];
  jobs: Job[];
}
