import { Module } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { Seeder } from './seeder';
import { DatabaseModule } from '@infra/database/database.module';
import { UserSeeder } from './user.seeder';
import { CreateUserUseCase } from '@application/use-cases/user/create-user/create-user.usecase';
import { GetRolesForUserTypeUseCase } from '@application/use-cases/role/get-roles-for-user-type/get-roles-for-user-type';

@Module({
    providers: [
        DatabaseModule,
        CreateUserUseCase,
        GetRolesForUserTypeUseCase,
        RoleSeeder,
        UserSeeder,
        Seeder 
    ],
    exports: [Seeder], 
})
export class SeederModule { }
