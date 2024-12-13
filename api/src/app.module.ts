import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { SeederModule } from '@infra/database/seeders/seeder.module';
import { ServicesModule } from '@infra/services/services.module';

@Module({
  imports: [
    DatabaseModule,
    HttpModule,
    SeederModule,
    ServicesModule
  ]
})

export class AppModule { }