import { Module } from '@nestjs/common';
import { RoleSeeder } from './role.seeder';
import { Seeder } from './seeder';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
    providers: [
        DatabaseModule,
        RoleSeeder,
        Seeder 
    ],
    exports: [Seeder], 
})
export class SeederModule { }
