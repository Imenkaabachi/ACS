import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorController } from './visitor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visitor } from './entities/visitor.entity';
import { Admin } from './entities/admin.entity';
import { User } from './entities/user.entity';

@Module({
  controllers: [VisitorController],
  imports: [TypeOrmModule.forFeature([Visitor, Admin, User])],
  providers: [VisitorService],
})
export class VisitorModule {}
