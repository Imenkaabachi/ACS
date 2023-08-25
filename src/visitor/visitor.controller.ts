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

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  @Post('register-admin')
  // @UseInterceptors(FileInterceptor('bioCredential')) // 'bioCredential' should match the property name in the DTO
  async registerAdmin(
    //@UploadedFile() bioCredential: Express.Multer.File,
    @Body() createAdminDto: CreateAdminDto,
  ) {
    return this.visitorService.createAdmin(createAdminDto);
  }

  @Post('register-user')
  @UseInterceptors(FileInterceptor('bioCredential')) // 'bioCredential' should match the property name in the DTO
  async registerUser(
    @UploadedFile() bioCredential: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.visitorService.createUser(createUserDto, bioCredential);
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
