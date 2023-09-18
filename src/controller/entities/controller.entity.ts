import { Gate } from 'src/gate/entities/gate.entity';
import { Signal } from 'src/generics/enums/signal';
import { TimeEntities } from 'src/generics/timeEntities';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Relay } from '../classes/relay';

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

  @Column()
  serialNumber: string;

  @Column('json')
  relays: Relay[];

  @OneToMany(() => Gate, (gate) => gate.controller)
  gates: Gate[];

  // @BeforeInsert()
  // @BeforeUpdate()
}
