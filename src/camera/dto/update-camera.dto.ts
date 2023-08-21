import { PartialType } from '@nestjs/mapped-types';
import { CreateCameraDto } from './create-camera.dto';
import { IsIP, IsNotEmpty, IsString } from 'class-validator';

export class UpdateCameraDto extends PartialType(CreateCameraDto) {
  @IsIP()
  @IsString()
  @IsNotEmpty({ message: 'IP is required' })
  ip: string;
  @IsNotEmpty({ message: 'Type is required' })
  @IsString()
  type: string;
  @IsNotEmpty({ message: 'Serial is required' })
  @IsString()
  serial: string;
  @IsNotEmpty({ message: 'Photo is required' })
  @IsString()
  photo: string;
}
