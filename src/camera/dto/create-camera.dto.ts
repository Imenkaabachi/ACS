import { Gate } from 'src/gate/entities/gate.entity';
import { Placement } from 'src/generics/enums/placement';
import { IsIP, IsNotEmpty, ValidateNested } from 'class-validator';

export class CreateCameraDto {
  @IsIP()
  @IsNotEmpty({ message: 'IP is required' })
  ip: string;

  @IsNotEmpty({ message: 'Type is required' })
  type: string;

  @IsNotEmpty({ message: 'Serial is required' })
  serial: string;

  @IsNotEmpty({ message: 'Photo is required' })
  photo: string;

  @IsNotEmpty({ message: 'Placement is required' })
  @ValidateNested()
  placement: Placement;

  @IsNotEmpty({ message: 'Gate is required' })
  @ValidateNested()
  gate: Gate;
}
