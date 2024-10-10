import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { ProjectController } from './controllers/project.controller';
import { UserModule } from '@application/use-cases/user/user.module';
import { RoleModule } from '@application/use-cases/role/role.module';
import { ProjectModule } from '@application/use-cases/project/project.module';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';
import { CostController } from './controllers/cost.controller';
import { CostModule } from '@application/use-cases/cost/cost.module';
import { TaskModule } from '@application/use-cases/task/task.module';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RoleModule,
    ProjectModule,
    CostModule,
    TaskModule
  ],
  controllers: [
    UserController,
    RoleController,
    ProjectController,
    CostController,
    AdminDashboardController,
    TaskController
  ]
})
export class HttpModule { }