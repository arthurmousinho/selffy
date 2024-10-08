import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { RoleController } from './controllers/role.controller';
import { ProjectController } from './controllers/project.controller';
import { UserModule } from '@application/use-cases/user/user.module';
import { RoleModule } from '@application/use-cases/role/role.module';
import { ProjectModule } from '@application/use-cases/project/project.module';
import { AdminDashboardController } from './controllers/admin-dashboard.controller';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    RoleModule,
    ProjectModule
  ],
  controllers: [
    UserController,
    RoleController,
    ProjectController,
    AdminDashboardController
  ],
  providers: [  
   
  ]
})
export class HttpModule { }