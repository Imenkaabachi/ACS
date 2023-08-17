import { TypeOrmModule } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { GateService } from './gate.service';
import { GateController } from './gate.controller';
import { forwardRef, Module } from '@nestjs/common';
import { Visitor } from 'src/visitor/entities/visitor.entity';
import { VisitorModule } from 'src/visitor/visitor.module';


@Module({
  controllers: [GateController],
  imports: [

    TypeOrmModule.forFeature([Gate, User, Admin, Visitor]),
    forwardRef(() => VisitorModule),
  ],
  providers: [GateService, VisitorService],
})
export class GateModule {}
