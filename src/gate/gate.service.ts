import {
  HttpException,
  HttpStatus,
  Inject,
  NotFoundException,
  Injectable,
  forwardRef,
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
import { Socket, io } from 'socket.io-client';
import { ControllerService } from 'src/controller/controller.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { RelayNumber } from 'src/generics/enums/relay-number';

@Injectable()
export class GateService extends CrudService<Gate> {
  socket: Socket;
  constructor(
    @InjectRepository(Gate)
    private gateRepository: Repository<Gate>,
    @InjectRepository(Controller)
    private controllerRepository: Repository<Controller>,
    @Inject(forwardRef(() => VisitorService))
    private visitorService: VisitorService,
    @Inject(forwardRef(() => ControllerService))
    private controllerService: ControllerService,
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
    const { jobs, cameras, controllerId, relayIndex } = createGateDto;
    const controller = this.controllerRepository.findOne({
      where: { id: controllerId },
    });
    if (!(await controller)) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'no controller found with id ' + controllerId,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
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
    const relay = (await controller).relays[relayIndex - 1];
    if (!relay.available) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: `the relay ${relayIndex} is not available`,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    (await controller).relays[relayIndex - 1].available = false;
    switch (relayIndex) {
      case 1:
        (await controller).relays[relayIndex - 1].relayNumber =
          RelayNumber.Relay1;
        break;
      case 2:
        (await controller).relays[relayIndex - 1].relayNumber =
          RelayNumber.Relay2;
        break;
      case 3:
        (await controller).relays[relayIndex - 1].relayNumber =
          RelayNumber.Relay3;
        break;
      case 4:
        (await controller).relays[relayIndex - 1].relayNumber =
          RelayNumber.Relay4;
        break;
      case 5:
        (await controller).relays[relayIndex - 1].relayNumber =
          RelayNumber.Relay5;
        break;
      case 6:
        (await controller).relays[relayIndex - 1].relayNumber =
          RelayNumber.Relay6;
        break;
      case 7:
        (await controller).relays[relayIndex - 1].relayNumber =
          RelayNumber.Relay7;
        break;
      case 8:
        (await controller).relays[relayIndex - 1].relayNumber =
          RelayNumber.Relay8;
        break;
    }
    await this.controllerRepository.save(await controller);
    const gate = this.gateRepository.create(createGateDto);
    const visitors = [];
    for (const job of jobs) {
      const visitorsOfJob = await this.visitorService.findByRole(job);
      for (const visitor of visitorsOfJob) {
        visitors.push(visitor);
      }
    }
    gate.visitors = visitors;
    gate.controller = await controller;
    return await this.gateRepository.save(gate);
  }
}
