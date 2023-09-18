import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/visitor/entities/admin.entity';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'jwtsecret',
    });
  }

  async validate(payload: LoginDto) {
    const admin = await this.adminRepository.findOne({
      where: { email: payload.email },
    });
    if (admin) {
      delete admin.password;
      return admin;
    } else {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
