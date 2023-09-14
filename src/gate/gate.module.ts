import { TypeOrmModule } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { GateService } from './gate.service';
import { GateController } from './gate.controller';
import { forwardRef, Module } from '@nestjs/common';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import { VisitorModule } from 'src/visitor/visitor.module';
import { User } from 'src/visitor/entities/user.entity';
import { Admin } from 'src/visitor/entities/admin.entity';
import { VisitorService } from 'src/visitor/visitor.service';
import { ControllerModule } from 'src/controller/controller.module';
import { Controller } from 'src/controller/entities/controller.entity';
import { ControllerService } from 'src/controller/controller.service';
@Module({
  controllers: [GateController],
  imports: [
    TypeOrmModule.forFeature([Gate, User, Admin, Visitor, Controller]),
    forwardRef(() => VisitorModule),
    forwardRef(() => ControllerModule),
  ],
  providers: [GateService, VisitorService, ControllerService],
})
export class GateModule {}
