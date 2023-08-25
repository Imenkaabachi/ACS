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
import * as bcrypt from 'bcrypt';
import { Gate } from 'src/gate/entities/gate.entity';
import * as fs from 'fs';
import * as path from 'path';
import { Admin } from './entities/admin.entity';

@Injectable()
export class VisitorService extends CrudService<Visitor> {
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,

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
  async getAllVisitorsImages(): Promise<
    { id: string; bioCredential: string }[]
  > {
    const visitors = await this.userRepository.find();

    return visitors.map((visitor) => ({
      id: visitor.id,
      bioCredential: visitor.bioCredential,
    }));
  }

  //OLD VERSION OF CREATE USER
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const { job } = createUserDto;
  //   const user = this.userRepository.create(createUserDto);
  //   const gates = await this.gateService.findGatesByJob(job);
  //   user.gates = gates;
  //   return this.userRepository.save(user);
  // }
  async createUser(
    createUserDto: CreateUserDto,
    bioCredential: Express.Multer.File,
  ): Promise<User> {
    const uploadDir = 'D://Visitors Directory';
    const fileName = `${Date.now()}-${bioCredential.originalname}`;
    const filePath = path.join(uploadDir, fileName);

    try {
      await fs.promises.writeFile(filePath, bioCredential.buffer);
    } catch (error) {
      throw new Error('Failed to save bioCredential file');
    }

    const { job } = createUserDto;
    const user = this.userRepository.create({
      ...createUserDto,
      bioCredential: filePath, // Store the file path in the database
    });
    const gates = await this.gateService.findGatesByJob(job);
    user.gates = gates;
    return this.userRepository.save(user);
  }
  // async createAdmin(createAdminDto: CreateAdminDto,bioCredential: Express.Multer.File) {
  //   const uploadDir = 'D://Visitors Directory';
  //   const fileName = `${Date.now()}-${bioCredential.originalname}`;
  //   const filePath = path.join(uploadDir, fileName);

  //   try {
  //     await fs.promises.writeFile(filePath, bioCredential.buffer);
  //   } catch (error) {
  //     throw new Error('Failed to save bioCredential file');
  //   }

  //   const admin = this.adminRepository.create({
  //     ...createAdminDto,
  //     bioCredential: filePath, // Store the file path in the database
  //   });
  //   return this.adminRepository.save(admin);
  // }
  async createAdmin(createAdminDto: CreateAdminDto) {
    console.log(createAdminDto);
    const { email, password, username } = createAdminDto;
    const admin = this.adminRepository.create(createAdminDto);
    const salt = bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    console.log(admin);
    try {
      await this.userRepository.save(admin);
    } catch (e) {
      throw e;
    }
    return {
      email: admin.email,
      username: admin.username,
    };
  }
}
