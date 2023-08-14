import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from './entities/camera.entity';
import { Repository } from 'typeorm';
import { Gate } from 'src/gate/entities/gate.entity';
import { Placement } from 'src/generics/enums/placement';
import { CrudService } from 'src/generics/crud.service';

@Injectable()
export class CameraService extends CrudService<Camera> {
  constructor(
    @InjectRepository(Camera)
    private cameraRepository: Repository<Camera>,
  ) {
    super(cameraRepository);
  }
  //when adding a new camera to an existing gate i have to verify that the gate doesn't already have 2 cameras
}
