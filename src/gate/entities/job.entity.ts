import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  Column,
} from 'typeorm';
import { Gate } from './gate.entity';
import { JobRole } from 'src/generics/enums/jobRole';

@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Gate, (gate) => gate.jobs)
  gates: Gate[];

  @Column()
  jobRole: JobRole;
}
