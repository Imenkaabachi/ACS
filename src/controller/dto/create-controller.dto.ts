import { Gate } from 'src/gate/entities/gate.entity';
import { Signal } from 'src/generics/enums/signal';

export class CreateControllerDto {
  signal: Signal;
  type: string;
}
