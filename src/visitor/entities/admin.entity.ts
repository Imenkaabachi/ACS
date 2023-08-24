import { ChildEntity, Column } from 'typeorm';
import { Visitor } from './visitor.entity';
import { TimeEntities } from 'src/generics/timeEntities';

@ChildEntity()
export class Admin extends Visitor {
  @Column()
  username: string;

  @Column()
  password: string;
}
