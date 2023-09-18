import {
  ConsoleLogger,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Controller } from './entities/controller.entity';
import { CrudService } from 'src/generics/crud.service';
import { io, Socket } from 'socket.io-client';
import { RelayNumber } from 'src/generics/enums/relay-number';
import { CreateControllerDto } from './dto/create-controller.dto';
import { classToPlain } from 'class-transformer';
import { Relay } from './classes/relay';
const CircularJSON = require('circular-json');

@Injectable()
export class ControllerService extends CrudService<Controller> {
  public socket: Socket;
  constructor(
    @InjectRepository(Controller)
    private controllerRepository: Repository<Controller>,
  ) {
    super(controllerRepository);
  }
  async create(controllerDto: CreateControllerDto) {
    const relays = [];
    for (let i = 1; i <= 8; i++) {
      switch (i) {
        case 1:
          const relay1 = new Relay();
          relay1.relayNumber = RelayNumber.Relay1;
          relays.push(relay1);
          break;
        case 2:
          const relay2 = new Relay();
          relay2.relayNumber = RelayNumber.Relay2;
          relays.push(relay2);
          break;
        case 3:
          const relay3 = new Relay();
          relay3.relayNumber = RelayNumber.Relay3;
          relays.push(relay3);
          break;
        case 4:
          const relay4 = new Relay();
          relay4.relayNumber = RelayNumber.Relay4;
          relays.push(relay4);
          break;
        case 5:
          const relay5 = new Relay();
          relay5.relayNumber = RelayNumber.Relay5;
          relays.push(relay5);
          break;
        case 6:
          const relay6 = new Relay();
          relay6.relayNumber = RelayNumber.Relay6;
          relays.push(relay6);
          break;
        case 7:
          const relay7 = new Relay();
          relay7.relayNumber = RelayNumber.Relay7;
          relays.push(relay7);
          break;
        case 8:
          const relay8 = new Relay();
          relay8.relayNumber = RelayNumber.Relay8;
          relays.push(relay8);
          break;
        default:
          throw new Error('control Pannel only supports 8 relays');
      }
    }
    const newController = {
      ...controllerDto,
      relays,
    };
    return await this.controllerRepository.save(newController);
  }
}
// relaysUnavailable(controller: Controller): RelayNumber[] {
//   // const relays = [];
//   // console.log(controller);
//   // controller.gates.forEach((gate) => {
//   //   relays.push(gate.relay);
//   // });
//   // return relays;
// }
