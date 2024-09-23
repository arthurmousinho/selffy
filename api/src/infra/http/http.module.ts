import { Module, Search } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { CreateUserUseCase } from '@application/use-cases/user/create-user/create-user.usecase';
import { AuthUserUseCase } from '@application/use-cases/user/auth-user/auth-user.usecase';
import { JwtService } from '@nestjs/jwt';
import { FindAllUsersUseCase } from '@application/use-cases/user/find-all-users/find-all-users.usecase';
import { DeleteUserUsecase } from '@application/use-cases/user/delete-user/delete-user.usecase';
import { SearchUserByNameUseCase } from '@application/use-cases/user/search-user-by-name/search-user-by-name.usecase';
import { UpdateUserUseCase } from '@application/use-cases/user/update-user/update-user.usecase';
import { CreateRoleUseCase } from '@application/use-cases/role/create-role/create-role.usecase';
import { RoleController } from './controllers/role.controller';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [
    UserController,
    RoleController
  ],
  providers: [
    JwtService,
    CreateUserUseCase,
    AuthUserUseCase,
    FindAllUsersUseCase,
    DeleteUserUsecase,
    SearchUserByNameUseCase,
    UpdateUserUseCase,

    CreateRoleUseCase
  ]
})
export class HttpModule { }