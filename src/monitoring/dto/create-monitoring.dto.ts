import { Gate } from 'src/gate/entities/gate.entity';
import { IsNotEmpty } from 'class-validator';

export class CreateMonitoringDto {
  @IsNotEmpty()
  type: string;

  gate: Gate;
}
