import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';
import { RoleRepository } from '@application/repositories/role.repository';
import { PrismaRoleRepository } from './prisma/repositories/prisma-role.repository';

@Global()
@Module({
  providers: [
    PrismaService,
    { provide: UserRepository, useClass: PrismaUserRepository },
    { provide: RoleRepository, useClass: PrismaRoleRepository }
  ],
  exports: [
    UserRepository,
    RoleRepository
  ],
})
export class DatabaseModule {}