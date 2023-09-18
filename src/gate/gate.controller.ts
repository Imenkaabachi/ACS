import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GateService } from './gate.service';
import { CreateGateDto } from './dto/create-gate.dto';
import { UpdateGateDto } from './dto/update-gate.dto';
import { JobRole } from 'src/generics/enums/jobRole';
import { Gate } from './entities/gate.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guards';

@Controller('gate')
export class GateController {
  constructor(private readonly gateService: GateService) {}

  @Post()
  create(@Body() createGateDto: CreateGateDto) {
    return this.gateService.create(createGateDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    console.log('in the controller');
    return this.gateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gateService.findOne(id);
  }

  @Get('byJob/:job')
  async findGatesByJob(@Param('job') job: JobRole): Promise<Gate[]> {
    console.log(job);
    return this.gateService.findGatesByJob(job);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGateDto: UpdateGateDto) {
    return this.gateService.update(id, updateGateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gateService.softremove(id);
  }
}
