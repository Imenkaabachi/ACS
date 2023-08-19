import { Camera } from 'src/camera/entities/camera.entity';
import { Controller } from 'src/controller/entities/controller.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Monitoring } from 'src/monitoring/entities/monitoring.entity';
import { Gate } from './entities/gate.entity';
import { GateService } from './gate.service';
import { GateController } from './gate.controller';
import { Module, forwardRef } from '@nestjs/common';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import { VisitorModule } from 'src/visitor/visitor.module';
import { User } from 'src/visitor/entities/user.entity';
import { Admin } from 'src/visitor/entities/admin.entity';
import { VisitorService } from 'src/visitor/visitor.service';
import { ControllerModule } from 'src/controller/controller.module';
@Module({
  controllers: [GateController],
  imports: [
    TypeOrmModule.forFeature([Gate, User, Admin, Visitor, Controller]),
    forwardRef(() => VisitorModule),
  ],
  providers: [GateService, VisitorService],
})
export class GateModule {}
