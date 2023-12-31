import { Signal } from 'src/generics/enums/signal';
import { IsEnum, IsNotEmpty } from 'class-validator';

export class CreateControllerDto {
  @IsEnum(Signal, { message: 'Invalid signal', each: false })
  signal: Signal;

  @IsNotEmpty({ message: 'Type is required' })
  type: string;

  @IsNotEmpty({ message: 'serial number is required' })
  serialNumber: string;
}
