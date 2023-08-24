import { Controller } from '@nestjs/common/interfaces/controllers/controller.interface';
import { Camera } from 'src/camera/entities/camera.entity';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { Alarm } from 'src/generics/enums/alarm';
import { Status } from 'src/generics/enums/status';
import { JobRole } from 'src/generics/enums/jobRole';
import {
  IsArray,
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsJobRoleArray } from 'src/generics/validators/job-role-array.validator';
import { CreateCameraDto } from 'src/camera/dto/create-camera.dto';
import { CreateControllerDto } from 'src/controller/dto/create-controller.dto';
import { CreateMonitoringDto } from 'src/monitoring/dto/create-monitoring.dto';

export class CreateGateDto {
  @IsEnum(Alarm)
  @IsOptional()
  alarm: Alarm;

  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  type: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Open date is required' })
  openDate: string;

  @IsEnum(Status)
  @IsNotEmpty({ message: 'Status is required' })
  status: Status;

  @IsNotEmpty({ message: 'Monitoring is required' })
  monitoring: CreateMonitoringDto;

  @IsNotEmpty({ message: 'Controller is required' })
  controller: CreateControllerDto;

  @ValidateNested({ each: true })
  @IsArray()
  cameras: CreateCameraDto[];

  @IsJobRoleArray({ message: 'Invalid job roles provided' })
  jobs: JobRole[];
}
