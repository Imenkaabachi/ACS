import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { Camera } from 'src/camera/entities/camera.entity';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { Alarm } from 'src/generics/enums/alarm';
import { Status } from 'src/generics/enums/status';
import { JobRole } from 'src/generics/enums/jobRole';
import { IsArray, IsEnum, ValidateNested } from 'class-validator';
import { IsJobRoleArray } from 'src/generics/validators/job-role-array.validator';

export class CreateGateDto {
  alarm: Alarm;

  type: string;

  openDate: string;

  status: Status;

  monitoring: Monitoring;

  controller: Controller;

  cameras: Camera[];

  @IsJobRoleArray()
  jobs: JobRole[];
}
