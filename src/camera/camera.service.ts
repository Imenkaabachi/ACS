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
import { ChildProcess } from 'child_process';

@Injectable()
export class CameraService extends CrudService<Camera> {
  constructor(
    @InjectRepository(Camera)
    private cameraRepository: Repository<Camera>,
  ) {
    super(cameraRepository);
  }

  callback(callback: any) {
    const { imgBase64 } = callback;
    const fs = require('fs');
    const imageDataBuffer = Buffer.from(imgBase64, 'base64');
    const directoryPath = 'C:/Users/ASUS X509 I7/ACS/Capturedimages';
    const filename = 'image.jpg';
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath);
    }
    const filePath = `${directoryPath}/${filename}`;
    fs.writeFile(filePath, imageDataBuffer, (err: any) => {
      if (err) {
        console.error('Error saving image:', err);
      } else {
        console.log('Image saved successfully:', filePath);
      }
    });
    const child_process = require('child_process');
    const process = child_process.spawn('python', [
      'C:/Users/ASUS X509 I7/facial recognition/main.py',
      filePath,
    ]);

    process.stdout.on('data', (data) => {
      console.log(`Python Output: ${data}`);
    });
    process.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });

    process.on('close', (code) => {
      console.log(`Python Process Exited with Code: ${code}`);
    });
  }
  register() {
    const child_process = require('child_process');
    const process = child_process.spawn('python', [
      'C:/Users/ASUS X509 I7/facial recognition/main.py',
      ,
    ]);

    process.stdout.on('data', (data) => {
      console.log(`Python Output: ${data}`);
    });
    process.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });

    process.on('close', (code) => {
      console.log(`Python Process Exited with Code: ${code}`);
    });
  }
}
