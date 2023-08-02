import { Module } from '@nestjs/common';
import { MonitoringService } from './monitoring.service';
import { MonitoringController } from './monitoring.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitoring } from './entities/monitoring.entity';

@Module({
  controllers: [MonitoringController],
  imports: [TypeOrmModule.forFeature([Monitoring])],
  providers: [MonitoringService],
})
export class MonitoringModule {}
