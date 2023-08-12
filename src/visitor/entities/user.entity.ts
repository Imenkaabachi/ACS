import { ChildEntity, Column } from 'typeorm';
import { Visitor } from './visitor.entity';
import { JobRole } from 'src/generics/enums/jobRole';

@ChildEntity()
export class User extends Visitor {
  @Column()
  inOutStatus: string;

  @Column()
  job: JobRole;
}
