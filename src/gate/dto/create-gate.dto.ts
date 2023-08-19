import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { Camera } from 'src/camera/entities/camera.entity';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { Alarm } from 'src/generics/enums/alarm';
import { Status } from 'src/generics/enums/status';
import { JobRole } from 'src/generics/enums/jobRole';
import { IsDate, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { IsJobRoleArray } from 'src/generics/validators/job-role-array.validator';

export class CreateGateDto {
  @IsEnum(Alarm)
  @IsNotEmpty({ message: 'Alarm is required' })
  alarm: Alarm;

  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  type: string;

  @IsDate()
  @IsNotEmpty({ message: 'Open date is required' })
  openDate: string;

  @IsEnum(Status)
  @IsNotEmpty({ message: 'Status is required' })
  status: Status;

  @IsNotEmpty({ message: 'Monitoring is required' })
  monitoring: Monitoring;

  @IsNotEmpty({ message: 'Controller is required' })
  controller: Controller;

  cameras: Camera[];

  @IsJobRoleArray({ message: 'Invalid job roles provided' }) // Custom validator with error message
  jobs: JobRole[];
}
