import { Gate } from 'src/gate/entities/gate.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('camera')
export class Camera {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ip: string;

  @Column()
  serial: string;

  @Column()
  photo: string;

  @ManyToOne(() => Gate, (gate) => gate.cameras)
  gate: Gate;
}
