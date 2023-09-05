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
var request = require('request-promise');

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

  async createUser(
    createUserDto: CreateUserDto,
    file: Express.Multer.File,
  ): Promise<User> {
    const path = 'C:/Users/ASUS X509 I7/ACS/uploads/BioCredentials/';
    try {
      const user = await this.userRepository.save({
        ...createUserDto,
        bioCredential: file.filename,
      });
      const { job } = createUserDto;
      const gates = await this.gateService.findGatesByJob(job);
      user.gates = gates;
      var options = {
        method: 'POST',
        uri: 'http://127.0.0.1:5000/encode',
        body: {
          path: path + file.filename,
          id: user.id,
        },
        json: true,
      };
      var sendrequest = await request(options)
        .then(function (parsedBody) {
          console.log(parsedBody['encoded_image']);
        })
        .catch(function (err) {
          console.log(err);
        });

      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  //OLD VERSION OF CREATE USER
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const { job } = createUserDto;
  //   const user = this.userRepository.create(createUserDto);
  //   const gates = await this.gateService.findGatesByJob(job);
  //   user.gates = gates;
  //   return this.userRepository.save(user);
  // }
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const { job } = createUserDto;
  //   const user = this.userRepository.create({
  //     ...createUserDto,
  //   });
  //   const gates = await this.gateService.findGatesByJob(job);
  //   user.gates = gates;
  //   return this.userRepository.save(user);
  // }
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
  async registerAdmin(createAdminDto: CreateAdminDto) {
    console.log(createAdminDto);
    const { email, password, username } = createAdminDto;
    const admin = this.adminRepository.create(createAdminDto);
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    try {
      await this.adminRepository.save(admin);
    } catch (e) {
      throw e;
    }
    return {
      id: admin.id,
      email: admin.email,
      username: admin.username,
    };
  }
  // async uploadProfilePic(id: string, file: Express.Multer.File) {
  //   const admin = await this.adminRepository.findOne({ where: { id: id } });
  //   if (!admin) {
  //     throw new Error(`User with id ${id} not found`);
  //   }
  //   admin.bioCredential = `${file.filename}`;
  //   return await this.adminRepository.save(admin);
  // }
}
