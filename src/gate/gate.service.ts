import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Gate } from './entities/gate.entity';
import { Not, Repository } from 'typeorm';
import { Controller } from 'src/controller/entities/controller.entity';
import { Job } from './entities/job.entity';

@Injectable()
export class GateService {
  constructor(
    @InjectRepository(Gate)
    private GateRepository: Repository<Gate>,
    @InjectRepository(Controller)
    private controllerRepository: Repository<Gate>,
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
  ) {}

  async create(createGateDto: CreateGateDto) {
    const { controller, cameras } = createGateDto;
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
    //when creating a new gate and we don't have a controller , there is a problem
    if (controller['id'] != undefined) {
      const existingController = this.controllerRepository.findOneBy({
        id: controller['id'],
      });
      if (!existingController) {
        throw new NotFoundException('controller not found');
      }
      const gatesCountPerGivenController =
        await this.GateRepository.createQueryBuilder('gate')
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
      const { jobs } = createGateDto;
      jobs.forEach(async (job) => {
        const role = await this.jobRepository.findOne({
          where: { id: job['id'] },
        });
        if (!role) {
          throw new NotFoundException('job not found');
        }
        console.log(role);
      });
    }

    return await this.GateRepository.save(createGateDto);
  }

  findAll() {
    return this.GateRepository.find();
  }

  findOne(id: string) {
    return this.GateRepository.findOne({ where: { id } });
  }

  async update(id: string, updateGateDto: UpdateGateDto) {
    const gate = await this.GateRepository.findOne({ where: { id } });
    if (!gate) {
      throw new NotFoundException('gate not found');
    } else {
      await this.GateRepository.update({ id }, updateGateDto);
      return {
        message: 'updated successfully',
        gate,
      };
    }
  }

  async remove(id: string) {
    const gate = await this.GateRepository.findOne({ where: { id } });
    if (!gate) {
      throw new NotFoundException('gate not found');
    }
    await this.GateRepository.delete(id);
    return {
      message: 'removed successfully',
    };
  }
}
