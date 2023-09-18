import { PartialType } from '@nestjs/mapped-types';
import { CreateControllerDto } from './create-controller.dto';
import { Signal } from 'src/generics/enums/signal';
import { Gate } from 'src/gate/entities/gate.entity';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateControllerDto extends PartialType(CreateControllerDto) {
  @IsEnum(Signal, { message: 'Invalid signal', each: false }) // Custom error message
  @IsOptional()
  signal: Signal;
  @Optional()
  type: string;

  @Optional()
  serialNumber: string;

  gates: Gate[];
}
