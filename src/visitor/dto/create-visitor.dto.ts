import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class CreateVisitorDto {
  address: string;

  cin: string;

  email: string;

  phoneNumber: string;

  sexe: string;

  age: number;

  bioCredential: string;
}
