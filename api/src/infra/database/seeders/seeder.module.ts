import { Module } from '@nestjs/common';
import { Seeder } from './seeder';
import { DatabaseModule } from '@infra/database/database.module';
import { UserSeeder } from './user.seeder';
import { ProjectSeeder } from './project.seeder';
import { UserModule } from '@application/use-cases/user/user.module';
import { ProjectModule } from '@application/use-cases/project/project.module';
import { CostSeeder } from './cost.seeder';
import { CostModule } from '@application/use-cases/cost/cost.module';
import { TaskModule } from '@application/use-cases/task/task.module';
import { TaskSeeder } from './task.seeder';

@Module({
    imports: [
        UserModule,
        ProjectModule,
        CostModule,
        TaskModule
    ],
    providers: [
        DatabaseModule,

        UserSeeder,
        ProjectSeeder,
        CostSeeder,
        TaskSeeder,

        Seeder 
    ],
    exports: [Seeder], 
})
export class SeederModule { }