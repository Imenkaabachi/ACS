import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoring } from './entities/monitoring.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MonitoringService {
  constructor(
    @InjectRepository(Monitoring)
    private monitoringRepository: Repository<Monitoring>,
  ) {}

  async create(createMonitoringDto: CreateMonitoringDto) {
    return await this.monitoringRepository.save(createMonitoringDto);
  }

  findAll() {
    return this.monitoringRepository.find();
  }

  findOne(id: string) {
    return this.monitoringRepository.findOne({ where: { id } });
  }

  async update(id: string, updateMonitoringDto: UpdateMonitoringDto) {
    const monitor = await this.monitoringRepository.findOne({ where: { id } });
    if (!monitor) {
      throw new NotFoundException('todo not found');
    } else {
      await this.monitoringRepository.update({ id }, updateMonitoringDto);
      return {
        message: 'updated successfully',
        monitor,
      };
    }
  }

  async remove(id: string) {
    const monitor = await this.monitoringRepository.findOne({ where: { id } });
    if (!monitor) {
      throw new NotFoundException('monitor not found');
    }
    await this.monitoringRepository.delete(id);
    return {
      message: 'removed successfully',
    };
  }
}
