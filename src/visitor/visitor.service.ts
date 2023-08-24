
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
import { CreateAdminDto } from './dto/create-admin.dto';
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

  // async getAllVisitorsImages(): Promise<
  //   { id: string; bioCredential: string }[]
  // > {
  //   const visitors = await this.visitorRepository.find();
  //
  //   return visitors.map((visitor) => ({
  //     id: visitor.id,
  //     bioCredential: visitor.bioCredential,
  //   }));
  // }

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
}
