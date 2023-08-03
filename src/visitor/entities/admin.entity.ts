import { ChildEntity, Column } from 'typeorm';
import { Visitor } from './visitor.entity';

@ChildEntity()
export class Admin extends Visitor {
  @Column()
  username: string;

  @Column()
  password: string;
}
