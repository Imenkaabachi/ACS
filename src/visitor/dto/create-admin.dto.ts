import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Sexe } from '../../generics/enums/sexe';

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  @Length(8, 8, { message: 'CIN must be exactly 8 characters' }) // Custom error message
  cin: string;

  @IsEmail({}, { message: 'Invalid email format' }) // Custom error message
  @IsNotEmpty({ message: 'Email is required' }) // Custom error message
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' }) // Custom error message
  @Length(8, 8, { message: 'Phone number must be exactly 8 characters' }) // Custom error message
  phoneNumber: string;

  @IsIn([Sexe.Male, Sexe.Female, Sexe.Other], { message: 'Invalid sexe value' }) // Custom error message
  @IsNotEmpty({ message: 'Sexe is required' }) // Custom error message
  sexe: string;

  @IsNotEmpty({ message: 'Age is required' }) // Custom error message
  age: string;

  @IsString()
  @IsNotEmpty({ message: 'Username is required' }) // Custom error message
  @Length(8, 15, { message: 'Username must be between 8 and 15 characters' }) // Custom error message
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' }) // Custom error message
  @Length(8, 8, { message: 'Password must be exactly 8 characters' }) // Custom error message
  @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z\d]).{8,}$/, {
    message: 'Password is too weak',
  })
  password: string;
}
