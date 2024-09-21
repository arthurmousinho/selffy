import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserRepository } from 'src/application/repositories/user.repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-user.repository';

@Global()
@Module({
  providers: [
    PrismaService, 
    { provide: UserRepository, useClass: PrismaUserRepository }
  ],
  exports: [ UserRepository ],
})
export class DatabaseModule {
  
}