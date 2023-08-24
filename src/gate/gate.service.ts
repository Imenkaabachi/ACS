
import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Injectable,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { CreateGateDto } from './dto/create-gate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/generics/crud.service';
import { JobRole } from 'src/generics/enums/jobRole';
import { VisitorService } from 'src/visitor/visitor.service';

import { Visitor } from 'src/visitor/entities/visitor.entity';
import { Controller } from 'src/controller/entities/controller.entity';
import { validate } from 'class-validator';

@Injectable()
export class GateService extends CrudService<Gate> {
  constructor(
    @InjectRepository(Gate)
    private gateRepository: Repository<Gate>,
    @InjectRepository(Controller)
    private controllerRepository: Repository<Controller>,
    @Inject(forwardRef(() => VisitorService))
    private visitorService: VisitorService,
  ) {
    super(gateRepository);
  }

  async findGatesByJob(job: JobRole): Promise<Gate[]> {
    return await this.gateRepository
      .createQueryBuilder('gate')
      .where('JSON_CONTAINS(gate.jobs, :job)', {
        job: JSON.stringify(job),
      })
      .getMany();
  }

  async create(createGateDto: CreateGateDto): Promise<Gate> {
    const { jobs, cameras, controller } = createGateDto;
    if (cameras.length > 2) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'cannot have more than 2 cameras per gate',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (cameras.length == 2 && cameras[0].placement == cameras[1].placement) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error:
            "Can't have the same placement for two cameras in the same gate",
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (controller['id'] != undefined) {
      const existingController = this.controllerRepository.findOneBy({
        id: controller['id'],
      });
      if (!existingController) {
        throw new NotFoundException('controller not found');
      }
      const gatesCountPerGivenController = await this.gateRepository
        .createQueryBuilder('gate')
        .where('gate.controllerId = :id', { id: controller['id'] })
        .getCount();
      if (gatesCountPerGivenController == 2) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: 'this controller is already used by 2 gates',
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    const gate = this.gateRepository.create(createGateDto);
    const visitors = [];
    for (const job of jobs) {
      const visitorsOfJob = await this.visitorService.findByRole(job);
      for (const visitor of visitorsOfJob) {
        visitors.push(visitor);
      }
    }
    gate.visitors = visitors;
    return this.gateRepository.save(gate);
  }

  // async create(createGateDto: CreateGateDto) {
  //   const { controller, cameras } = createGateDto;
  //   if (cameras.length > 2) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         error: 'cannot have more than 2 cameras per gate',
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   if (cameras.length == 2 && cameras[0].placement == cameras[1].placement) {
  //     throw new HttpException(
  //       {
  //         status: HttpStatus.BAD_REQUEST,
  //         error:
  //           "Can't have the same placement for two cameras in the same gate",
  //       },
  //       HttpStatus.BAD_REQUEST,
  //     );
  //   }
  //   //when creating a new gate and we don't have a controller , there is a problem
  //   if (controller['id'] != undefined) {
  //     const existingController = this.controllerRepository.findOneBy({
  //       id: controller['id'],
  //     });
  //     if (!existingController) {
  //       throw new NotFoundException('controller not found');
  //     }
  //     const gatesCountPerGivenController =
  //       await this.GateRepository.createQueryBuilder('gate')
  //         .where('gate.controllerId = :id', { id: controller['id'] })
  //         .getCount();
  //     if (gatesCountPerGivenController == 2) {
  //       throw new HttpException(
  //         {
  //           status: HttpStatus.BAD_REQUEST,
  //           error: 'this controller is already used by 2 gates',
  //         },
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //     const { jobs } = createGateDto;
  //     jobs.forEach(async (job) => {
  //       const role = await this.jobRepository.findOne({
  //         where: { id: job['id'] },
  //       });
  //       if (!role) {
  //         throw new NotFoundException('job not found');
  //       }
  //       console.log(role);
  //     });
  //   }

  //   return await this.GateRepository.save(createGateDto);
  // }
}
