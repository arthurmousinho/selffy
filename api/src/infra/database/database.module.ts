import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';
import { RoleRepository } from '@application/repositories/role.repository';
import { PrismaRoleRepository } from './prisma/repositories/prisma-role.repository';
import { ProjectRepository } from '@application/repositories/project.repository';
import { PrismaProjectRepository } from './prisma/repositories/prisma-project.repository';
import { CostRepository } from '@application/repositories/cost.repository';
import { PrismaCostRepository } from './prisma/repositories/prisma-cost.repository';
import { TaskRepository } from '@application/repositories/task.repository';
import { PrismaTaskRepository } from './prisma/repositories/prisma-task.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: RoleRepository, useClass: PrismaRoleRepository },
    { provide: ProjectRepository, useClass: PrismaProjectRepository },
    { provide: CostRepository, useClass: PrismaCostRepository },
    { provide: TaskRepository, useClass: PrismaTaskRepository }
  ],
  exports: [
    UserRepository,
    RoleRepository,
    ProjectRepository,
    CostRepository,
    TaskRepository
  ],
})
export class DatabaseModule { }