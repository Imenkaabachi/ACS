import { PartialType } from '@nestjs/mapped-types';
import { CreateControllerDto } from './create-controller.dto';
import { Signal } from 'src/generics/enums/signal';
import { Gate } from 'src/gate/entities/gate.entity';

export class UpdateControllerDto extends PartialType(CreateControllerDto) {
  signal: Signal;
  type: string;
  gates: Gate[];
}
