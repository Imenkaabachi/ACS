import { Module } from '@nestjs/common';
import { ControllerService } from './controller.service';
import { ControllerController } from './controller.controller';
import { Controller } from './entities/controller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ControllerController],
  imports: [TypeOrmModule.forFeature([Controller])],
  providers: [ControllerService],
})
export class ControllerModule {}
