import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateVisitorDto {
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @IsNotEmpty({ message: 'CIN is required' })
  @Length(8, 8, { message: 'CIN must be exactly 8 characters long' })
  cin: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Length(8, 8, { message: 'Phone number must be exactly 8 characters long' })
  phoneNumber: string;

  @IsNotEmpty({ message: 'Sexe is required' })
  @IsString({ message: 'Sexe must be a string' })
  sexe: string;

  @IsNotEmpty({ message: 'Age is required' })
  @IsNumber({}, { message: 'Age must be a number' })
  @Min(0, { message: 'Age cannot be negative' })
  @Max(150, { message: 'Age cannot be greater than 150' })
  age: number;

  @IsNotEmpty({ message: 'Bio credential is required' })
  bioCredential: string;
}
