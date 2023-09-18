import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/visitor/entities/admin.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './Strategy/passport-jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([Admin]),
    JwtModule.register({
      secret: 'jwtsecret',
      signOptions: { expiresIn: '3600s' },
    }),
    ConfigModule,
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
