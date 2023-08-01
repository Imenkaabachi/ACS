import { Gate } from 'src/gate/entities/gate.entity';
import { Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('monitoring')
export class Monitoring {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Gate, (gate) => gate.monitoring)
  gate: Gate;
}
