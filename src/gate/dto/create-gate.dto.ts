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
import { Type } from 'class-transformer';

export class CreateGateDto {
  @IsEnum(Alarm)
  @IsOptional()
  alarm: Alarm;

  @IsNotEmpty({ message: 'Type is required' })
  @IsString({ message: 'Type must be a string' })
  type: string;

  @IsDateString()
  @IsNotEmpty({ message: 'Open date is required' })
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
