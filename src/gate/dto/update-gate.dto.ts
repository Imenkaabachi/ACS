import { PartialType } from '@nestjs/mapped-types';
import { CreateGateDto } from './create-gate.dto';
import { Alarm } from 'src/generics/enums/alarm';
import { Controller } from 'src/controller/entities/controller.entity';
import { Camera } from 'src/camera/entities/camera.entity';
import { Status } from 'src/generics/enums/status';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { JobRole } from 'src/generics/enums/jobRole';
import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import { IsJobRoleArray } from '../../generics/validators/job-role-array.validator';
import { Type } from 'class-transformer';
import { CreateCameraDto } from 'src/camera/dto/create-camera.dto';
import { CreateControllerDto } from 'src/controller/dto/create-controller.dto';
import { CreateMonitoringDto } from 'src/monitoring/dto/create-monitoring.dto';

export class UpdateGateDto extends PartialType(CreateGateDto) {
  @IsEnum(Alarm)
  @IsNotEmpty({ message: 'Alarm is required' })
  alarm: Alarm;

  @IsNotEmpty({ message: 'Open date is required' })
  @IsDateString()
  openDate: String;

  @IsEnum(Status)
  @IsNotEmpty({ message: 'Status is required' })
  status: Status;

  @IsNotEmpty({ message: 'Monitoring is required' })
  @Type(() => CreateMonitoringDto)
  monitoring: CreateMonitoringDto;

  @IsNotEmpty({ message: 'Controller is required' })
  @Type(() => CreateControllerDto)
  controller: CreateControllerDto;

  @IsArray()
  @Type(() => CreateCameraDto)
  @ValidateNested({ each: true })
  cameras: CreateCameraDto[];

  @IsJobRoleArray({ message: 'Invalid job roles provided' })
  jobs: JobRole[];
}
