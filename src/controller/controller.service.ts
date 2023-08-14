import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateControllerDto } from './dto/create-controller.dto';
import { UpdateControllerDto } from './dto/update-controller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Controller } from './entities/controller.entity';
import { CrudService } from 'src/generics/crud.service';

@Injectable()
export class ControllerService extends CrudService<Controller> {
  constructor(
    @InjectRepository(Controller)
    private controllerRepository: Repository<Controller>,
  ) {
    super(controllerRepository);
  }
}
