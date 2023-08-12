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

@Injectable()
export class CameraService {
  constructor(
    @InjectRepository(Gate)
    private GateRepository: Repository<Gate>,
    @InjectRepository(Camera)
    private CameraRepository: Repository<Camera>,
  ) {}
  //when adding a new camera to an existing gate i have to verify that the gate doesn't already have 2 cameras
  async create(createCameraDto: CreateCameraDto) {
    const { gate, placement } = createCameraDto;
    const existingGate = this.GateRepository.findOneBy({ id: gate.id });
    if (!existingGate) {
      throw new NotFoundException('gate not found');
    }
    const camerasPerGate = await this.CameraRepository.createQueryBuilder(
      'camera',
    )
      .where('camera.gateId = :id', { id: gate['id'] })
      .getCount();
    if (camerasPerGate == 2) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'the gate already has 2 cameras',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (existingGate['placement'] == placement) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            "Can't have the same placement for two cameras in the same gate",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.CameraRepository.save(createCameraDto);
  }

  findAll() {
    return this.CameraRepository.find();
  }

  findOne(id: string) {
    return this.CameraRepository.findOneBy({ id });
  }

  async update(id: string, updateCameraDto: UpdateCameraDto) {
    const monitor = await this.CameraRepository.findOne({ where: { id } });
    if (!monitor) {
      throw new NotFoundException('camera not found');
    } else {
      await this.CameraRepository.update({ id }, updateCameraDto);
      return {
        message: 'updated successfully',
        monitor,
      };
    }
  }

  async remove(id: string) {
    const monitor = await this.CameraRepository.findOne({ where: { id } });
    if (!monitor) {
      throw new NotFoundException('camera not found');
    }
    await this.CameraRepository.delete(id);
    return {
      message: 'removed successfully',
    };
  }
}
