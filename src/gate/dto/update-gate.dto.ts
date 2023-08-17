import { PartialType } from '@nestjs/mapped-types';
import { CreateGateDto } from './create-gate.dto';
import { Alarm } from 'src/generics/enums/alarm';
import { Controller } from 'src/controller/entities/controller.entity';
import { Camera } from 'src/camera/entities/camera.entity';
import { Status } from 'src/generics/enums/status';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { JobRole } from 'src/generics/enums/jobRole';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { IsJobRoleArray } from '../../generics/validators/job-role-array.validator';

export class UpdateGateDto extends PartialType(CreateGateDto) {
  @IsEnum(Alarm)
  @IsNotEmpty({ message: 'Alarm is required' })
  alarm: Alarm;

  @IsNotEmpty({ message: 'Open date is required' })
  openDate: string;

  @IsEnum(Status)
  @IsNotEmpty({ message: 'Status is required' })
  status: Status;

  @IsNotEmpty({ message: 'Monitoring is required' })
  monitoring: Monitoring;

  @IsNotEmpty({ message: 'Controller is required' })
  controller: Controller;

  camera: Camera;

  @IsJobRoleArray({ message: 'Invalid job roles provided' }) // Custom validator with error message
  jobs: JobRole[];
}
