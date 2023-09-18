import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/visitor/entities/admin.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
    private jwtService: JwtService,
  ) {}
  async login(credentials: LoginDto) {
    console.log(credentials);
    const { email, password } = credentials;
    const admin = await this.adminRepository
      .createQueryBuilder('admin')
      .where('admin.email = :email', { email })
      .getOne();

    if (!admin) {
      throw new NotFoundException('email ou password erronée');
    } else {
      const match = await bcrypt.compare(password, admin.password);
      console.log(match);
      if (!match) {
        throw new UnauthorizedException('password ou email erronée');
      } else {
        const payload = {
          email,
        };
        const jwt = this.jwtService.sign(payload);
        return {
          access_token: jwt,
        };
      }
    }
  }
}
