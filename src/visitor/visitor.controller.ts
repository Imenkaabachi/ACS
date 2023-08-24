import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { UpdateVisitorDto } from './dto/update-visitor.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { JobRole } from 'src/generics/enums/jobRole';

@Controller('visitor')
export class VisitorController {
  constructor(private readonly visitorService: VisitorService) {}

  // @Post('admin')
  // createAdmin(@Body() createAdminDto: CreateAdminDto) {
  //   return this.visitorService.createAdmin(createAdminDto);
  // }

  @Post('user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.visitorService.createUser(createUserDto);
  }

  @Get()
  findAll() {
    return this.visitorService.findAll();
  }

  // @Get()
  // getAllVisitorsImages() {
  //   return this.visitorService.getAllVisitorsImages();
  // }

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
