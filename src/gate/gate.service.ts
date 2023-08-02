import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GateService {
  constructor(
    @InjectRepository(Gate)
    private GateRepository: Repository<Gate>,
  ) {}

  async create(createGateDto: CreateGateDto) {
    return await this.GateRepository.save(createGateDto);
  }

  findAll() {
    return this.GateRepository.find();
  }

  findOne(id: string) {
    return this.GateRepository.findOne({ where: { id } });
  }

  async update(id: string, updateGateDto: UpdateGateDto) {
    const gate = await this.GateRepository.findOne({ where: { id } });
    if (!gate) {
      throw new NotFoundException('gate not found');
    } else {
      await this.GateRepository.update({ id }, updateGateDto);
      return {
        message: 'updated successfully',
        gate,
      };
    }
  }

  async remove(id: string) {
    const gate = await this.GateRepository.findOne({ where: { id } });
    if (!gate) {
      throw new NotFoundException('gate not found');
    }
    await this.GateRepository.delete(id);
    return {
      message: 'removed successfully',
    };
  }
}
