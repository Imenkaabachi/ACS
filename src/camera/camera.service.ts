import {
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from './entities/camera.entity';
import { In, Repository } from 'typeorm';
import { CrudService } from 'src/generics/crud.service';
import { ControllerService } from 'src/controller/controller.service';
import { Gateway } from 'src/gateway/gateway';
import { Controller } from 'src/controller/entities/controller.entity';
var request = require('request-promise');

@Injectable()
export class CameraService extends CrudService<Camera> {
  constructor(
    @InjectRepository(Camera)
    private cameraRepository: Repository<Camera>,
    @Inject(forwardRef(() => ControllerService))
    private controllerService: ControllerService,
    @Inject(forwardRef(() => Gateway))
    private gateaway: Gateway,
  ) {
    super(cameraRepository);
  }

  async getByDeviceKey(deviceKey: string): Promise<Camera> {
    const cam = await this.cameraRepository.findOne({
      where: { deviceKey: deviceKey },
      relations: ['gate'],
    });
    if (!cam) {
      throw new NotFoundException('No camera found');
    }
    return cam;
  }
  async callback(callback: any) {
    const { imgBase64, deviceKey } = callback;
    const { gate } = await this.getByDeviceKey(deviceKey);
    const data = {
      image: imgBase64,
    };

    var matching_request = {
      method: 'POST',
      uri: 'http://127.0.0.1:5000/compare',
      body: data,
      json: true,
    };
    let access: boolean;

    await request(matching_request)
      .then(async (parsedBody: { id: any }) => {
        const { id } = parsedBody;
        if (id == null) {
          console.log('not welcome');
        } else if (id) {
          const ids = gate.visitors.map((visitor) => visitor.id);
          access = ids.includes(id);
          if (!access) {
            console.log("you don't have access to this department");
          } else {
            console.log(gate.controller.serialNumber);
            console.log(
              this.gateaway.getSocketBySerialNumber(
                gate.controller.serialNumber,
              ),
            );
            this.gateaway
              .getSocketBySerialNumber(gate.controller.serialNumber)
              .send('relay ' + gate.relayIndex);
          }
        }
        return parsedBody;
      })
      .catch(function (err: any) {
        console.log(err);
      });

    return true;
  }
}
