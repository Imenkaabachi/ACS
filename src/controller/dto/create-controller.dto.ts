import { Signal } from 'src/generics/enums/signal';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateControllerDto {
  @IsEnum(Signal, { message: 'Invalid signal', each: false }) // Custom error message
  signal: Signal;

  @IsNotEmpty({ message: 'Type is required' })
  type: string;
}
