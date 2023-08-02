import { Gate } from 'src/gate/entities/gate.entity';
import { Signal } from 'src/generics/enums/signal';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('controller')
export class Controller {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Signal,
    default: Signal.DENY,
  })
  signal: Signal;

  @OneToMany(() => Gate, (gate) => gate.controller)
  gates: Gate[];
}
