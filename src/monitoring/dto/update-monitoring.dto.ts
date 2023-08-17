import { PartialType } from '@nestjs/mapped-types';
import { CreateMonitoringDto } from './create-monitoring.dto';
import { IsNotEmpty } from 'class-validator';

export class UpdateMonitoringDto extends PartialType(CreateMonitoringDto) {
  @IsNotEmpty()
  type: string;
}
