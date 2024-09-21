import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '@application/use-cases/user/create-user/create-user.usecase';
import { AuthUserUseCase } from '@application/use-cases/user/auth-user/auth-user.usecase';
import { JwtService } from '@nestjs/jwt';
import { FindAllUsersUseCase } from '@application/use-cases/user/find-all-users/find-all-users.usecase';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    UserController
  ],
  providers: [
    JwtService,
    CreateUserUseCase,
    AuthUserUseCase,
    FindAllUsersUseCase
  ]
})
export class HttpModule { }