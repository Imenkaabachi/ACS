

import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitor } from './entities/visitor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { CrudService } from 'src/generics/crud.service';
import { JobRole } from 'src/generics/enums/jobRole';
import { GateService } from 'src/gate/gate.service';

import { Gate } from 'src/gate/entities/gate.entity';

@Injectable()
export class VisitorService extends CrudService<Visitor> {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
    @InjectRepository(User)
    private userRepository: Repository<User>,

    @Inject(forwardRef(() => GateService))
    private gateService: GateService,
  ) {
    super(visitorRepository);
  }

  async findByRole(jobRole: JobRole): Promise<User[]> {
    return await this.userRepository.find({
      where: {
        job: jobRole,
      },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { job } = createUserDto;
    const user = this.userRepository.create(createUserDto);
    const gates = await this.gateService.findGatesByJob(job);
    user.gates = gates;
    return this.userRepository.save(user);
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
