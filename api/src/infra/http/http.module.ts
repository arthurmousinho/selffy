import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { ProjectController } from './controllers/project.controller';
import { UserModule } from '@application/use-cases/user/user.module';
import { ProjectModule } from '@application/use-cases/project/project.module';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { CostController } from './controllers/cost.controller';
import { CostModule } from '@application/use-cases/cost/cost.module';
import { TaskModule } from '@application/use-cases/task/task.module';
import { TaskController } from './controllers/task.controller';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './controllers/app.controller';

@Module({
  providers: [
    JwtService
  ],
  imports: [
    DatabaseModule,
    UserModule,
    ProjectModule,
    CostModule,
    TaskModule
  ],
  controllers: [
    UserController,
    ProjectController,
    CostController,
    AdminDashboardController,
    TaskController,
    AppController
  ]
})
export class HttpModule { }