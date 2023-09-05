import { Gate } from 'src/gate/entities/gate.entity';
import { Placement } from 'src/generics/enums/placement';
import { IsIP, IsNotEmpty, Matches, ValidateNested } from 'class-validator';

export class CreateCameraDto {
  @IsIP()
  @IsNotEmpty({ message: 'IP is required' })
  ip: string;

  @IsNotEmpty({ message: 'Type is required' })
  type: string;

  @IsNotEmpty({ message: 'Serial is required' })
  @Matches(/^[A-Z0-9]{16}$/)
  deviceKey: string;

  @IsNotEmpty({ message: 'Photo is required' })
  photo: string;

  @IsNotEmpty({ message: 'Placement is required' })
  placement: Placement;
}
