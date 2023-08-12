import { ControllerModule } from './controller/controller.module';
import { CameraModule } from './camera/camera.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { Monitoring } from './monitoring/entities/monitoring.entity';
import { Visitor } from './visitor/entities/visitor.entity';
import { Controller } from './controller/entities/controller.entity';
import { Camera } from './camera/entities/camera.entity';
import { Module } from '@nestjs/common';
import { VisitorModule } from './visitor/visitor.module';
import { GateModule } from './gate/gate.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { DataSource } from 'typeorm';
import { Gate } from './gate/entities/gate.entity';
import { Admin } from './visitor/entities/admin.entity';
import { User } from './visitor/entities/user.entity';
import { Job } from './gate/entities/job.entity';

@Module({
  imports: [
    GateModule,
    VisitorModule,
    MonitoringModule,
    ControllerModule,
    CameraModule,
    TypeOrmModule.forRoot({
      autoLoadEntities: true,
      database: 'acsms',
      entities: [
        Gate,
        Visitor,
        Monitoring,
        Controller,
        Camera,
        Admin,
        User,
        Job,
      ],
      host: 'localhost',
      logging: true,
      password: 'hamza',
      port: 3306,
      synchronize: true,
      type: 'mysql',
      username: 'root',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
