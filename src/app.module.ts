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

@Module({
  imports: [
    GateModule,
    VisitorModule,
    MonitoringModule,
    ControllerModule,
    CameraModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'hamza',
      database: 'acsms',
      entities: [Gate, Visitor, Monitoring, Controller, Camera],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
