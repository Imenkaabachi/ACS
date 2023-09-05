import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from './entities/camera.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/generics/crud.service';
import { ChildProcess } from 'child_process';
var request = require('request-promise');

@Injectable()
export class CameraService extends CrudService<Camera> {
  constructor(
    @InjectRepository(Camera)
    private cameraRepository: Repository<Camera>,
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
    var options = {
      method: 'POST',
      uri: 'http://127.0.0.1:5000/compare',
      body: data,
      json: true,
    };
    await request(options)
      .then(function (parsedBody) {
        const { id } = parsedBody;
        if (id == null) {
          console.log('not welcome');
        } else if (id) {
          const ids = gate.visitors.map((visitor) => visitor.id);
          const access = ids.includes(id);
          if (!access) {
            console.log("you don't have access to this department");
          } else {
            console.log('you are welcome');
          }
        }
        return parsedBody;
      })
      .catch(function (err) {
        console.log(err);
      });
    return true;
    // const fs = require('fs');
    // const imageDataBuffer = Buffer.from(imgBase64, 'base64');
    // const directoryPath = 'C:/Users/ASUS X509 I7/ACS/Capturedimages';
    // const filename = 'image.jpg';
    // if (!fs.existsSync(directoryPath)) {
    //   fs.mkdirSync(directoryPath);
    // }
    // const filePath = `${directoryPath}/${filename}`;
    // fs.writeFile(filePath, imageDataBuffer, (err: any) => {
    //   if (err) {
    //     console.error('Error saving image:', err);
    //   } else {
    //     console.log('Image saved successfully:', filePath);
    //   }
    // });
  }
}
