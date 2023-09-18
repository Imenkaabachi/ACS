import { JobRole } from 'src/generics/enums/jobRole';
import {
  IsEmail,
  IsEnum,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Status } from '../../generics/enums/status';
import { Sexe } from '../../generics/enums/sexe';
import {InOutStatus} from "../../generics/enums/InOutStatus";

export class CreateUserDto {
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

  @IsIn([InOutStatus.In, InOutStatus.Out])
  @IsNotEmpty({ message: 'In/Out status is required' }) // Custom error message
  inOutStatus: string;

  @IsEnum(JobRole, { message: 'Invalid job role', each: false }) // Custom error message
  @IsNotEmpty({ message: 'Job role is required' }) // Custom error message
  job: JobRole;
}
