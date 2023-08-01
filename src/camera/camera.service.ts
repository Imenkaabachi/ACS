import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from './entities/camera.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CameraService {
  constructor(
    @InjectRepository(Camera)
    private CameraRepository: Repository<Camera>,
  ) {}

  async create(createCameraDto: CreateCameraDto) {
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
