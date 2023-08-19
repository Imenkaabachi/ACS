import { Module, forwardRef } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from './entities/visitor.entity';
import { Admin } from './entities/admin.entity';
import { User } from './entities/user.entity';
import { Gate } from 'src/gate/entities/gate.entity';
import { GateModule } from 'src/gate/gate.module';
import { GateService } from 'src/gate/gate.service';
import { Controller } from 'src/controller/entities/controller.entity';

@Module({
  controllers: [VisitorController],
  imports: [
    TypeOrmModule.forFeature([Visitor, Admin, User, Gate, Controller]),
    forwardRef(() => GateModule),
  ],
  providers: [VisitorService, GateService],
})
export class VisitorModule {}
