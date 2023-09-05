import { Gate } from 'src/gate/entities/gate.entity';
import { Placement } from 'src/generics/enums/placement';
import { TimeEntities } from 'src/generics/timeEntities';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('camera')
export class Camera extends TimeEntities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @Column()
  ip: string;

  @Column()
  deviceKey: string;

  @Column({
    type: 'enum',
    enum: Placement,
  })
  placement: Placement;

  @Column()
  photo: string;

  @ManyToOne(() => Gate, (gate) => gate.cameras)
  gate: Gate;
}
