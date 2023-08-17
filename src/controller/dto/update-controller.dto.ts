import { PartialType } from '@nestjs/mapped-types';
import { CreateControllerDto } from './create-controller.dto';
import { Signal } from 'src/generics/enums/signal';
import { Gate } from 'src/gate/entities/gate.entity';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class UpdateControllerDto extends PartialType(CreateControllerDto) {
  @IsEnum(Signal, { message: 'Invalid signal', each: false }) // Custom error message
  signal: Signal;
  @IsNotEmpty({ message: 'Type is required' })
  type: string;
  gates: Gate[];
}
