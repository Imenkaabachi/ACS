// job-mapping.entity.ts
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Gate } from '../../gate/entities/gate.entity';

@Entity()
export class JobMapping {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Gate)
  @JoinTable()
  gates: Gate[];

  @Column()
  job: string;
}
