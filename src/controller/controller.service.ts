import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Controller } from './entities/controller.entity';

@Injectable()
export class ControllerService {
  constructor(
    @InjectRepository(Controller)
    private ControllerRepository: Repository<Controller>,
  ) {}

  async create(createControllerDto: CreateControllerDto) {
    return await this.ControllerRepository.save(createControllerDto);
  }

  findAll() {
    return this.ControllerRepository.find();
  }

  findOne(id: string) {
    return this.ControllerRepository.findOneBy({ id });
  }

  async update(id: string, updateControllerDto: UpdateControllerDto) {
    const monitor = await this.ControllerRepository.findOne({ where: { id } });
    if (!monitor) {
      throw new NotFoundException('controller not found');
    } else {
      await this.ControllerRepository.update({ id }, updateControllerDto);
      return {
        message: 'updated successfully',
        monitor,
      };
    }
  }

  async remove(id: string) {
    const monitor = await this.ControllerRepository.findOne({ where: { id } });
    if (!monitor) {
      throw new NotFoundException('controller not found');
    }
    await this.ControllerRepository.delete(id);
    return {
      message: 'removed successfully',
    };
  }
}
