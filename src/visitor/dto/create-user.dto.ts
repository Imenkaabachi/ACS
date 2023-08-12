import { JobRole } from 'src/generics/enums/jobRole';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateUserDto {
  address: string;
  cin: string;
  email: string;
  phoneNumber: string;
  sexe: string;
  age: number;
  bioCredential: string;
  username: string;
  password: string;
  inOutStatus: string;
  job: JobRole;
}
