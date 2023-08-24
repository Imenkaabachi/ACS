import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Camera } from './entities/camera.entity';
import { Repository } from 'typeorm';
import { CrudService } from 'src/generics/crud.service';

@Injectable()
export class CameraService extends CrudService<Camera> {
  constructor(
    @InjectRepository(Camera)
    private cameraRepository: Repository<Camera>,
  ) {
    super(cameraRepository);
  }
  callback(callback: any) {
    const fs = require('fs');
    const { imgBase64 } = callback;
    const imageDataBuffer = Buffer.from(imgBase64, 'base64');
    const directoryPath = './Capturedimages';
    const filename = 'image.jpg';
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    const filePath = `${directoryPath}/${filename}`;
    fs.writeFile(filePath, imageDataBuffer, (err) => {
      if (err) {
        console.error('Error saving image:', err);
      } else {
        console.log('Image saved successfully:', filePath);
      }
    });
    return callback;
  }
  register(callback: any) {
    return callback;
  }
}
