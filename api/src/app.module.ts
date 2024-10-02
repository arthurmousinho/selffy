import { Module } from '@nestjs/common';
import { HttpModule } from './infra/http/http.module';
import { DatabaseModule } from './infra/database/database.module';
import { SeederModule } from '@application/seeders/seeder.module';

@Module({
  imports: [
    DatabaseModule,
    HttpModule, 
    SeederModule
  ]
})

export class AppModule {}