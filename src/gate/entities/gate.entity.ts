import { Camera } from 'src/camera/entities/camera.entity';
import { Controller } from 'src/controller/entities/controller.entity';
import { Alarm } from 'src/generics/enums/alarm';
import { Status } from 'src/generics/enums/status';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Visitor } from '../../visitor/entities/visitor.entity';

@Entity()
export class Gate {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Alarm,
  })
  alarm: Alarm;

  @Column()
  openDate: string;

  @Column({
    default: Status.Closed,
  })
  status: Status;

  @OneToMany(() => Camera, (camera) => camera.gate, {
    cascade: ['insert', 'remove', 'update'],
    eager: true,
  })
  cameras: Camera[];

  @OneToOne(() => Monitoring, (monitor) => monitor.gate, {
    cascade: ['insert', 'remove', 'update'],
    eager: true,
  })
  @JoinColumn({ name: 'monitor_id' })
  monitoring: Monitoring;

  @ManyToOne(() => Controller, (controller) => controller.gates, {
    cascade: ['insert', 'remove', 'update'],
    eager: true,
  })
  controller: Controller;

  @ManyToMany(() => Visitor, (visitor) => visitor.gates)
  @JoinTable({
    name: 'history',
    joinColumn: {
      name: 'visitor_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'gate_id',
      referencedColumnName: 'id',
    },
  })
  visitors: Visitor[];
}
