import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from '@domain/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';
import { ProjectRepository } from '@domain/repositories/project.repository';
import { PrismaProjectRepository } from './prisma/repositories/prisma-project.repository';
import { CostRepository } from '@domain/repositories/cost.repository';
import { PrismaCostRepository } from './prisma/repositories/prisma-cost.repository';
import { TaskRepository } from '@domain/repositories/task.repository';
import { PrismaTaskRepository } from './prisma/repositories/prisma-task.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: ProjectRepository, useClass: PrismaProjectRepository },
    { provide: CostRepository, useClass: PrismaCostRepository },
    { provide: TaskRepository, useClass: PrismaTaskRepository }
  ],
  exports: [
    UserRepository,
    ProjectRepository,
    CostRepository,
    TaskRepository
  ],
})
export class DatabaseModule { }