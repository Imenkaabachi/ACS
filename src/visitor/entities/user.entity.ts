import { ChildEntity, Column } from 'typeorm';
import { Visitor } from './visitor.entity';

@ChildEntity()
export class User extends Visitor {
  @Column()
  inOutStatus: string;

  @Column()
  job: string;
}
