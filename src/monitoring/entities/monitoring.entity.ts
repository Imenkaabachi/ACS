import { Gate } from 'src/gate/entities/gate.entity';
import { TimeEntities } from 'src/generics/timeEntities';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('monitoring')
export class Monitoring extends TimeEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @OneToOne(() => Gate, (gate) => gate.monitoring)
  gate: Gate;
}
