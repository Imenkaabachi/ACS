import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitor } from './entities/visitor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Admin } from './entities/admin.entity';
import { CrudService } from 'src/generics/crud.service';

@Injectable()
export class VisitorService extends CrudService<Visitor> {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
  ) {
    super(visitorRepository);
  }

  // createAdmin(createAdminDto: CreateAdminDto) {
  //   return this.AdminRepository.save(createAdminDto);
  // }

  // async createUser(createUserDto: CreateUserDto) {
  //   const { job } = createUserDto;
  //   const role = await this.JobRepository.findOne({
  //     where: { jobRole: job },
  //     relations: ['gates'],
  //   });
  //   console.log(role.gates);
  //   const gates = role.gates;
  //   const user = await this.UserRepository.create(createUserDto);
  //   user.gates = gates;
  //   return this.UserRepository.save(user);
  // }
}
