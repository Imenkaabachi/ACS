import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from './entities/visitor.entity';
import { Admin } from './entities/admin.entity';
import { User } from './entities/user.entity';
import { Job } from 'src/gate/entities/job.entity';

@Module({
  controllers: [VisitorController],
  imports: [TypeOrmModule.forFeature([Visitor, Admin, User, Job])],
  providers: [VisitorService],
})
export class VisitorModule {}
