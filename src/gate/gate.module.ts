import { TypeOrmModule } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { GateController } from './gate.controller';
import { forwardRef, Module } from '@nestjs/common';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import { VisitorModule } from 'src/visitor/visitor.module';
import { User } from '../visitor/entities/user.entity';
import { Admin } from 'typeorm';
import { GateService } from './gate.service';
import { VisitorService } from '../visitor/visitor.service';
import { Controller } from '../controller/entities/controller.entity';

@Module({
  controllers: [GateController],
  imports: [
    TypeOrmModule.forFeature([
      Gate,
      User,
      Admin,
      Visitor,
      Controller,
    ]),
    forwardRef(() => VisitorModule),
  ],
  providers: [GateService, VisitorService],
})
export class GateModule {}
