import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { Visitor } from './entities/visitor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Admin } from './entities/admin.entity';
import { Job } from 'src/gate/entities/job.entity';

@Injectable()
export class VisitorService {
  constructor(
    @InjectRepository(Visitor)
    private VisitorRepository: Repository<Visitor>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    @InjectRepository(Admin)
    private AdminRepository: Repository<Admin>,
    @InjectRepository(Job)
    private JobRepository: Repository<Job>,
  ) {}

  createAdmin(createAdminDto: CreateAdminDto) {
    return this.AdminRepository.save(createAdminDto);
  }

  async createUser(createUserDto: CreateUserDto) {
    const { job } = createUserDto;
    const role = await this.JobRepository.findOne({
      where: { jobRole: job },
      relations: ['gates'],
    });
    console.log(role.gates);
    const gates = role.gates;
    const user = await this.UserRepository.create(createUserDto);
    user.gates = gates;
    return this.UserRepository.save(user);
  }

  findAll() {
    return this.VisitorRepository.find();
  }

  findOne(id: string) {
    return this.VisitorRepository.findOne({ where: { id } });
  }

  async update(id: string, updateVisitorDto: UpdateVisitorDto) {
    const visitor = await this.VisitorRepository.findOne({ where: { id } });
    if (!visitor) {
      throw new NotFoundException('visitor not found');
    } else {
      await this.VisitorRepository.update({ id }, updateVisitorDto);
      return {
        message: 'updated successfully',
        visitor,
      };
    }
  }

  async remove(id: string) {
    const visitor = await this.VisitorRepository.findOne({ where: { id } });
    if (!visitor) {
      throw new NotFoundException('visitor not found');
    }
    await this.VisitorRepository.delete(id);
    return {
      message: 'removed successfully',
    };
  }
}
