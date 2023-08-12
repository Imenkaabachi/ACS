import { Gate } from 'src/gate/entities/gate.entity';
import { Placement } from 'src/generics/enums/placement';

export class CreateCameraDto {
  ip: string;
  type: string;
  serial: string;
  photo: string;
  placement: Placement;
  gate: Gate;
}
