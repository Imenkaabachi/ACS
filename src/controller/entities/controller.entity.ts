import { Gate } from 'src/gate/entities/gate.entity';
import { Signal } from 'src/generics/enums/signal';
import { TimeEntities } from 'src/generics/timeEntities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('controller')
export class Controller extends TimeEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Signal,
    default: Signal.DENY,
  })
  signal: Signal;

  @Column()
  type: string;

  @OneToMany(() => Gate, (gate) => gate.controller)
  gates: Gate[];
}
