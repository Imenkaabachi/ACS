import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMonitoringDto } from './dto/create-monitoring.dto';
import { UpdateMonitoringDto } from './dto/update-monitoring.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Monitoring } from './entities/monitoring.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/generics/crud.service';

@Injectable()
export class MonitoringService extends CrudService<Monitoring> {
  constructor(
    @InjectRepository(Monitoring)
    private monitoringRepository: Repository<Monitoring>,
  ) {
    super(monitoringRepository);
  }
}
