import { Module } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { PrismaRoleRepository } from '@infra/database/prisma/repositories/prisma-role.repository';

@Module({
    providers: [
        PrismaRoleRepository,
        RoleSeeder
    ],
})
export class SeederModule { }
