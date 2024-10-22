import { Module } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { Seeder } from './seeder';
import { DatabaseModule } from '@infra/database/database.module';
import { UserSeeder } from './user.seeder';
import { ProjectSeeder } from './project.seeder';
import { UserModule } from '@application/use-cases/user/user.module';
import { RoleModule } from '@application/use-cases/role/role.module';
import { ProjectModule } from '@application/use-cases/project/project.module';
import { CostSeeder } from './cost.seeder';
import { CostModule } from '@application/use-cases/cost/cost.module';

@Module({
    imports: [
        UserModule,
        RoleModule,
        ProjectModule,
        CostModule
    ],
    providers: [
        DatabaseModule,

        RoleSeeder,
        UserSeeder,
        ProjectSeeder,
        CostSeeder,

        Seeder 
    ],
    exports: [Seeder], 
})
export class SeederModule { }
