import { PartialType } from '@nestjs/mapped-types';
import { CreateCameraDto } from './create-camera.dto';
import { IsIP, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UpdateCameraDto extends PartialType(CreateCameraDto) {
  @IsIP()
  @IsNotEmpty({ message: 'IP is required' })
  ip: string;

  @IsNotEmpty({ message: 'Type is required' })
  @IsString()
  type: string;

  @IsNotEmpty({ message: 'Serial is required' })
  @Matches(/^[A-Z0-9]{16}$/)
  serial: string;

  @IsNotEmpty({ message: 'Photo is required' })
  @IsString()
  photo: string;
}
