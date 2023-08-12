import { Gate } from 'src/gate/entities/gate.entity';

export class CreateMonitoringDto {
  type: string;
  gate: Gate;
}
