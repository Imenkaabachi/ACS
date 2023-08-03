import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
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

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  inOutStatus: string;

  @Column()
  job: string;
}
