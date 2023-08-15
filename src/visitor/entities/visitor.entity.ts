import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import { Gate } from '../../gate/entities/gate.entity';

@Entity()
@TableInheritance({
  column: {
    type: 'varchar',
    name: 'role',
  },
})
export class Visitor {
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
  age: number;

  @Column()
  bioCredential: string;

  @ManyToMany(() => Gate, (gate) => gate.visitors)
  gates: Gate[];
}
