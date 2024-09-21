import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '@application/use-cases/user/create-user/create-user.usecase';

@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    UserController
  ],
  providers: [
    CreateUserUseCase
  ]
})
export class HttpModule { }