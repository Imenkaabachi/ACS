import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JobRole } from 'src/generics/enums/jobRole';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateAdminDto } from './dto/create-admin.dto';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import { uuid } from 'uuidv4';

export const storage = {
  storage: diskStorage({
    destination: './uploads/bioCredentials',
    filename: (req, file, cb) => {
      const randomName = Array(32)
        .fill(null)
        .map(() => Math.round(Math.random() * 16).toString(16))
        .join('');
      cb(null, `${randomName}${extname(file.originalname)}`);
    },
  }),
};

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post('register-admin')
  async registerAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.visitorService.registerAdmin(createAdminDto);
  }

  // @Post('register-user')
  // async registerUser(@Body() createUserDto: CreateUserDto) {
  //   return this.visitorService.createUser(createUserDto);
  // }
  // @Post('profile-photo/:id')
  // @UseInterceptors(FileInterceptor('file', storage))
  // async uploadProfilePhoto(
  //   @Param('id') id: string,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return this.visitorService.uploadProfilePic(id, file);
  // }

  @Post('register-user')
  @UseInterceptors(FileInterceptor('file', storage))
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.visitorService.createUser(createUserDto, file);
  }

  @Get()
  findAll() {
    return this.visitorService.findAll();
  }

  @Get()
  getAllVisitorsImages() {
    return this.visitorService.getAllVisitorsImages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.visitorService.findOne(id);
  }
  @Get('user/:job')
  findByRole(@Param('job') job: JobRole) {
    return this.visitorService.findByRole(job);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVisitorDto: UpdateVisitorDto) {
    return this.visitorService.update(id, updateVisitorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.visitorService.softremove(id);
  }
}
