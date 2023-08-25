import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Gate } from '../../gate/entities/gate.entity';
import { TimeEntities } from 'src/generics/timeEntities';

@Entity()
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'role',
  },
})
export class Visitor extends TimeEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column()
  cin: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  sexe: string;

  @Column()
  age: string;

  @Column({
    default: null,
  })
  bioCredential: string;

  @ManyToMany(() => Gate, (gate) => gate.visitors)
  gates: Gate[];
}
