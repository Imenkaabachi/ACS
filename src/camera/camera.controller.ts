import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CameraService } from './camera.service';
import { CreateCameraDto } from './dto/create-camera.dto';
import { UpdateCameraDto } from './dto/update-camera.dto';

@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Post()
  create(@Body() createCameraDto: CreateCameraDto) {
    return this.cameraService.create(createCameraDto);
  }
  @Post('camera-callback')
  callback(@Body() callback) {
    console.log('hello in the callback');
    return this.cameraService.callback(callback);
  }
  @Post('image-registration-callback')
  register(@Body() callback) {
    console.log('hello in the ');
    return this.cameraService.register(callback);
  }

  @Get()
  findAll() {
    return this.cameraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cameraService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCameraDto: UpdateCameraDto) {
    return this.cameraService.update(id, updateCameraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cameraService.softremove(id);
  }
}
