import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Visitor {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
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
}
