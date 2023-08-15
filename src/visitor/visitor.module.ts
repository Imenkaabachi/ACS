import { Module, forwardRef } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from './entities/visitor.entity';
import { Admin } from './entities/admin.entity';
import { User } from './entities/user.entity';
import { Gate } from 'src/gate/entities/gate.entity';
import { GateModule } from 'src/gate/gate.module';

@Module({
  controllers: [VisitorController],
  imports: [
    TypeOrmModule.forFeature([Visitor, Admin, User, Gate]),
    forwardRef(() => GateModule),
  ],
  providers: [VisitorService],
})
export class VisitorModule {}
